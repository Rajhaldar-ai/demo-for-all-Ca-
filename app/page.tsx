'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator,
  Scale,
  Building2,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  X,
  FileCheck2,
  Receipt,
  ChevronLeft,
  ChevronRight,
  Clock,
  BadgeCheck,
} from 'lucide-react';
import TaxCalculatorModal from '@/components/TaxCalculatorModal';

interface ChartDataPoint {
  month: string;
  x: number;
  y: number;
  value: string;
  note: string;
}

interface CaseStudy {
  id: string;
  clientName: string;
  entityType: string;
  summary: string;
  kpis: {
    value: string;
    label: string;
  }[];
  chartTitle: string;
  chartSub: string;
  peakLabel: string;
  yLabels: [string, string, string, string];
  points: string;
  areaPoints: string;
  endY: number;
  milestones: ChartDataPoint[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'apex',
    clientName: 'Manufacturing MSME (Sample)',
    entityType: '[Placeholder: Manufacturing Client Case Study]',
    summary:
      '[Placeholder: Replace with your firm’s verified background, years of ICAI practice, and an approved client case study summary describing how your audit & tax planning helped a manufacturing or MSME client.]',
    kpis: [
      { value: '[XX+ Yrs]', label: 'Firm experience (Insert verified years)' },
      { value: '[₹XX.XL]', label: 'Client tax / ITC metric (Insert verified figure)' },
      { value: '100%', label: 'Scheduled statutory filing workflow' },
      { value: '[XXX+]', label: 'Active clients served (Insert verified count)' },
    ],
    chartTitle: 'Illustrative Compliance & Tax Optimization Trajectory (Sample Data)',
    chartSub: '[Placeholder: Replace chart data with verified firm / client metrics]',
    peakLabel: 'Sample Metric',
    yLabels: ['Q4', 'Q3', 'Q2', 'Q1'],
    points:
      'M45 223 L85 219 L130 212 L175 204 L220 190 L265 176 L310 158 L355 134 L400 112 L445 88 L490 64 L535 41',
    areaPoints:
      'M45 223 L85 219 L130 212 L175 204 L220 190 L265 176 L310 158 L355 134 L400 112 L445 88 L490 64 L535 41 L535 240 L45 240 Z',
    endY: 41,
    milestones: [
      { month: 'Q1 (Apr–Jun)', x: 45, y: 223, value: 'Phase 1', note: 'Past ledger & GSTR-2B diagnostic' },
      { month: 'Q2 (Jul–Sep)', x: 175, y: 204, value: 'Phase 2', note: 'Advance tax & TDS reconciliation' },
      { month: 'Q3 (Oct–Dec)', x: 310, y: 158, value: 'Phase 3', note: 'Depreciation & deduction review' },
      { month: 'Jan', x: 445, y: 88, value: 'Phase 4', note: 'Pre-year-end tax planning' },
      { month: 'Mar (Audit)', x: 535, y: 41, value: 'Completed', note: 'Annual audit & return filing' },
    ],
  },
  {
    id: 'cloudpulse',
    clientName: 'IT & Startup Advisory (Sample)',
    entityType: '[Placeholder: Startup / Exporter Case Study]',
    summary:
      '[Placeholder: Replace with an approved case study explaining how your Chartered Accountants assist technology startups or service exporters with company law, FEMA filings, and GST LUT refunds.]',
    kpis: [
      { value: '[Sample]', label: 'Export GST LUT / refund workflow' },
      { value: 'Monthly', label: 'Book closure & MIS reporting cadence' },
      { value: 'FEMA/ROC', label: 'Secretarial & regulatory filing support' },
      { value: 'UDIN', label: 'ICAI-compliant certification workflow' },
    ],
    chartTitle: 'Illustrative Startup Compliance & Reporting Timeline (Sample Data)',
    chartSub: '[Placeholder: Insert verified startup / Virtual CFO case study details]',
    peakLabel: 'Sample Metric',
    yLabels: ['Q4', 'Q3', 'Q2', 'Q1'],
    points:
      'M45 228 L85 220 L130 205 L175 192 L220 175 L265 155 L310 138 L355 116 L400 94 L445 72 L490 52 L535 35',
    areaPoints:
      'M45 228 L85 220 L130 205 L175 192 L220 175 L265 155 L310 138 L355 116 L400 94 L445 72 L490 52 L535 35 L535 240 L45 240 Z',
    endY: 35,
    milestones: [
      { month: 'Q1 (Apr–Jun)', x: 45, y: 228, value: 'Step 1', note: 'LUT Bond & export invoice mapping' },
      { month: 'Q2 (Jul–Sep)', x: 175, y: 192, value: 'Step 2', note: 'Quarterly GST & TDS filings' },
      { month: 'Q3 (Oct–Dec)', x: 310, y: 138, value: 'Step 3', note: 'ROC annual return preparation' },
      { month: 'Jan', x: 445, y: 72, value: 'Step 4', note: 'Advance tax & MIS review' },
      { month: 'Mar (Audit)', x: 535, y: 35, value: 'Completed', note: 'Statutory audit & year-end closure' },
    ],
  },
  {
    id: 'veda',
    clientName: 'Retail & GST Reconciliation (Sample)',
    entityType: '[Placeholder: Retail / Multi-Branch Case Study]',
    summary:
      '[Placeholder: Replace with an approved case study detailing how your firm manages multi-state GST reconciliation, e-commerce TCS credits, and inventory accounting for retail businesses.]',
    kpis: [
      { value: 'GSTR-2B', label: 'Automated vendor input credit matching' },
      { value: 'Multi-State', label: 'Branch GST & inventory reconciliation' },
      { value: 'Scrutiny', label: 'Department notice reply representation' },
      { value: 'Tally/Zoho', label: 'Cloud & desktop bookkeeping support' },
    ],
    chartTitle: 'Illustrative GST Reconciliation & Filing Workflow (Sample Data)',
    chartSub: '[Placeholder: Insert verified retail client metrics before publishing]',
    peakLabel: 'Sample Metric',
    yLabels: ['Q4', 'Q3', 'Q2', 'Q1'],
    points:
      'M45 225 L85 216 L130 208 L175 195 L220 182 L265 164 L310 146 L355 128 L400 106 L445 84 L490 66 L535 46',
    areaPoints:
      'M45 225 L85 216 L130 208 L175 195 L220 182 L265 164 L310 146 L355 128 L400 106 L445 84 L490 66 L535 46 L535 240 L45 240 Z',
    endY: 46,
    milestones: [
      { month: 'Q1 (Apr–Jun)', x: 45, y: 225, value: 'Q1', note: 'E-commerce TCS ledger reconciliation' },
      { month: 'Q2 (Jul–Sep)', x: 175, y: 195, value: 'Q2', note: 'Vendor GSTR-2B follow-up workflow' },
      { month: 'Q3 (Oct–Dec)', x: 310, y: 146, value: 'Q3', note: 'HSN & rate classification check' },
      { month: 'Jan', x: 445, y: 84, value: 'Q4', note: 'Pre-audit ledger verification' },
      { month: 'Mar (Audit)', x: 535, y: 46, value: 'Completed', note: 'GSTR-9 & 9C annual reconciliation' },
    ],
  },
];

