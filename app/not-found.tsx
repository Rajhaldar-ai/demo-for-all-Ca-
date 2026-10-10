import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calculator, FileCheck2, PhoneCall } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found (404)',
  description:
    'The page you requested could not be found. Return to our Chartered Accountant practice homepage, explore our tax and audit services, or contact us.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
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

      <main className="hero flex-1 flex items-center" id="main">
        <div className="wrap py-16 text-center max-w-3xl mx-auto">
          <span className="sticker">Error 404 · Page Not Found</span>
          <h1 style={{ fontSize: 'clamp(40px, 5.5vw, 68px)', marginBottom: '20px' }}>
            This ledger page could not be located. <span>Let&apos;s get you back on track.</span>
          </h1>
          <p className="lead mx-auto" style={{ maxWidth: '54ch' }}>
            The link you followed may be outdated or the page may have moved. Use the links below to
            return to our Chartered Accountancy services or schedule a consultation.
          </p>

          <div className="actions justify-center mt-8">
            <Link href="/" className="btn btn-tang">
              <ArrowLeft className="w-4 h-4" />
              Return to Homepage
            </Link>
            <Link href="/#services" className="btn btn-soft">
              <Calculator className="w-4 h-4" />
              Explore CA Services
            </Link>
            <Link href="/#contact" className="btn btn-soft">
              <PhoneCall className="w-4 h-4" />
              Contact CA Desk
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14 text-left">
            <div className="bg-[#F4EEFF] rounded-[24px] p-6">
              <FileCheck2 className="w-6 h-6 text-[#FF6A3D] mb-2" />
              <h2 className="text-lg font-extrabold mb-1">Tax &amp; GST Filings</h2>
              <p className="text-sm text-[#6A5F82] mb-0">
                View our ITR, GSTR-1/3B, and statutory audit scope of work on the main page.
              </p>
            </div>
            <div className="bg-[#FFE9DE] rounded-[24px] p-6">
              <Calculator className="w-6 h-6 text-[#2D1B4E] mb-2" />
              <h2 className="text-lg font-extrabold mb-1">ROC &amp; Incorporation</h2>
              <p className="text-sm text-[#6A5F82] mb-0">
                Private Limited, LLP registration, and annual MCA compliance checklists.
              </p>
            </div>
            <div className="bg-[#F4EEFF] rounded-[24px] p-6">
              <PhoneCall className="w-6 h-6 text-[#FF6A3D] mb-2" />
              <h2 className="text-lg font-extrabold mb-1">Privacy &amp; Policies</h2>
              <p className="text-sm text-[#6A5F82] mb-0">
                Review our <Link href="/privacy-policy" className="underline font-bold text-[#2D1B4E]">Privacy Policy</Link> and data confidentiality commitments.
              </p>
            </div>
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
