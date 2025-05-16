import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

type NotionThemeType = {
  bg: string;
  bgSidebar: string;
  bgActive: string;
  bgHover: string;
  text: string;
  textMuted: string;
  border: string;
  countBg: string;
  countText: string;
  unreadBlue: string;
  iconRed: string;
  iconPurple: string;
  iconBlue: string;
};

interface ThemeContextProps {
  notionTheme: NotionThemeType;
  textColor: string;
  textMutedColor: string;
  bgColor: string;
  bgHoverColor: string;
  bgActiveColor: string;
  borderColor: string;
  countBgColor: string;
  countTextColor: string;
}

// Light theme colors from Notion
const notionLightTheme: NotionThemeType = {
  bg: '#FFFFFF',
  bgSidebar: '#F7F7F5',
  bgActive: '#EBEBEA',
  bgHover: '#F1F1EF',
  text: '#37352F',
  textMuted: '#6B6B6A',
  border: '#E9E9E8',
  countBg: '#E9E9E8',
  countText: '#37352F',
  unreadBlue: '#2684FF',
  iconRed: '#E5484D',
  iconPurple: '#A855F7',
  iconBlue: '#3B82F6',
};

// Dark theme colors from Notion
const notionDarkTheme: NotionThemeType = {
  bg: '#191919',
  bgSidebar: '#202020',
  bgActive: '#2F3336',
  bgHover: '#303030',
  text: '#EBEBEB',
  textMuted: '#999999',
  border: '#303030',
  countBg: '#5A5E63',
  countText: '#FFFFFF',
  unreadBlue: '#2684FF',
  iconRed: '#E5484D',
  iconPurple: '#A855F7',
  iconBlue: '#3B82F6',
};

// Midnight theme colors
const midnightTheme: NotionThemeType = {
  bg: '#090E2C',
  bgSidebar: '#0F1642',
  bgActive: '#1E293B',
  bgHover: '#162037',
  text: '#EDF0FF',
  textMuted: '#A0AEC0',
  border: '#1E293B',
  countBg: '#30416B',
  countText: '#FFFFFF',
  unreadBlue: '#3B82F6',
  iconRed: '#E5484D',
  iconPurple: '#A855F7',
  iconBlue: '#3B82F6',
};

// Forest theme colors
const forestTheme: NotionThemeType = {
  bg: '#1A1F1C',
  bgSidebar: '#21271F',
  bgActive: '#2F3C2C',
  bgHover: '#2A332A',
  text: '#D3D8D4',
  textMuted: '#889488',
  border: '#3A4D3F',
  countBg: '#3A4D3F',
  countText: '#FFFFFF',
  unreadBlue: '#2C7744',
  iconRed: '#E5484D',
  iconPurple: '#A855F7',
  iconBlue: '#2C7744',
};

// Autumn theme colors
const autumnTheme: NotionThemeType = {
  bg: '#F9F5F0',
  bgSidebar: '#F5EFE6',
  bgActive: '#F2D0A4',
  bgHover: '#F7E6CD',
  text: '#4B3832',
  textMuted: '#7D5B4F',
  border: '#E8D5C4',
  countBg: '#E8D5C4',
  countText: '#4B3832',
  unreadBlue: '#E07A5F',
  iconRed: '#E5484D',
  iconPurple: '#A855F7',
  iconBlue: '#E07A5F',
};

// Default to dark theme
const defaultTheme: ThemeContextProps = {
  notionTheme: notionDarkTheme,
  textColor: notionDarkTheme.text,
  textMutedColor: notionDarkTheme.textMuted,
  bgColor: notionDarkTheme.bg,
  bgHoverColor: notionDarkTheme.bgHover,
  bgActiveColor: notionDarkTheme.bgActive,
  borderColor: notionDarkTheme.border,
  countBgColor: notionDarkTheme.countBg,
  countTextColor: notionDarkTheme.countText,
};

const ThemeContext = createContext<ThemeContextProps>(defaultTheme);

export function useNotionTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [notionTheme, setNotionTheme] = useState<NotionThemeType>(notionDarkTheme);

  useEffect(() => {
    // Set the theme based on the current theme
    if (theme === 'notion-light') {
      setNotionTheme(notionLightTheme);
    } else if (theme === 'notion-dark') {
      setNotionTheme(notionDarkTheme);
    } else if (theme === 'light') {
      setNotionTheme(notionLightTheme);
    } else if (theme === 'dark') {
      setNotionTheme(notionDarkTheme);
    } else if (theme === 'midnight') {
      setNotionTheme(midnightTheme);
    } else if (theme === 'forest') {
      setNotionTheme(forestTheme);
    } else if (theme === 'autumn') {
      setNotionTheme(autumnTheme);
    }
  }, [theme]);

  const value = {
    notionTheme,
    textColor: notionTheme.text,
    textMutedColor: notionTheme.textMuted,
    bgColor: notionTheme.bg,
    bgHoverColor: notionTheme.bgHover,
    bgActiveColor: notionTheme.bgActive,
    borderColor: notionTheme.border,
    countBgColor: notionTheme.countBg,
    countTextColor: notionTheme.countText,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
} 