interface ClientReviewCard {
  id: string;
  client: string;
  metric: string;
  title: string;
  image: string;
  alt: string;
  category: string;
  quote: string;
  founderName: string;
  founderRole: string;
  highlights: string[];
}

const CLIENT_REVIEWS: ClientReviewCard[] = [
  {
    id: 'r1',
    client: '[Placeholder: Client Company Name #1]',
    metric: 'Client-Approved Testimonial Slot',
    title: 'Statutory & Tax Audit Engagement',
    image: '/images/ca_case_manufacturing.jpg',
    alt: 'Modern corporate workspace with ledger binders and financial charts on a wooden desk',
    category: 'Statutory & Tax Audit',
    quote:
      '[Placeholder Testimonial #1: Insert a genuine, written-permission testimonial from your manufacturing or MSME audit client describing their experience with your CA firm.]',
    founderName: '[Placeholder: Client Full Name]',
    founderRole: '[Placeholder: Designation & Company Name]',
    highlights: [
      'Replace with verified scope of audit completed for this client',
      'Include only client-approved, factual outcomes',
      'Ensure compliance with ICAI guidelines before publishing',
    ],
  },
  {
    id: 'r2',
    client: '[Placeholder: Client Company Name #2]',
    metric: 'Client-Approved Testimonial Slot',
    title: 'Startup Incorporation & ROC Advisory',
    image: '/images/ca_case_startup.jpg',
    alt: 'Startup boardroom table with laptop displaying financial valuation charts and tax audit reports',
    category: 'Company Law & Virtual CFO',
    quote:
      '[Placeholder Testimonial #2: Insert a genuine, client-approved review from a startup founder or corporate director regarding your company incorporation, ROC, or Virtual CFO support.]',
    founderName: '[Placeholder: Client Full Name]',
    founderRole: '[Placeholder: Co-Founder / Director, Company Name]',
    highlights: [
      'Replace with verified ROC / FEMA / Virtual CFO deliverables',
      'Obtain written approval from the client prior to going live',
      'Keep statements factual and verifiable',
    ],
  },
  {
    id: 'r3',
    client: '[Placeholder: Client Company Name #3]',
    metric: 'Client-Approved Testimonial Slot',
    title: 'Multi-State GST & Input Credit Reconciliation',
    image: '/images/ca_case_retail.jpg',
    alt: 'Upscale modern retail store interior with organized wooden shelving and billing counter',
    category: 'GST Compliance & Advisory',
    quote:
      '[Placeholder Testimonial #3: Insert a genuine, client-approved testimonial regarding your monthly GSTR-1/3B filing, GSTR-2B reconciliation, or GST advisory services.]',
    founderName: '[Placeholder: Client Full Name]',
    founderRole: '[Placeholder: Proprietor / Managing Director, Company Name]',
    highlights: [
      'Replace with actual GST filing and reconciliation scope',
      'Do not publish unverified savings claims without client sign-off',
      'Verify accuracy of client designation and company name',
    ],
  },
  {
    id: 'r4',
    client: '[Placeholder: Client / Professional Name #4]',
    metric: 'Client-Approved Testimonial Slot',
    title: 'Direct Tax Planning & ITR Filing',
    image: '/images/ca_client_founder.jpg',
    alt: 'Smiling business founder in a tailored blazer inside a bright modern office',
    category: 'Income Tax & NRI Desk',
    quote:
      '[Placeholder Testimonial #4: Insert a genuine, client-approved review from an individual professional, doctor, or NRI client regarding your Income Tax filing and advisory service.]',
    founderName: '[Placeholder: Client Full Name]',
    founderRole: '[Placeholder: Profession / Organization]',
    highlights: [
      'Replace with verified direct tax or NRI compliance deliverables',
      'Ensure client consent is recorded for privacy compliance',
      'Maintain accurate attribution details',
    ],
  },
];

interface EntityComplianceProfile {
  id: 'pvt' | 'llp' | 'ind';
  label: string;
  entityTitle: string;
  udin: string;
  taxSaved: string;
  filings: {
    form: string;
    desc: string;
    status: string;
    highlight?: boolean;
  }[];
}

const ENTITY_PROFILES: EntityComplianceProfile[] = [
  {
    id: 'pvt',
    label: 'Pvt Ltd Company',
    entityTitle: 'Private Limited Statutory Checklist',
    udin: 'Sample Workflow · UDIN Verified',
    taxSaved: 'ITR-6 & ROC',
    filings: [
      {
        form: 'Income Tax (ITR-6 & Sec 115BAA)',
        desc: 'Corporate Tax Return & Advance Tax',
        status: 'Included ✓',
      },
      {
        form: 'Tax Audit (Form 3CA - 3CD)',
        desc: 'Section 44AB Statutory Tax Audit',
        status: 'UDIN Signoff ✓',
        highlight: true,
      },
      {
        form: 'Monthly GST (GSTR-1, 3B & 2B)',
        desc: 'Outward Return & 2B ITC Reconciliation',
        status: 'Monthly ✓',
      },
      {
        form: 'MCA / ROC (AOC-4 & MGT-7)',
        desc: 'Annual Financial Statements & Return',
        status: 'Annual ✓',
      },
      {
        form: 'Quarterly TDS (24Q & 26Q)',
        desc: 'Salary & Vendor TDS Reconciliation',
        status: 'Quarterly ✓',
      },
    ],
  },
  {
    id: 'llp',
    label: 'LLP / Partnership',
    entityTitle: 'LLP & Partnership Compliance Checklist',
    udin: 'Sample Workflow · UDIN Verified',
    taxSaved: 'ITR-5 & MCA',
    filings: [
      {
        form: 'Income Tax Return (ITR-5)',
        desc: 'Partner Remuneration & Interest Sec 40(b)',
        status: 'Included ✓',
      },
      {
        form: 'LLP ROC Form 11 & Form 8',
        desc: 'Annual Return & Statement of Solvency',
        status: 'MCA Filing ✓',
        highlight: true,
      },
      {
        form: 'GST Annual Return (GSTR-9/9C)',
        desc: 'Turnover & Input Credit Reconciliation',
        status: 'Annual ✓',
      },
      {
        form: 'Tax Audit (Form 3CB - 3CD)',
        desc: 'ICAI Audit Report (Where Applicable)',
        status: 'UDIN Signoff ✓',
      },
      {
        form: 'Advance Tax & AIS / 26AS',
        desc: 'Quarterly Instalment Computation',
        status: 'Quarterly ✓',
      },
    ],
  },
  {
    id: 'ind',
    label: 'Professional / NRI',
    entityTitle: 'Individual, Professional & NRI Desk',
    udin: 'Sample Workflow · UDIN Verified',
    taxSaved: 'ITR 1–4',
    filings: [
      {
        form: 'ITR-2 / ITR-3 / Sec 44ADA',
        desc: 'Professional & Capital Gains Return',
        status: 'Included ✓',
      },
      {
        form: 'Sec 54 / 54F Capital Gains',
        desc: 'Property & Equity Exemption Computation',
        status: 'Advisory ✓',
        highlight: true,
      },
      {
        form: 'Form 15CA & 15CB (NRI)',
        desc: 'CA Certificate for Foreign Remittance',
        status: 'UDIN Issued ✓',
      },
      {
        form: 'DTAA & Foreign Asset Schedule',
        desc: 'Schedule FA & Foreign Tax Credit Form 67',
        status: 'Included ✓',
      },
      {
        form: 'Net Worth & Visa CA Certificate',
        desc: 'UDIN Certified Valuation Report',
        status: 'On Request ✓',
      },
    ],
  },
];

