import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-6">Last updated: May 6, 2025</p>

      <div className="prose prose-sm max-w-none">
        <p>
          Please read these Terms of Service (&ldquo;Terms&rdquo;, &ldquo;Terms of Service&rdquo;) carefully before using the
          Venn website and application (&ldquo;Service&rdquo;) operated by Venn (&ldquo;us&rdquo;, &ldquo;we&rdquo;, or &ldquo;our&rdquo;).
        </p>
        <p>
          Your access to and use of the Service is conditioned upon your acceptance of and compliance
          with these Terms. These Terms apply to all visitors, users, and others who wish to access
          or use the Service.
        </p>
        <p>
          By accessing or using the Service, you agree to be bound by these Terms. If you disagree
          with any part of the terms, you may not access the Service.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Accounts</h2>
        <p>
          When you create an account with us, you guarantee that the information you provide us is
          accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete
          information may result in the immediate termination of your account on the Service.
        </p>
        <p>
          You are responsible for maintaining the confidentiality of your account and password,
          including but not limited to the restriction of access to your computer and/or account. You
          agree to accept responsibility for any and all activities or actions that occur under your
          account and/or password, whether your password is with our Service or a third-party
          service. You must notify us immediately upon becoming aware of any breach of security or
          unauthorized use of your account.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are and will remain the
          exclusive property of Venn and its licensors. The Service is protected by copyright,
          trademark, and other laws of both the United States and foreign countries. Our trademarks
          and trade dress may not be used in connection with any product or service without the prior
          written consent of Venn.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Links To Other Web Sites</h2>
        <p>
          Our Service may contain links to third party web sites or services that are not owned or
          controlled by Venn.
        </p>
        <p>
          Venn has no control over, and assumes no responsibility for the content, privacy policies,
          or practices of any third party web sites or services. We do not warrant the offerings of
          any of these entities/individuals or their websites.
        </p>
        <p>
          You acknowledge and agree that Venn shall not be responsible or liable, directly or
          indirectly, for any damage or loss caused or alleged to be caused by or in connection with
          use of or reliance on any such content, goods or services available on or through any such
          third party web sites or services.
        </p>
        <p>
          We strongly advise you to read the terms and conditions and privacy policies of any third
          party web sites or services that you visit.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Termination</h2>
        <p>
          We may terminate or suspend your account and bar access to the Service immediately, without
          prior notice or liability, under our sole discretion, for any reason whatsoever and without
          limitation, including but not limited to a breach of the Terms.
        </p>
        <p>
          If you wish to terminate your account, you may simply discontinue using the Service.
        </p>
        <p>
          All provisions of the Terms which by their nature should survive termination shall survive
          termination, including, without limitation, ownership provisions, warranty disclaimers,
          indemnity and limitations of liability.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the United
          States, without regard to its conflict of law provisions.
        </p>
        <p>
          Our failure to enforce any right or provision of these Terms will not be considered a
          waiver of those rights. If any provision of these Terms is held to be invalid or
          unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          These Terms constitute the entire agreement between us regarding our Service, and supersede
          and replace any prior agreements we might have had between us regarding the Service.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Changes</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
          If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms
          taking effect. What constitutes a material change will be determined at our sole
          discretion.
        </p>
        <p>
          By continuing to access or use our Service after any revisions become effective, you agree
          to be bound by the revised terms. If you do not agree to the new terms, you are no longer
          authorized to use the Service.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>By email: akashkumarprasad984@gmail.com</li>
        </ul>
      </div>

      <div className="mt-8 pt-6 border-t">
        <Link href="/" className="text-primary hover:underline">Back to Home</Link>
      </div>
    </div>
  );
} 