'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';

export default function AnalyticsManager() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [consent, setConsent] = useState<'granted' | 'denied' | 'pending'>('pending');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('ca_cookie_analytics_consent');
      if (saved === 'granted' || saved === 'denied') {
        setConsent(saved);
      }
    } catch {
      // Ignore storage access errors in restricted iframes
    }
  }, []);

  const handleConsent = (choice: 'granted' | 'denied') => {
    setConsent(choice);
    try {
      localStorage.setItem('ca_cookie_analytics_consent', choice);
    } catch {
      // Ignore storage errors
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Load Google Analytics 4 ONLY when both GA Measurement ID is configured AND visitor grants consent */}
      {gaId && consent === 'granted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `}
          </Script>
        </>
      )}

      {/* Privacy & Analytics Consent Bar (non-intrusive, respects 15% mobile sticky cap) */}
      {consent === 'pending' && (
        <aside
          aria-label="Privacy and analytics preferences"
          className="fixed bottom-3 right-3 left-3 md:left-auto md:max-w-md z-40 bg-[#2D1B4E] text-white p-4 rounded-2xl shadow-xl border border-white/15 text-xs"
        >
          <div className="flex flex-col gap-2.5">
            <p className="m-0 leading-relaxed text-[#e5dcf7]">
              We respect your financial privacy. Optional analytics cookies are disabled by default and
              only activated with your approval. Read our{' '}
              <Link href="/privacy-policy" className="text-[#FFB38A] underline font-bold">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleConsent('denied')}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer border-0 transition-colors whitespace-nowrap"
              >
                Decline Optional Cookies
              </button>
              <button
                type="button"
                onClick={() => handleConsent('granted')}
                className="px-3.5 py-1.5 rounded-full bg-[#FF6A3D] hover:bg-[#ff7e57] text-white font-bold cursor-pointer border-0 transition-colors whitespace-nowrap"
              >
                Accept Analytics
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