const CA_PARTNERS = [
  {
    initials: 'P1',
    name: '[Placeholder: Managing Partner Name, FCA]',
    creds: '[Placeholder: Qualifications, e.g., FCA, DISA (ICAI), B.Com]',
    reg: 'ICAI M.No. [XXXXXX] · [XX] Yrs Experience',
    role: 'Managing Partner — Direct Tax & Statutory Audit',
  },
  {
    initials: 'P2',
    name: '[Placeholder: Senior Partner Name, FCA]',
    creds: '[Placeholder: Qualifications, e.g., FCA, Registered Valuer, CS]',
    reg: 'ICAI M.No. [XXXXXX] · [XX] Yrs Experience',
    role: 'Senior Partner — Corporate Law, ROC & FEMA',
  },
  {
    initials: 'P3',
    name: '[Placeholder: Partner Name, FCA / ACA]',
    creds: '[Placeholder: Qualifications, e.g., FCA, LL.B, GST Specialist]',
    reg: 'ICAI M.No. [XXXXXX] · [XX] Yrs Experience',
    role: 'Partner — Indirect Tax (GST), Audits & Representation',
  },
];

const FAQ_ITEMS = [
  {
    q: 'What documents are required for an initial Chartered Accountant consultation?',
    a: 'For an initial review, we typically request your previous year’s Income Tax Return (ITR-V & computation), Form 26AS / Annual Information Statement (AIS), and—for businesses—your recent GSTR-3B / GSTR-2B summary or trial balance. Do not send passwords or sensitive bank documents through the public contact form; our team will provide a secure upload link after onboarding.',
  },
  {
    q: 'Can you represent our business if we have received an Income Tax or GST notice?',
    a: 'Yes. Chartered Accountants are authorized to draft legal responses and represent taxpayers before Income Tax and GST authorities for scrutiny assessments (such as Section 143(2) or 148), defective return notices (139(9)), and GST discrepancies (ASMT-10 or DRC-01).',
  },
  {
    q: 'Do we need to visit your office physically to file returns or complete audits?',
    a: 'Most routine filings (ITR, GST, TDS, and ROC forms) can be completed digitally via secure document sharing and video consultation. Where physical stock verification or on-site statutory audit procedures are required, our audit team schedules visits at your premises.',
  },
  {
    q: 'Will any return or challan be filed without our prior approval?',
    a: 'No. Before submitting any Income Tax, GST, TDS, or MCA form, we share the draft computation, tax liability summary, and challan details with you for explicit confirmation.',
  },
  {
    q: 'How are professional fees determined for monthly retainers or annual audits?',
    a: 'Professional fees depend on your entity constitution (Individual, Proprietorship, LLP, or Private Limited Company), transaction volume, multi-state GST registrations, and statutory audit applicability. Contact us using the form below for a formal engagement proposal.',
  },
];

const smoothSpring = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 26,
};

