import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Confidentiality',
  description:
    'Learn how our Chartered Accountancy practice collects, uses, and protects your contact details, financial inquiry data, and website analytics preferences.',
  openGraph: {
    title: 'Privacy Policy & Data Confidentiality | Apex Chartered Accountants',
    description:
      'Learn how our Chartered Accountancy practice collects, uses, and protects your contact details, financial inquiry data, and website analytics preferences.',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <header className="site-header">
        <nav className="wrap nav" aria-label="Main">
          <Link href="/" className="logo">
            <i aria-hidden="true"></i>Apex Chartered Accountants
          </Link>
          <ul className="menu">
            <li>
              <Link href="/#home">Home</Link>
            </li>
            <li>
              <Link href="/#about">About</Link>
            </li>
            <li>
              <Link href="/#services">Service</Link>
            </li>
            <li>
              <Link href="/#reviews">Review</Link>
            </li>
            <li>
              <Link href="/#contact">Contact</Link>
            </li>
          </ul>
          <Link href="/#contact" className="btn btn-tang">
            Book CA Consultation
          </Link>
        </nav>
      </header>

      <main id="main" className="py-16">
        <div className="wrap max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6A3D] hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>

          <span className="sticker block w-fit">Client Confidentiality &amp; Data Protection</span>
          <h1 style={{ fontSize: 'clamp(34px, 4.5vw, 56px)', marginBottom: '16px' }}>
            Privacy Policy
          </h1>
          <p className="text-[#6A5F82] text-lg mb-8">
            Last Updated: <strong className="text-[#2D1B4E]">[PLACEHOLDER: Insert Effective Date, e.g., October 2026]</strong>
          </p>

          <div className="bg-[#FFE9DE] border border-[#FF6A3D]/30 rounded-[24px] p-6 mb-10 text-sm text-[#2A2140]">
            <strong className="text-[#2D1B4E] block text-base mb-1">
              Pre-Launch Notice (Client Information Required):
            </strong>
            Bracketed fields marked with <code>[PLACEHOLDER: ...]</code> must be populated with your
            verified Chartered Accountancy firm legal name, ICAI Firm Registration Number (FRN),
            registered office address, and designated grievance/privacy officer contact details prior to
            public launch.
          </div>

          <div className="space-y-8 text-[17px] text-[#2A2140]">
            <section className="p-7 rounded-[28px] bg-[#F4EEFF]" style={{ padding: '28px' }}>
              <div className="flex items-center gap-2.5 mb-3">
                <ShieldCheck className="w-6 h-6 text-[#FF6A3D]" />
                <h2 className="text-2xl">1. Identity of the Data Controller</h2>
              </div>
              <p className="mb-0">
                This website is operated by{' '}
                <strong>[PLACEHOLDER: Full Legal Name of Chartered Accountant Firm]</strong> (ICAI Firm
                Registration No.: <strong>[PLACEHOLDER: Insert Valid ICAI FRN]</strong>), having its
                registered office at{' '}
                <strong>[PLACEHOLDER: Complete Registered Office Address, City, State, PIN Code]</strong>.
                We are committed to protecting the confidentiality and security of personal and business
                information shared with us in accordance with applicable data protection laws (including
                the Digital Personal Data Protection Act, 2023 in India) and ICAI professional ethics
                guidelines.
              </p>
            </section>

            <section className="p-7 rounded-[28px] bg-white border-2 border-[#E3DAF3]" style={{ padding: '28px' }}>
              <div className="flex items-center gap-2.5 mb-3">
                <FileText className="w-6 h-6 text-[#FF6A3D]" />
                <h2 className="text-2xl">2. Information We Collect</h2>
              </div>
              <p>We only collect information that you voluntarily provide or consent to share:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#6A5F82]">
                <li>
                  <strong className="text-[#2D1B4E]">Consultation Form Inquiries:</strong> Your full name,
                  email address or phone/WhatsApp number, optional company name/entity type, and the
                  nature of the Chartered Accountancy service you are inquiring about.
                </li>
                <li>
                  <strong className="text-[#2D1B4E]">Sensitive Financial Documents:</strong> Please do{' '}
                  <strong>not</strong> submit confidential tax passwords, bank statements, or unencrypted
                  PAN/Aadhaar documents through the public website inquiry form. Such documents are
                  collected only after formal engagement through our secure client channels.
                </li>
                <li>
                  <strong className="text-[#2D1B4E]">Website Analytics (Optional &amp; Consent-Based):</strong>{' '}
                  With your explicit consent via our cookie banner, we may use Google Analytics 4 (with
                  IP anonymization enabled) to understand aggregate page visits and device types.
                </li>
              </ul>
            </section>

            <section className="p-7 rounded-[28px] bg-[#F4EEFF]" style={{ padding: '28px' }}>
              <div className="flex items-center gap-2.5 mb-3">
                <Lock className="w-6 h-6 text-[#FF6A3D]" />
                <h2 className="text-2xl">3. How We Use &amp; Protect Your Information</h2>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-[#6A5F82]">
                <li>To respond to your request for a Chartered Accountant consultation or tax inquiry.</li>
                <li>To perform conflict-of-interest checks and onboarding prior to a formal engagement letter.</li>
                <li>To protect our website from automated spam submissions using non-intrusive honeypot and rate-limit checks.</li>
                <li>
                  We <strong>never sell, rent, or trade</strong> your contact details or business
                  information to third-party marketers or data brokers.
                </li>
              </ul>
            </section>

            <section className="p-7 rounded-[28px] bg-white border-2 border-[#E3DAF3]" style={{ padding: '28px' }}>
              <h2 className="text-2xl mb-3">4. Data Retention &amp; Your Rights</h2>
              <p className="text-[#6A5F82]">
                Inquiry records submitted through this website are retained for{' '}
                <strong className="text-[#2D1B4E]">[PLACEHOLDER: e.g., 12 months]</strong> unless you
                enter into a formal professional engagement with our firm (in which case statutory audit
                and tax record retention rules prescribed by the ICAI and Income Tax Act apply). You have
                the right to request access to, correction of, or deletion of your inquiry data, or to
                withdraw analytics consent at any time.
              </p>
            </section>

            <section className="p-7 rounded-[28px] bg-[#2D1B4E] text-white" style={{ padding: '28px' }}>
              <h2 className="text-2xl text-white mb-3">5. Privacy &amp; Grievance Contact</h2>
              <p className="text-[#e5dcf7] mb-3">
                For any questions regarding this Privacy Policy or to exercise your data protection
                rights, please contact our designated partner:
              </p>
              <div className="text-sm space-y-1 text-[#FFB38A] font-bold">
                <div>Privacy Officer: [PLACEHOLDER: Name of Designated Partner, FCA]</div>
                <div>Email: [PLACEHOLDER: privacy@your-ca-firm.in]</div>
                <div>Phone: [PLACEHOLDER: +91-XXXXXXXXXX]</div>
                <div>Address: [PLACEHOLDER: Complete Office Address]</div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer>
        <div className="wrap foot">
          <Link href="/" className="logo">
            <i aria-hidden="true"></i>Apex Chartered Accountants
          </Link>
          <ul>
            <li>
              <Link href="/#home">Home</Link>
            </li>
            <li>
              <Link href="/#about">About</Link>
            </li>
            <li>
              <Link href="/#services">Service</Link>
            </li>
            <li>
              <Link href="/#reviews">Review</Link>
            </li>
            <li>
              <Link href="/#contact">Contact</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
          <span>© {new Date().getFullYear()} [Client Placeholder: Legal CA Firm Name &amp; ICAI FRN]</span>
        </div>
      </footer>
    </div>
  );
}
