/* eslint-disable @typescript-eslint/no-unused-vars */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNow, isToday, isYesterday, parse } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to parse email dates according to RFC 2822 format and other common email date formats
function parseEmailDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  
  // Remove timezone name parentheticals like "(GMT)", "(EST)", etc.
  dateStr = dateStr.replace(/\([^)]*\)/g, '').trim();
  
  // Try standard JS Date parsing first
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return date;
  }
  
  // Try some common email date formats
  try {
    // Format: "Tue, 25 Apr 2023 10:11:12 +0000" (RFC 2822)
    const rfcMatch = dateStr.match(/^(?:\w{3},\s+)?(\d{1,2})\s+(\w{3})\s+(\d{4})\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?(?:\s+([+-]\d{4}|[A-Z]{3}))?/);
    if (rfcMatch) {
      const [_, day, month, year, hour, minute, second, timezone] = rfcMatch;
      // Try to use date-fns parse if possible
      const dateString = `${year}-${getMonthNumber(month)}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute}:${second || '00'}`;
      return new Date(dateString);
    }
  } catch (e) {
    console.warn("Failed to parse email date with custom parser", e);
  }
  
  return null;
}

// Helper to convert month abbreviation to number
function getMonthNumber(month: string): string {
  const months: Record<string, string> = { 
    'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 
    'may': '05', 'jun': '06', 'jul': '07', 'aug': '08', 
    'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12' 
  };
  return months[month.toLowerCase().slice(0,3)] || '01';
}

export function formatEmailAddress(email: string) {
  if (!email) return { name: "Unknown", email: "" };
  
  // Try to extract name and email from format "Name <email@domain.com>"
  const match = email.match(/^([^<]+)?<?([^>]+)>?$/);
  if (match) {
    const [, name, emailAddr] = match;
    return {
      name: name?.trim() || emailAddr.split('@')[0],
      email: emailAddr.trim()
    };
  }

  // Fallback to using the part before @ as name
  return {
    name: email.split('@')[0],
    email: email
  };
}

export function formatDate(dateString: string) {
  if (!dateString) return "Unknown date";
  
  try {
    // Try to parse the email date with our special parser
    const date = parseEmailDate(dateString);
    
    // Fall back to standard Date parsing if our parser fails
    if (!date) {
      console.warn('Unable to parse date with specialized parser:', dateString);
      return ""; // Return empty string instead of "Invalid date"
    }

    if (isToday(date)) {
      return format(date, 'h:mm a');
    }
    
    if (isYesterday(date)) {
      return 'Yesterday';
    }
    
    // Current year format - more minimal "May 4" format
    if (new Date().getFullYear() === date.getFullYear()) {
      return format(date, 'MMM d');
    }
    
    // Previous years - show with year
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return ""; // Return empty string instead of "Invalid date"
  }
}