export default function CharteredAccountantPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [selectedEntityTab, setSelectedEntityTab] = useState<'pvt' | 'llp' | 'ind'>('pvt');

  // About section state
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [hoveredMilestone, setHoveredMilestone] = useState<ChartDataPoint | null>(null);

  // Service section state
  const [serviceFilter, setServiceFilter] = useState<'all' | 'tax' | 'audit' | 'advisory'>('all');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<string | null>(null);

  // Review section state
  const [featuredReviewIdx, setFeaturedReviewIdx] = useState(0);
  const [selectedReview, setSelectedReview] = useState<ClientReviewCard | null>(null);

  // Interactive Tax & Compliance Calculator modal state
  const [calcOpen, setCalcOpen] = useState(false);
  const [turnoverLakhs, setTurnoverLakhs] = useState<number>(150);
  const [entityType, setEntityType] = useState<'prop' | 'llp' | 'pvt'>('pvt');

  // Contact form state + Spam protection state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formHandle, setFormHandle] = useState('');
  const [formGoal, setFormGoal] = useState('Income Tax Filing & Tax Planning (ITR)');
  const [formNote, setFormNote] = useState('');
  const [honeypotUrl, setHoneypotUrl] = useState('');
  const [formRenderedAt, setFormRenderedAt] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionRef, setSubmissionRef] = useState('');
  const [emailDeliveryMode, setEmailDeliveryMode] = useState('');
  const [formError, setFormError] = useState('');

  const activeCase = CASE_STUDIES[activeCaseIndex];
  const currentBannerReview = CLIENT_REVIEWS[featuredReviewIdx];
  const activeEntityProfile =
    ENTITY_PROFILES.find((p) => p.id === selectedEntityTab) || ENTITY_PROFILES[0];

  useEffect(() => {
    setFormRenderedAt(Date.now());
  }, []);

  // Scroll-spy for active navigation highlight
  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'reviews', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesList = [
    {
      id: 'svc-itr',
      category: 'tax' as const,
      icon: Calculator,
      title: 'Income Tax Filing & Planning',
      turnaround: 'ITR-1 to ITR-7 · Advance Tax',
      desc: 'Direct tax computation, corporate & individual ITR filing, capital gains exemption structuring (Sec 54/54F), and quarterly Advance Tax planning.',
      checklist: [
        'Line-by-line AIS, TIS & Form 26AS reconciliation before filing',
        'Old vs. New Tax Regime & Corporate Sec 115BAA evaluation',
        'NRI Taxation, DTAA relief & Form 15CA / 15CB certifications',
      ],
    },
    {
      id: 'svc-gst',
      category: 'tax' as const,
      icon: Receipt,
      title: 'GST Registration, Returns & Audit',
      turnaround: 'GSTR-1, 3B, 9/9C · 2B ITC Match',
      desc: 'End-to-end monthly GSTR-1 & GSTR-3B filings, GSTR-2B input tax credit reconciliation, LUT export refunds (RFD-01), and GSTR-9/9C annual audits.',
      checklist: [
        'Vendor GSTR-2B mismatch tracking to protect eligible Input Tax Credit',
        'E-Invoicing, E-Way Bill & HSN rate advisory across states',
        'GST refund documentation for exporters & inverted duty structures',
      ],
    },
    {
      id: 'svc-audit',
      category: 'audit' as const,
      icon: FileCheck2,
      title: 'Statutory, Tax & Internal Audit',
      turnaround: 'ICAI UDIN Certified · Form 3CA/3CD',
      desc: 'Statutory Audits under Companies Act 2013, Section 44AB Income Tax Audits (Form 3CA/3CB & 3CD), Internal Financial Controls (IFC), and Bank Stock Audits.',
      checklist: [
        'Clause-by-clause Form 3CD verification with UDIN sign-off',
        'Statutory Audit & CARO 2020 reporting for Private Limited Companies',
        'Net-Worth, Turnover & Bank CC/OD Drawing Power certificates',
      ],
    },
    {
      id: 'svc-roc',
      category: 'audit' as const,
      icon: Building2,
      title: 'Company Incorporation & ROC',
      turnaround: 'Pvt Ltd, LLP, OPC · MCA V3 Filings',
      desc: 'Incorporation of Private Limited Companies, LLPs, OPCs or Section 8 entities, plus annual ROC compliance (AOC-4, MGT-7, Form 8 & Form 11).',
      checklist: [
        'SPICe+ Incorporation, MOA/AOA drafting, PAN, TAN, GST & EPFO/ESIC',
        'Startup India (DPIIT) recognition & MSME Udyam registration',
        'Director KYC (DIR-3), Share Allotment (PAS-3) & Secretarial records',
      ],
    },
    {
      id: 'svc-notice',
      category: 'advisory' as const,
      icon: Scale,
      title: 'Tax Notice Reply & Representation',
      turnaround: 'Sec 143(2), 148 & GST DRC-01',
      desc: 'Received an Income Tax scrutiny notice, defective return 139(9), or GST ASMT-10 / DRC-01 notice? Our Chartered Accountants draft legal replies and represent you.',
      checklist: [
        'Faceless Assessment & CIT(Appeals) written submission & representation',
        'GST department audit, blocked credit & show-cause notice replies',
        'Outstanding tax demand rectification (Sec 154) & refund follow-up',
      ],
    },
    {
      id: 'svc-vcfo',
      category: 'advisory' as const,
      icon: TrendingUp,
      title: 'Bookkeeping, Payroll & Virtual CFO',
      turnaround: 'Tally Prime & Zoho · Monthly MIS',
      desc: 'CA-supervised accounting, quarterly TDS compliance (24Q/26Q), payroll processing, CMA data for bank loans, and FEMA/RBI Valuation Certificates.',
      checklist: [
        'Periodic bank, payment gateway & vendor ledger reconciliation',
        'Monthly P&L, Balance Sheet & Cashflow MIS reporting',
        'CMA Project Reports for working capital & term loan applications',
      ],
    },
  ];

  const filteredServices =
    serviceFilter === 'all'
      ? servicesList
      : servicesList.filter((s) => s.category === serviceFilter);

  // Recommend engagement scope based on turnover & entity constitution
  const isTaxAuditApplicable = turnoverLakhs >= 100;
  const recommendedPlanName =
    turnoverLakhs < 80
      ? 'Proprietorship / Professional CA Retainer'
      : turnoverLakhs <= 400
      ? 'Pvt Ltd / LLP Complete Audit & GST Retainer'
      : 'Enterprise Virtual CFO & Statutory Audit';

  const scrollToContactWithNote = (noteText: string) => {
    setFormNote(noteText);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      setFormError('Please enter your full name and official email address.');
      return;
    }
    if (!formEmail.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          handle: formHandle,
          goal: formGoal,
          note: formNote,
          website_url: honeypotUrl,
          formRenderedAt,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        setFormError(data.error || 'Unable to submit your request. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setSubmissionRef(data.referenceId || 'CA-INQ-RECEIVED');
      setEmailDeliveryMode(data.emailDeliveryMode || '');
      setFormSubmitted(true);
    } catch {
      setFormError('Network error while submitting form. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <a className="skip" href="#home">
        Skip to content
      </a>

      {/* Header — Strict 3-Zone Top Bar with the 5 Section Links */}
      <header className="site-header">
        <nav className="wrap nav" aria-label="Main">
          <a href="#home" className="logo">
            <i aria-hidden="true"></i>Apex Chartered Accountants
          </a>

          <ul className={`menu ${menuOpen ? 'open' : ''}`} id="menu">
            <li>
              <a
                href="#home"
                className={activeNav === 'home' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={activeNav === 'about' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                className={activeNav === 'services' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Service
              </a>
            </li>
            <li>
              <a
                href="#reviews"
                className={activeNav === 'reviews' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Review
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={activeNav === 'contact' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>

          <a href="#contact" className="btn btn-tang">
            Book CA Consultation
          </a>

          <button
            className="burger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      <main id="main">
        {/* =========================================================
            1. HOME SECTION
            ========================================================= */}
        <section id="home" className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-grid">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="sticker">
                Chartered Accountants · [Placeholder: Insert ICAI FRN]
              </span>
              <h1 id="hero-title">
                Tax, GST &amp; Audit precision. <span>Zero compliance stress.</span>
              </h1>
              <p className="lead">
                We are a Chartered Accountancy practice assisting companies, LLPs, MSMEs, startups, and
                individuals with Income Tax Planning, GST Returns, Statutory Audits (Form 3CD), Company
                Incorporation, and Tax Notice Representation.
              </p>
              <div className="actions">
                <a href="#contact" className="btn btn-tang">
                  Book CA consultation
                </a>
                <button
                  type="button"
                  onClick={() => setCalcOpen(true)}
                  className="btn btn-soft"
                >
                  <Calculator className="w-4 h-4" />
                  Calculate Income Tax &amp; GST
                </button>
              </div>
              <div className="faces">
                <div className="faces-avatars" aria-hidden="true">
                  <span className="face-badge" style={{ background: '#2D1B4E' }}>
                    CA
                  </span>
                  <span className="face-badge" style={{ background: '#FF6A3D' }}>
                    FCA
                  </span>
                  <span className="face-badge" style={{ background: '#44306B' }}>
                    GST
                  </span>
                  <span className="face-badge" style={{ background: '#2A2140' }}>
                    ROC
                  </span>
                </div>
                <span>
                  <b style={{ color: 'var(--grape)' }}>
                    [Placeholder: Insert Verified Client Count / Years of Practice]
                  </b>{' '}
                  across Corporate, MSME &amp; Individual Taxation
                </span>
              </div>
            </motion.div>

            {/* Right Column: Authentic Chartered Accountant Compliance & Audit Ledger Card */}
            <motion.div
              className="phone-wrap"
              aria-label="Interactive Chartered Accountant Statutory Compliance Checklist"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="phone" style={{ width: '380px', borderRadius: '38px' }}>
                <div className="screen" style={{ borderRadius: '26px' }}>
                  {/* CA Certificate Header */}
                  <div className="p-4 bg-[#2D1B4E] text-white flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#FF6A3D] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
                        CA
                      </div>
                      <div>
                        <div className="text-xs font-extrabold tracking-tight text-white">
                          STATUTORY COMPLIANCE DOSSIER
                        </div>
                        <div className="text-[11px] text-[#FFB38A]">{activeEntityProfile.udin}</div>
                      </div>
                    </div>
                    <BadgeCheck className="w-5 h-5 text-[#FFB38A] shrink-0" />
                  </div>

                  {/* Interactive Entity Type Switcher inside the CA Card */}
                  <div className="px-3 pt-3 pb-2 bg-[#F4EEFF] flex gap-1">
                    {ENTITY_PROFILES.map((prof) => (
                      <button
                        key={prof.id}
                        type="button"
                        onClick={() => setSelectedEntityTab(prof.id)}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer border-0 transition-colors whitespace-nowrap ${
                          selectedEntityTab === prof.id
                            ? 'bg-[#2D1B4E] text-white'
                            : 'bg-white text-[#2D1B4E] hover:bg-[#FFE9DE]'
                        }`}
                      >
                        {prof.label}
                      </button>
                    ))}
                  </div>

                  {/* Entity Summary Metrics */}
                  <div className="pstats border-b border-[#E3DAF3] bg-white">
                    <div>
                      <b>100%</b>Scheduled Filings
                    </div>
                    <div>
                      <b style={{ color: 'var(--tang)' }}>{activeEntityProfile.taxSaved}</b>Core Scope
                    </div>
                    <div>
                      <b>UDIN</b>Verified
                    </div>
                  </div>

                  {/* Authentic CA Filing Checklist Rows */}
                  <div className="p-3 space-y-2 bg-white">
                    {activeEntityProfile.filings.map((item) => (
                      <div
                        key={item.form}
                        className={`p-2.5 rounded-xl flex items-center justify-between gap-2 transition-transform hover:translate-x-1 ${
                          item.highlight ? 'bg-[#FFE9DE]' : 'bg-[#F4EEFF]'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-extrabold text-[#2D1B4E] truncate">{item.form}</div>
                          <div className="text-[11px] text-[#6A5F82] truncate">{item.desc}</div>
                        </div>
                        <span className="text-[11px] font-extrabold text-[#FF6A3D] bg-white px-2.5 py-1 rounded-lg shrink-0">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Signed by Partner Footer */}
                  <div className="px-4 py-2.5 bg-[#F4EEFF] border-t border-[#E3DAF3] text-[11px] text-[#2D1B4E] flex items-center justify-between">
                    <span className="font-bold">[Placeholder: Partner Name, FCA]</span>
                    <span className="text-[#FF6A3D] font-extrabold">FY 2025–26</span>
                  </div>
                </div>
              </div>

              <motion.div
                className="notif n1"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                ITR, GST &amp; TDS Desk<b>Timely Filings</b>
              </motion.div>
              <motion.div
                className="notif n2"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              >
                Form 3CD Tax Audit<b>ICAI Compliant</b>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Chartered Accountancy Practice Pillars Bar */}
        <div className="platforms" aria-label="Chartered Accountancy practice pillars">
          <div className="wrap">
            <span>Income Tax &amp; 44AB Audit</span>
            <span>GST Filing &amp; 2B Reconciliation</span>
            <span>Statutory &amp; Internal Audit</span>
            <span>Pvt Ltd &amp; LLP Incorporation</span>
            <span>ROC &amp; FEMA Compliance</span>
            <span>NRI Tax &amp; Virtual CFO</span>
          </div>
        </div>

        {/* =========================================================
            2. ABOUT SECTION
            ========================================================= */}
        <section className="growth" id="about" aria-labelledby="about-title">
          <div className="wrap">
            {/* Senior CA Partners Strip */}
            <div className="mb-14">
              <div className="head" style={{ marginBottom: '28px' }}>
                <h2 id="about-title">About Our Chartered Accountancy Practice.</h2>
                <p>
                  We combine statutory audit discipline with proactive direct and indirect tax advisory.
                  <strong className="text-[#2D1B4E]">
                    {' '}
                    (Note: Replace the partner cards and sample case metrics below with your verified
                    ICAI firm details before launch.)
                  </strong>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {CA_PARTNERS.map((partner, idx) => (
                  <motion.div
                    key={partner.initials}
                    className="bg-white rounded-[24px] p-6 border border-[#E3DAF3] flex items-start gap-4"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: idx * 0.06, ...smoothSpring }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#2D1B4E] text-[#FFB38A] font-extrabold flex items-center justify-center text-base shrink-0">
                      {partner.initials}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-[#2D1B4E]">{partner.name}</h3>
                      <div className="text-xs font-bold text-[#FF6A3D] mt-0.5">{partner.creds}</div>
                      <div className="text-xs text-[#6A5F82] mt-1">{partner.reg}</div>
                      <p className="text-sm text-[#2A2140] mt-2 mb-0">{partner.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interactive Client Audit & Tax Workflow Track Record */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Select sample client workflow">
                {CASE_STUDIES.map((cs, index) => (
                  <button
                    key={cs.id}
                    type="button"
                    role="tab"
                    aria-selected={activeCaseIndex === index}
                    onClick={() => {
                      setActiveCaseIndex(index);
                      setHoveredMilestone(null);
                    }}
                    className={`px-4 py-2 rounded-full text-[15px] font-bold transition-all duration-200 cursor-pointer border-0 whitespace-nowrap ${
                      activeCaseIndex === index
                        ? 'bg-[#2D1B4E] text-white shadow-md scale-[1.02]'
                        : 'bg-white text-[#2D1B4E] hover:bg-[#FFE9DE]'
                    }`}
                  >
                    {cs.clientName}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setCalcOpen(true)}
                className="inline-flex items-center gap-2 text-[15px] font-bold text-[#FF6A3D] hover:underline cursor-pointer bg-transparent border-0"
              >
                <Calculator className="w-4 h-4" />
                Open Interactive Income Tax &amp; GST Calculator →
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCase.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="growth-grid"
              >
                <div>
                  <h3 style={{ fontSize: 'clamp(28px, 3.6vw, 44px)' }}>{activeCase.entityType}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '18px', marginTop: '14px' }}>
                    {activeCase.summary}
                  </p>
                  <div className="kpis">
                    {activeCase.kpis.map((kpi, idx) => (
                      <motion.div
                        key={kpi.label}
                        className="kpi"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.06, ...smoothSpring }}
                        whileHover={{ y: -6, scale: 1.015 }}
                      >
                        <b>{kpi.value}</b>
                        <span>{kpi.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  className="chart"
                  whileHover={{ y: -6 }}
                  transition={smoothSpring}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3>{activeCase.chartTitle}</h3>
                      <p className="mb-0">{activeCase.chartSub}</p>
                    </div>
                    {hoveredMilestone ? (
                      <div className="bg-[#2D1B4E] text-white px-3 py-1.5 rounded-xl text-xs text-right shrink-0">
                        <div className="font-extrabold text-[#FFB38A]">
                          {hoveredMilestone.month}: {hoveredMilestone.value}
                        </div>
                        <div className="text-[11px] opacity-90">{hoveredMilestone.note}</div>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-[#6A5F82] bg-[#F4EEFF] px-2.5 py-1 rounded-lg shrink-0">
                        Hover quarters to inspect
                      </span>
                    )}
                  </div>

                  <svg
                    viewBox="0 0 560 300"
                    role="img"
                    aria-label={`Line chart showing ${activeCase.chartTitle}`}
                  >
                    <g stroke="#E3DAF3" strokeWidth="1">
                      <line x1="45" y1="30" x2="540" y2="30" />
                      <line x1="45" y1="100" x2="540" y2="100" />
                      <line x1="45" y1="170" x2="540" y2="170" />
                      <line x1="45" y1="240" x2="540" y2="240" />
                    </g>
                    <g fontFamily="Karla, sans-serif" fontSize="13" fill="#6A5F82">
                      <text x="0" y="34">
                        {activeCase.yLabels[0]}
                      </text>
                      <text x="0" y="104">
                        {activeCase.yLabels[1]}
                      </text>
                      <text x="0" y="174">
                        {activeCase.yLabels[2]}
                      </text>
                      <text x="8" y="244">
                        {activeCase.yLabels[3]}
                      </text>
                      <text x="45" y="268">
                        Apr (Q1)
                      </text>
                      <text x="165" y="268">
                        Jul (Q2)
                      </text>
                      <text x="295" y="268">
                        Oct (Q3)
                      </text>
                      <text x="430" y="268">
                        Jan (Q4)
                      </text>
                      <text x="510" y="268">
                        Mar
                      </text>
                    </g>
                    <path d={activeCase.areaPoints} fill="#FF6A3D" opacity=".12" />
                    <motion.path
                      d={activeCase.points}
                      fill="none"
                      stroke="#FF6A3D"
                      strokeWidth="4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.75, ease: 'easeOut' }}
                    />

                    {activeCase.milestones.map((m) => {
                      const isActive = hoveredMilestone?.month === m.month;
                      return (
                        <g
                          key={m.month}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredMilestone(m)}
                          onClick={() => setHoveredMilestone(m)}
                        >
                          <circle
                            cx={m.x}
                            cy={m.y}
                            r={isActive ? 10 : 6}
                            fill={isActive ? '#2D1B4E' : '#FF6A3D'}
                            stroke="#fff"
                            strokeWidth="2.5"
                          />
                        </g>
                      );
                    })}

                    <text
                      x="420"
                      y={activeCase.endY - 14}
                      fontFamily="Lexend, sans-serif"
                      fontWeight="700"
                      fontSize="15"
                      fill="#2D1B4E"
                    >
                      {activeCase.peakLabel}
                    </text>
                  </svg>

                  <div className="mt-3 pt-3 border-t border-[#E3DAF3] flex flex-wrap items-center justify-between gap-2 text-xs text-[#6A5F82]">
                    <span>[Placeholder: Insert ICAI FRN]</span>
                    <span>·</span>
                    <span>UDIN Mandatory Verification</span>
                    <span>·</span>
                    <span className="font-bold text-[#2D1B4E]">Confidential Client Records</span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* 4-Step CA Audit & Compliance Process inside About Section */}
            <div className="mt-20 pt-12 border-t border-[#E3DAF3]">
              <div className="head" style={{ marginBottom: '36px' }}>
                <h3 style={{ fontSize: 'clamp(28px, 3.4vw, 42px)' }}>Our 4-step Chartered Accountancy workflow</h3>
                <p>Structured, paperless, and supervised directly by a Chartered Accountant partner.</p>
              </div>
              <div className="steps">
                {[
                  {
                    num: '1',
                    title: 'Past ledger & portal review',
                    desc: 'We review your Income Tax portal, AIS/26AS, GST electronic credit ledger, and MCA records to identify pending compliances.',
                  },
                  {
                    num: '2',
                    title: 'Annual compliance calendar',
                    desc: 'You receive a customized 12-month statutory calendar covering TDS, GSTR-1/3B, Advance Tax, and ROC deadlines.',
                  },
                  {
                    num: '3',
                    title: 'CA computation & sign-off',
                    desc: 'Our audit team prepares your financials and tax computations. You review and approve challans digitally.',
                  },
                  {
                    num: '4',
                    title: 'Timely filing & UDIN report',
                    desc: 'We file all statutory returns before due dates, generate ICAI UDIN certificates, and share monthly MIS reports.',
                  },
                ].map((step, i) => (
                  <motion.div
                    key={step.num}
                    className="step"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: i * 0.07, ...smoothSpring }}
                    whileHover={{ y: -6 }}
                  >
                    <span>{step.num}</span>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            3. SERVICE SECTION (Includes Helpful FAQ Accordion)
            ========================================================= */}
        <section id="services" aria-labelledby="svc-title">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <div className="head" style={{ marginBottom: 0 }}>
                <h2 id="svc-title">Chartered Accountant services we offer.</h2>
                <p>
                  Comprehensive taxation, statutory audit, corporate law, and Virtual CFO services for
                  businesses, startups, and individuals.
                </p>
              </div>

              {/* Interactive Service Category Filter */}
              <div className="inline-flex flex-wrap gap-1.5 p-1.5 bg-[#F4EEFF] rounded-2xl">
                {[
                  { id: 'all', label: 'All CA Services (6)' },
                  { id: 'tax', label: 'Income Tax & GST' },
                  { id: 'audit', label: 'Audit & ROC Law' },
                  { id: 'advisory', label: 'Litigation & Virtual CFO' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setServiceFilter(tab.id as 'all' | 'tax' | 'audit' | 'advisory')}
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold cursor-pointer border-0 transition-all duration-200 whitespace-nowrap ${
                      serviceFilter === tab.id
                        ? 'bg-[#2D1B4E] text-white shadow-xs'
                        : 'bg-transparent text-[#2D1B4E] hover:bg-white/70'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <motion.div layout className="svc">
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, idx) => {
                  const IconComponent = service.icon;
                  const isExpanded = selectedServiceDetail === service.id;
                  return (
                    <motion.article
                      key={service.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.05, ...smoothSpring }}
                      whileHover={{ y: -8 }}
                      className="card group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="emo" style={{ marginBottom: 0 }} aria-hidden="true">
                          <IconComponent className="w-6 h-6" />
                        </span>
                        <span className="text-xs font-bold text-[#6A5F82] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#FF6A3D]" />
                          {service.turnaround}
                        </span>
                      </div>

                      <h3>{service.title}</h3>
                      <p>{service.desc}</p>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-4 pt-4 border-t border-[#2D1B4E]/15 space-y-2 text-[15px] text-[#2A2140] list-none p-0 overflow-hidden"
                          >
                            {service.checklist.map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#FF6A3D] shrink-0 mt-1" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>

                      <div className="mt-auto pt-5 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedServiceDetail(isExpanded ? null : service.id)}
                          className="inline-flex items-center gap-1.5 text-[15px] font-bold text-[#2D1B4E] hover:text-[#FF6A3D] transition-colors cursor-pointer bg-transparent border-0 p-0"
                        >
                          {isExpanded ? 'Hide scope of work' : 'View scope of work'}
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>

                        <button
                          type="button"
                          onClick={() => scrollToContactWithNote(`CA Service Inquiry: ${service.title}`)}
                          className="text-xs font-bold text-[#FF6A3D] hover:underline bg-transparent border-0 cursor-pointer p-0"
                        >
                          Consult CA →
                        </button>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Checklist #14: Helpful FAQ Accordion inside Service Section */}
            <div className="mt-24 pt-12 border-t border-[#E3DAF3]">
              <div className="head center" style={{ marginBottom: '36px' }}>
                <h3 style={{ fontSize: 'clamp(30px, 3.8vw, 48px)' }}>
                  Frequently asked questions
                </h3>
                <p>
                  Practical answers regarding tax filings, statutory audits, document security, and
                  engagement onboarding.
                </p>
              </div>
              <div className="faq">
                {FAQ_ITEMS.map((faq, index) => (
                  <details key={faq.q} open={index === 0}>
                    <summary>{faq.q}</summary>
                    <p>{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            4. REVIEW SECTION (Strict Client-Approved Testimonial Placeholders)
            ========================================================= */}
        <section id="reviews" style={{ paddingTop: 0 }} aria-labelledby="reviews-title">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
              <div className="head" style={{ marginBottom: 0 }}>
                <h2 id="reviews-title">Client testimonials &amp; audit outcomes.</h2>
                <p>
                  <strong className="text-[#2D1B4E]">Pre-Launch Verification Notice:</strong> The cards
                  below contain structured placeholders. Replace them exclusively with genuine,
                  client-approved testimonials before publishing.
                </p>
              </div>

              {/* Carousel Controls for Featured Orange Review Banner */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous client testimonial"
                  onClick={() =>
                    setFeaturedReviewIdx((prev) => (prev - 1 + CLIENT_REVIEWS.length) % CLIENT_REVIEWS.length)
                  }
                  className="w-11 h-11 rounded-full bg-[#F4EEFF] text-[#2D1B4E] hover:bg-[#2D1B4E] hover:text-white transition-colors flex items-center justify-center cursor-pointer border-0"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next client testimonial"
                  onClick={() => setFeaturedReviewIdx((prev) => (prev + 1) % CLIENT_REVIEWS.length)}
                  className="w-11 h-11 rounded-full bg-[#F4EEFF] text-[#2D1B4E] hover:bg-[#2D1B4E] hover:text-white transition-colors flex items-center justify-center cursor-pointer border-0"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Featured Orange Review Banner */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBannerReview.id}
                className="review mb-12"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5 }}
              >
                <img
                  src={currentBannerReview.image}
                  alt={currentBannerReview.alt}
                  width={160}
                  height={160}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p>&ldquo;{currentBannerReview.quote}&rdquo;</p>
                  <span>
                    {currentBannerReview.founderName} — {currentBannerReview.founderRole}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 4 Structured CA Client Review & Audit Outcome Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CLIENT_REVIEWS.map((item, idx) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.07, ...smoothSpring }}
                  whileHover={{ y: -7 }}
                  onClick={() => setSelectedReview(item)}
                  className="card cursor-pointer group"
                  style={{ background: idx % 2 === 1 ? '#FFE9DE' : 'var(--lilac)' }}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-extrabold text-[#2D1B4E]">{item.category}</span>
                    <span className="text-xs font-extrabold text-[#FF6A3D] bg-white px-3 py-1 rounded-full">
                      {item.metric}
                    </span>
                  </div>

                  <h3 className="text-xl mb-2">{item.client}</h3>
                  <p className="text-[16px] text-[#2A2140] italic mb-4">&ldquo;{item.quote}&rdquo;</p>

                  <div className="mt-auto pt-4 border-t border-[#2D1B4E]/10 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-extrabold text-[#2D1B4E]">{item.founderName}</div>
                      <div className="text-xs text-[#6A5F82]">{item.founderRole}</div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF6A3D] group-hover:translate-x-1 transition-transform">
                      Inspect slot <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            5. CONTACT SECTION (With Spam Protection & Thank-You Confirmation)
            ========================================================= */}
        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="wrap contact-grid">
            <div>
              <h2 id="contact-title">Consult a Chartered Accountant.</h2>
              <p className="lead">
                Share your business or personal tax requirement. Our CA desk will review your inquiry and
                respond with a consultation schedule and required document checklist.
              </p>

              {/* Interactive Statutory Due-Date Quick Selector */}
              <div className="my-7 p-5 rounded-2xl bg-[#44306B]/60 border border-[#FFB38A]/20">
                <div className="text-xs font-bold text-[#FFB38A] mb-3">
                  STATUTORY DUE-DATE DESK — CLICK TO SELECT FILING REQUIREMENT:
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { due: '7th of Month', label: 'Monthly TDS / TCS Deposit' },
                    { due: '11th & 20th', label: 'GSTR-1, GSTR-3B & 2B ITC' },
                    { due: 'Sep / Oct', label: 'Sec 44AB Tax Audit (3CD)' },
                    { due: 'July / Oct', label: 'Income Tax Return (ITR 1–7)' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setFormNote(`Statutory Filing: ${item.label} (Due: ${item.due})`)}
                      className="text-left p-2.5 rounded-xl bg-[#2D1B4E]/80 hover:bg-[#FF6A3D] text-white transition-colors cursor-pointer border border-white/10"
                    >
                      <div className="text-[11px] font-bold text-[#FFB38A]">{item.due}</div>
                      <div className="text-xs font-bold truncate">{item.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <p>
                Official Email:{' '}
                <a href="mailto:contact@your-ca-firm.example.com">
                  [Placeholder: contact@your-ca-firm.in]
                </a>
                <br />
                Direct Phone / WhatsApp:{' '}
                <a href="tel:+910000000000">[Placeholder: +91-XXXXXXXXXX]</a>
                <br />
                <span className="text-sm text-[#e5dcf7]/80 block mt-3">
                  [Placeholder: Insert ICAI Firm Registration Number &amp; Verified Office Address(es)]
                </span>
              </p>
            </div>

            <motion.form
              className="contact-form"
              onSubmit={handleFormSubmit}
              aria-label="Book a Chartered Accountant consultation"
              noValidate
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={smoothSpring}
            >
              {formSubmitted ? (
                <motion.div
                  role="status"
                  aria-live="polite"
                  className="py-6 text-center"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#F4EEFF] text-[#FF6A3D] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <span className="inline-block bg-[#F4EEFF] text-[#2D1B4E] text-xs font-extrabold px-3 py-1 rounded-full mb-2">
                    Reference ID: {submissionRef}
                  </span>
                  <h3 className="text-2xl mb-2">Thank You! Your Inquiry Has Been Recorded.</h3>
                  <p className="text-[#6A5F82] mb-4">
                    Thank you, <b className="text-[#2D1B4E]">{formName}</b>. Your consultation request for{' '}
                    <b className="text-[#2D1B4E]">{formHandle || 'your account'}</b> has passed spam
                    verification and been logged.
                  </p>
                  <div className="bg-[#F4EEFF] rounded-2xl p-4 text-left text-sm mb-4 space-y-1.5">
                    <div>
                      <b className="text-[#2D1B4E]">Service Requested:</b> {formGoal}
                    </div>
                    {formNote && (
                      <div>
                        <b className="text-[#2D1B4E]">Selected Filing / Note:</b> {formNote}
                      </div>
                    )}
                    <div>
                      <b className="text-[#2D1B4E]">Contact Email:</b> {formEmail}
                    </div>
                  </div>
                  {emailDeliveryMode === 'placeholder_pending_smtp_setup' && (
                    <div className="bg-[#FFE9DE] rounded-xl p-3 text-left text-xs text-[#2A2140] mb-5">
                      <strong className="text-[#2D1B4E]">Pre-Launch Setup Note:</strong> Form validation
                      and anti-spam checks succeeded via <code>/api/contact</code>. Configure{' '}
                      <code>CONTACT_RECEIVER_EMAIL</code> and an SMTP/email provider on your host to
                      enable live inbox forwarding.
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormName('');
                      setFormEmail('');
                      setFormHandle('');
                      setFormNote('');
                      setFormRenderedAt(Date.now());
                    }}
                    className="btn btn-soft"
                  >
                    Submit another inquiry
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Honeypot field for spam bot protection — hidden from screen readers and human users */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: '1px',
                      height: '1px',
                      overflow: 'hidden',
                    }}
                  >
                    <label htmlFor="website_url">Leave this field blank</label>
                    <input
                      id="website_url"
                      name="website_url"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypotUrl}
                      onChange={(e) => setHoneypotUrl(e.target.value)}
                    />
                  </div>

                  {formNote && (
                    <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-[#F4EEFF] text-sm text-[#2D1B4E] flex items-center justify-between">
                      <span>
                        Selected: <b>{formNote}</b>
                      </span>
                      <button
                        type="button"
                        onClick={() => setFormNote('')}
                        className="text-xs font-bold text-[#FF6A3D] bg-transparent border-0 cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  )}

                  {formError && (
                    <div
                      role="alert"
                      className="mb-4 px-3.5 py-2.5 rounded-xl bg-[#FFE9DE] text-sm font-bold text-[#2D1B4E]"
                    >
                      {formError}
                    </div>
                  )}

                  <label htmlFor="n">Your Full Name *</label>
                  <input
                    id="n"
                    name="name"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                  />

                  <label htmlFor="e">Official Email Address *</label>
                  <input
                    id="e"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    required
                  />

                  <label htmlFor="h">Company Name or Entity Type (Optional)</label>
                  <input
                    id="h"
                    name="handle"
                    placeholder="e.g. Example Pvt Ltd / LLP / Individual"
                    value={formHandle}
                    onChange={(e) => setFormHandle(e.target.value)}
                  />

                  <label htmlFor="g">CA Service Required</label>
                  <select
                    id="g"
                    name="goal"
                    value={formGoal}
                    onChange={(e) => setFormGoal(e.target.value)}
                  >
                    <option>Income Tax Filing &amp; Tax Planning (ITR)</option>
                    <option>GST Registration, Monthly Returns &amp; 2B Audit</option>
                    <option>Statutory Audit / Sec 44AB Tax Audit (Form 3CD)</option>
                    <option>New Pvt Ltd / LLP Incorporation &amp; ROC Filing</option>
                    <option>Income Tax / GST Scrutiny Notice Representation</option>
                    <option>Monthly Bookkeeping &amp; Virtual CFO Retainer</option>
                  </select>

                  <p className="text-xs text-[#6A5F82] mb-4">
                    Protected by anti-spam verification. By submitting this form, you agree to our{' '}
                    <Link href="/privacy-policy" className="underline font-bold text-[#2D1B4E]">
                      Privacy Policy
                    </Link>
                    . Do not include confidential passwords or sensitive ID numbers here.
                  </p>

                  <button className="btn btn-tang" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Verifying & Submitting...' : 'Request CA Consultation'}
                  </button>
                </>
              )}
            </motion.form>
          </div>
        </section>
      </main>

      {/* =========================================================
          6. FOOTER
          ========================================================= */}
      <footer>
        <div className="wrap foot">
          <a href="#home" className="logo">
            <i aria-hidden="true"></i>Apex Chartered Accountants
          </a>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Service</a>
            </li>
            <li>
              <a href="#reviews">Review</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <a href="/sitemap.xml">Sitemap</a>
            </li>
          </ul>
          <span>
            © {new Date().getFullYear()} [Client Placeholder: Full Legal CA Firm Name &amp; ICAI FRN]
          </span>
        </div>
      </footer>

      {/* Floating Quick-Trigger Button for Tax & GST Calculator Popup */}
      <button
        type="button"
        onClick={() => setCalcOpen(true)}
        aria-label="Open Income Tax and GST Calculator Popup"
        className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#FF6A3D] text-white font-bold text-sm shadow-xl hover:scale-105 transition-transform cursor-pointer border-2 border-white"
      >
        <Calculator className="w-4 h-4" />
        <span>Tax &amp; GST Calculator</span>
      </button>

      {/* MODAL 1: All-in-One Interactive Tax, GST & Business Tax Calculator Popup */}
      <TaxCalculatorModal
        isOpen={calcOpen}
        onClose={() => setCalcOpen(false)}
        onSelectConsultation={scrollToContactWithNote}
      />

      {/* MODAL 2: Client Review Placeholder Detail View */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-[#2D1B4E]/70 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={smoothSpring}
              className="bg-white rounded-[28px] max-w-lg w-full p-7 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                aria-label="Close review details"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F4EEFF] text-[#2D1B4E] flex items-center justify-center cursor-pointer border-0 hover:bg-[#FFE9DE]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs font-bold text-[#FF6A3D] mb-1">
                {selectedReview.category} · {selectedReview.metric}
              </div>
              <h3 id="review-modal-title" className="text-2xl mb-2">
                {selectedReview.client}: {selectedReview.title}
              </h3>
              <p className="text-[#6A5F82] text-[16px] italic mb-2">
                &ldquo;{selectedReview.quote}&rdquo;
              </p>
              <div className="text-xs font-bold text-[#2D1B4E] mb-4">
                — {selectedReview.founderName}, {selectedReview.founderRole}
              </div>

              <div className="bg-[#F4EEFF] rounded-2xl p-4 mb-6">
                <div className="text-xs font-bold text-[#2D1B4E] mb-2">
                  Pre-Launch Testimonial Checklist:
                </div>
                <ul className="space-y-2 list-none p-0 m-0 text-sm text-[#2A2140]">
                  {selectedReview.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FF6A3D] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const title = selectedReview.title;
                    setSelectedReview(null);
                    scrollToContactWithNote(`CA Inquiry: ${title}`);
                  }}
                  className="btn btn-tang flex-1 justify-center"
                >
                  Inquire about {selectedReview.category}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
