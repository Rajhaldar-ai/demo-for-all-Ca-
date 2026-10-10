'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator,
  X,
  CheckCircle2,
  Receipt,
  Building2,
  UserCheck,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

interface TaxCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConsultation: (summaryNote: string) => void;
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(amount)));
}

export default function TaxCalculatorModal({
  isOpen,
  onClose,
  onSelectConsultation,
}: TaxCalculatorModalProps) {
  const [activeTab, setActiveTab] = useState<'income' | 'gst' | 'business'>('income');

  // --- TAB 1: INCOME TAX (OLD VS NEW REGIME) STATE ---
  const [isSalaried, setIsSalaried] = useState(true);
  const [grossIncome, setGrossIncome] = useState<number>(1500000); // ₹15,00,000 default
  const [deductions80C, setDeductions80C] = useState<number>(150000); // 80C max 1.5L
  const [deductions80DAndOther, setDeductions80DAndOther] = useState<number>(75000); // 80D + NPS + HRA/Home Loan

  // --- TAB 2: GST CALCULATOR STATE ---
  const [gstAmountInput, setGstAmountInput] = useState<number>(100000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstMode, setGstMode] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [gstSupplyType, setGstSupplyType] = useState<'intra' | 'inter'>('intra');

  // --- TAB 3: BUSINESS / CORPORATE TAX STATE ---
  const [bizType, setBizType] = useState<'44ada' | '44ad' | 'llp' | 'pvt'>('44ada');
  const [bizTurnover, setBizTurnover] = useState<number>(4000000); // ₹40 Lakhs
  const [bizProfitMargin, setBizProfitMargin] = useState<number>(25); // 25% for LLP/Pvt

  // --- INCOME TAX CALCULATION LOGIC ---
  const incomeTaxResult = useMemo(() => {
    // 1. NEW TAX REGIME (Latest Slabs: 0-4L: 0%, 4-8L: 5%, 8-12L: 10%, 12-16L: 15%, 16-20L: 20%, 20-24L: 25%, >24L: 30%)
    // Standard deduction ₹75,000 for salaried; Rebate u/s 87A up to ₹12,00,000 taxable income
    const stdDedNew = isSalaried ? 75000 : 0;
    const taxableNew = Math.max(0, grossIncome - stdDedNew);

    let rawTaxNew = 0;
    if (taxableNew > 400000) {
      const slabs = [
        { limit: 400000, rate: 0 },
        { limit: 800000, rate: 0.05 },
        { limit: 1200000, rate: 0.1 },
        { limit: 1600000, rate: 0.15 },
        { limit: 2000000, rate: 0.2 },
        { limit: 2400000, rate: 0.25 },
        { limit: Infinity, rate: 0.3 },
      ];
      let prev = 0;
      for (const s of slabs) {
        if (taxableNew > prev) {
          const taxableInSlab = Math.min(taxableNew, s.limit) - prev;
          rawTaxNew += taxableInSlab * s.rate;
          prev = s.limit;
        }
      }
    }

    // Section 87A Rebate in New Regime (up to ₹12,00,000 taxable income -> 0 tax, with marginal relief)
    if (taxableNew <= 1200000) {
      rawTaxNew = 0;
    } else if (taxableNew > 1200000 && rawTaxNew > taxableNew - 1200000) {
      // Marginal relief above ₹12L
      rawTaxNew = taxableNew - 1200000;
    }

    const cessNew = rawTaxNew * 0.04;
    const totalTaxNew = Math.round(rawTaxNew + cessNew);

    // 2. OLD TAX REGIME (0-2.5L: 0%, 2.5-5L: 5%, 5-10L: 20%, >10L: 30%)
    // Standard deduction ₹50,000 for salaried + 80C (capped at 1.5L) + other deductions
    const stdDedOld = isSalaried ? 50000 : 0;
    const capped80C = Math.min(150000, Math.max(0, deductions80C));
    const totalDedOld = stdDedOld + capped80C + Math.max(0, deductions80DAndOther);
    const taxableOld = Math.max(0, grossIncome - totalDedOld);

    let rawTaxOld = 0;
    if (taxableOld > 250000) {
      if (taxableOld <= 500000) {
        rawTaxOld = (taxableOld - 250000) * 0.05;
      } else if (taxableOld <= 1000000) {
        rawTaxOld = 12500 + (taxableOld - 500000) * 0.2;
      } else {
        rawTaxOld = 112500 + (taxableOld - 1000000) * 0.3;
      }
    }

    // Section 87A Rebate in Old Regime (up to ₹5,00,000 taxable income)
    if (taxableOld <= 500000) {
      rawTaxOld = 0;
    }

    const cessOld = rawTaxOld * 0.04;
    const totalTaxOld = Math.round(rawTaxOld + cessOld);

    const betterRegime = totalTaxNew <= totalTaxOld ? 'New Tax Regime' : 'Old Tax Regime';
    const taxSaved = Math.abs(totalTaxOld - totalTaxNew);

    return {
      stdDedNew,
      taxableNew,
      rawTaxNew: Math.round(rawTaxNew),
      cessNew: Math.round(cessNew),
      totalTaxNew,
      totalDedOld,
      taxableOld,
      rawTaxOld: Math.round(rawTaxOld),
      cessOld: Math.round(cessOld),
      totalTaxOld,
      betterRegime,
      taxSaved,
    };
  }, [isSalaried, grossIncome, deductions80C, deductions80DAndOther]);

  // --- GST CALCULATION LOGIC ---
  const gstResult = useMemo(() => {
    const validAmount = Math.max(0, gstAmountInput);
    let baseAmount = 0;
    let gstTax = 0;
    let totalInvoice = 0;

    if (gstMode === 'exclusive') {
      baseAmount = validAmount;
      gstTax = validAmount * (gstRate / 100);
      totalInvoice = baseAmount + gstTax;
    } else {
      totalInvoice = validAmount;
      baseAmount = validAmount / (1 + gstRate / 100);
      gstTax = totalInvoice - baseAmount;
    }

    return {
      baseAmount,
      gstTax,
      halfTax: gstTax / 2,
      totalInvoice,
    };
  }, [gstAmountInput, gstRate, gstMode]);

  // --- BUSINESS / CORPORATE TAX CALCULATION LOGIC ---
  const bizResult = useMemo(() => {
    const turnover = Math.max(0, bizTurnover);
    let taxableProfit = 0;
    let baseTax = 0;
    let cess = 0;
    let schemeNote = '';

    if (bizType === '44ada') {
      taxableProfit = turnover * 0.5;
      schemeNote = 'Sec 44ADA Presumptive (50% Deemed Profit up to ₹75L receipts)';
      if (taxableProfit > 1200000) {
        const slabs = [
          { limit: 400000, rate: 0 },
          { limit: 800000, rate: 0.05 },
          { limit: 1200000, rate: 0.1 },
          { limit: 1600000, rate: 0.15 },
          { limit: 2000000, rate: 0.2 },
          { limit: 2400000, rate: 0.25 },
          { limit: Infinity, rate: 0.3 },
        ];
        let prev = 0;
        for (const s of slabs) {
          if (taxableProfit > prev) {
            baseTax += (Math.min(taxableProfit, s.limit) - prev) * s.rate;
            prev = s.limit;
          }
        }
      }
      cess = baseTax * 0.04;
    } else if (bizType === '44ad') {
      taxableProfit = turnover * 0.06;
      schemeNote = 'Sec 44AD Presumptive (6% Digital Turnover Deemed Profit)';
      if (taxableProfit > 1200000) {
        const slabs = [
          { limit: 400000, rate: 0 },
          { limit: 800000, rate: 0.05 },
          { limit: 1200000, rate: 0.1 },
          { limit: 1600000, rate: 0.15 },
          { limit: 2000000, rate: 0.2 },
          { limit: 2400000, rate: 0.25 },
          { limit: Infinity, rate: 0.3 },
        ];
        let prev = 0;
        for (const s of slabs) {
          if (taxableProfit > prev) {
            baseTax += (Math.min(taxableProfit, s.limit) - prev) * s.rate;
            prev = s.limit;
          }
        }
      }
      cess = baseTax * 0.04;
    } else if (bizType === 'llp') {
      taxableProfit = turnover * (bizProfitMargin / 100);
      baseTax = taxableProfit * 0.3;
      cess = baseTax * 0.04;
      schemeNote = `LLP / Partnership Flat 30% + 4% Cess (at ${bizProfitMargin}% Net Margin)`;
    } else {
      taxableProfit = turnover * (bizProfitMargin / 100);
      baseTax = taxableProfit * 0.242; // 22% + 10% surcharge
      cess = baseTax * 0.04;
      schemeNote = `Pvt Ltd Corporate Tax Sec 115BAA (25.17% Effective Rate at ${bizProfitMargin}% Margin)`;
    }

    const totalTax = Math.round(baseTax + cess);
    const effectiveRate =
      turnover > 0 ? ((totalTax / turnover) * 100).toFixed(2) : '0.00';

    return {
      taxableProfit: Math.round(taxableProfit),
      baseTax: Math.round(baseTax),
      cess: Math.round(cess),
      totalTax,
      effectiveRate,
      schemeNote,
    };
  }, [bizType, bizTurnover, bizProfitMargin]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 bg-[#2D1B4E]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tax-calc-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="bg-white rounded-[28px] max-w-2xl w-full p-5 sm:p-7 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close tax calculator"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-[#F4EEFF] text-[#2D1B4E] flex items-center justify-center cursor-pointer border-0 hover:bg-[#FFE9DE] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="pr-10 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-[#F4EEFF] text-[#2D1B4E] font-bold text-xs px-3 py-1 rounded-full mb-2">
                <Calculator className="w-3.5 h-3.5 text-[#FF6A3D]" />
                All-in-One CA Tax &amp; GST Calculator
              </span>
              <h2 id="tax-calc-modal-title" className="text-2xl sm:text-3xl">
                Calculate Income Tax, GST &amp; Business Tax
              </h2>
            </div>

            {/* 3-Tab Mode Selector */}
            <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-[#F4EEFF] rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('income')}
                className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer border-0 transition-all whitespace-nowrap ${
                  activeTab === 'income'
                    ? 'bg-[#2D1B4E] text-white shadow-xs'
                    : 'bg-transparent text-[#2D1B4E] hover:bg-white/60'
                }`}
              >
                <UserCheck className="w-4 h-4 shrink-0" />
                <span>Income Tax</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('gst')}
                className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer border-0 transition-all whitespace-nowrap ${
                  activeTab === 'gst'
                    ? 'bg-[#2D1B4E] text-white shadow-xs'
                    : 'bg-transparent text-[#2D1B4E] hover:bg-white/60'
                }`}
              >
                <Receipt className="w-4 h-4 shrink-0" />
                <span>GST Calculator</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('business')}
                className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer border-0 transition-all whitespace-nowrap ${
                  activeTab === 'business'
                    ? 'bg-[#2D1B4E] text-white shadow-xs'
                    : 'bg-transparent text-[#2D1B4E] hover:bg-white/60'
                }`}
              >
                <Building2 className="w-4 h-4 shrink-0" />
                <span>Business / Corp</span>
              </button>
            </div>

            {/* =====================================================
                TAB 1: INCOME TAX (OLD VS NEW REGIME)
                ===================================================== */}
            {activeTab === 'income' && (
              <div className="space-y-5">
                {/* Salaried vs Non-Salaried Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-[#F4EEFF]/60 p-3 rounded-2xl">
                  <span className="text-sm font-bold text-[#2D1B4E]">Income Source:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSalaried(true)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer border-0 ${
                        isSalaried
                          ? 'bg-[#FF6A3D] text-white'
                          : 'bg-white text-[#2D1B4E]'
                      }`}
                    >
                      Salaried (₹75k Std Deduction)
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSalaried(false)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer border-0 ${
                        !isSalaried
                          ? 'bg-[#FF6A3D] text-white'
                          : 'bg-white text-[#2D1B4E]'
                      }`}
                    >
                      Other / Self-Employed
                    </button>
                  </div>
                </div>

                {/* Gross Annual Income Input + Quick Presets */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="calc-gross-income" className="text-sm font-bold text-[#2D1B4E]">
                      Annual Gross Income (₹)
                    </label>
                    <span className="text-base font-extrabold text-[#FF6A3D] tabular-nums">
                      {formatINR(grossIncome)}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center mb-2">
                    <input
                      id="calc-gross-income"
                      type="number"
                      min={0}
                      max={100000000}
                      step={50000}
                      value={grossIncome}
                      onChange={(e) => setGrossIncome(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#E3DAF3] focus:border-[#2D1B4E] focus:outline-none text-base font-bold text-[#2D1B4E] tabular-nums"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: '₹8L', val: 800000 },
                      { label: '₹12L', val: 1200000 },
                      { label: '₹15L', val: 1500000 },
                      { label: '₹20L', val: 2000000 },
                      { label: '₹25L', val: 2500000 },
                      { label: '₹35L', val: 3500000 },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setGrossIncome(preset.val)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer border transition-colors ${
                          grossIncome === preset.val
                            ? 'bg-[#2D1B4E] text-white border-[#2D1B4E]'
                            : 'bg-[#F4EEFF] text-[#2D1B4E] border-transparent hover:bg-[#FFE9DE]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Deductions for Old Regime comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="calc-80c" className="block text-xs font-bold text-[#2D1B4E] mb-1">
                      Sec 80C Investments (Max ₹1.5L)
                    </label>
                    <input
                      id="calc-80c"
                      type="number"
                      min={0}
                      max={150000}
                      step={10000}
                      value={deductions80C}
                      onChange={(e) => setDeductions80C(Math.min(150000, Number(e.target.value) || 0))}
                      className="w-full px-3 py-2 rounded-xl border-2 border-[#E3DAF3] focus:border-[#2D1B4E] focus:outline-none text-sm font-bold text-[#2D1B4E] tabular-nums"
                    />
                  </div>
                  <div>
                    <label htmlFor="calc-80d" className="block text-xs font-bold text-[#2D1B4E] mb-1">
                      HRA, 80D, NPS &amp; Home Loan (₹)
                    </label>
                    <input
                      id="calc-80d"
                      type="number"
                      min={0}
                      max={5000000}
                      step={10000}
                      value={deductions80DAndOther}
                      onChange={(e) => setDeductions80DAndOther(Number(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl border-2 border-[#E3DAF3] focus:border-[#2D1B4E] focus:outline-none text-sm font-bold text-[#2D1B4E] tabular-nums"
                    />
                  </div>
                </div>

                {/* Side-by-Side Comparison Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* New Regime Card */}
                  <div
                    className={`rounded-2xl p-4 border-2 ${
                      incomeTaxResult.betterRegime === 'New Tax Regime'
                        ? 'bg-[#2D1B4E] text-white border-[#2D1B4E]'
                        : 'bg-[#F4EEFF] text-[#2D1B4E] border-[#E3DAF3]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold uppercase tracking-wider opacity-85">
                        New Tax Regime
                      </span>
                      {incomeTaxResult.betterRegime === 'New Tax Regime' && (
                        <span className="text-[11px] font-bold bg-[#FF6A3D] text-white px-2.5 py-0.5 rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div
                      className="text-3xl font-extrabold tabular-nums my-1"
                      style={{
                        fontFamily: 'var(--display)',
                        color:
                          incomeTaxResult.betterRegime === 'New Tax Regime'
                            ? '#FFB38A'
                            : 'var(--grape)',
                      }}
                    >
                      {formatINR(incomeTaxResult.totalTaxNew)}
                    </div>
                    <div className="text-xs opacity-85 space-y-1 mt-2 pt-2 border-t border-current/15 tabular-nums">
                      <div className="flex justify-between">
                        <span>Std Deduction:</span>
                        <b>{formatINR(incomeTaxResult.stdDedNew)}</b>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxable Income:</span>
                        <b>{formatINR(incomeTaxResult.taxableNew)}</b>
                      </div>
                      <div className="flex justify-between">
                        <span>Base Tax + 4% Cess:</span>
                        <b>
                          {formatINR(incomeTaxResult.rawTaxNew)} + {formatINR(incomeTaxResult.cessNew)}
                        </b>
                      </div>
                    </div>
                  </div>

                  {/* Old Regime Card */}
                  <div
                    className={`rounded-2xl p-4 border-2 ${
                      incomeTaxResult.betterRegime === 'Old Tax Regime'
                        ? 'bg-[#2D1B4E] text-white border-[#2D1B4E]'
                        : 'bg-[#F4EEFF] text-[#2D1B4E] border-[#E3DAF3]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold uppercase tracking-wider opacity-85">
                        Old Tax Regime
                      </span>
                      {incomeTaxResult.betterRegime === 'Old Tax Regime' && (
                        <span className="text-[11px] font-bold bg-[#FF6A3D] text-white px-2.5 py-0.5 rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div
                      className="text-3xl font-extrabold tabular-nums my-1"
                      style={{
                        fontFamily: 'var(--display)',
                        color:
                          incomeTaxResult.betterRegime === 'Old Tax Regime'
                            ? '#FFB38A'
                            : 'var(--grape)',
                      }}
                    >
                      {formatINR(incomeTaxResult.totalTaxOld)}
                    </div>
                    <div className="text-xs opacity-85 space-y-1 mt-2 pt-2 border-t border-current/15 tabular-nums">
                      <div className="flex justify-between">
                        <span>Total Deductions:</span>
                        <b>{formatINR(incomeTaxResult.totalDedOld)}</b>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxable Income:</span>
                        <b>{formatINR(incomeTaxResult.taxableOld)}</b>
                      </div>
                      <div className="flex justify-between">
                        <span>Base Tax + 4% Cess:</span>
                        <b>
                          {formatINR(incomeTaxResult.rawTaxOld)} + {formatINR(incomeTaxResult.cessOld)}
                        </b>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Savings Verdict Banner */}
                <div className="bg-[#FFE9DE] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#FF6A3D] shrink-0" />
                    <span className="text-sm font-bold text-[#2D1B4E]">
                      {incomeTaxResult.taxSaved > 0 ? (
                        <>
                          You save <b className="text-[#FF6A3D]">{formatINR(incomeTaxResult.taxSaved)}</b>{' '}
                          annually under the <b>{incomeTaxResult.betterRegime}</b>!
                        </>
                      ) : (
                        <>Both regimes result in the same tax liability ({formatINR(incomeTaxResult.totalTaxNew)}).</>
                      )}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectConsultation(
                        `ITR Filing (${incomeTaxResult.betterRegime} · Income ${formatINR(grossIncome)} · Tax ${formatINR(
                          Math.min(incomeTaxResult.totalTaxNew, incomeTaxResult.totalTaxOld)
                        )})`
                      );
                    }}
                    className="btn btn-tang py-2.5 px-5 text-sm"
                  >
                    File ITR with CA <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* =====================================================
                TAB 2: GST CALCULATOR (EXCLUSIVE & INCLUSIVE)
                ===================================================== */}
            {activeTab === 'gst' && (
              <div className="space-y-5">
                {/* Exclusive vs Inclusive & Intra vs Inter State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#F4EEFF] p-3 rounded-2xl">
                    <span className="block text-xs font-bold text-[#2D1B4E] mb-2">GST Calculation Type</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setGstMode('exclusive')}
                        className={`py-2 px-2 rounded-xl text-xs font-bold cursor-pointer border-0 ${
                          gstMode === 'exclusive'
                            ? 'bg-[#2D1B4E] text-white'
                            : 'bg-white text-[#2D1B4E]'
                        }`}
                      >
                        + Add GST (Excl.)
                      </button>
                      <button
                        type="button"
                        onClick={() => setGstMode('inclusive')}
                        className={`py-2 px-2 rounded-xl text-xs font-bold cursor-pointer border-0 ${
                          gstMode === 'inclusive'
                            ? 'bg-[#2D1B4E] text-white'
                            : 'bg-white text-[#2D1B4E]'
                        }`}
                      >
                        − Remove GST (Incl.)
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#F4EEFF] p-3 rounded-2xl">
                    <span className="block text-xs font-bold text-[#2D1B4E] mb-2">Place of Supply</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setGstSupplyType('intra')}
                        className={`py-2 px-2 rounded-xl text-xs font-bold cursor-pointer border-0 ${
                          gstSupplyType === 'intra'
                            ? 'bg-[#FF6A3D] text-white'
                            : 'bg-white text-[#2D1B4E]'
                        }`}
                      >
                        Intra-State (CGST+SGST)
                      </button>
                      <button
                        type="button"
                        onClick={() => setGstSupplyType('inter')}
                        className={`py-2 px-2 rounded-xl text-xs font-bold cursor-pointer border-0 ${
                          gstSupplyType === 'inter'
                            ? 'bg-[#FF6A3D] text-white'
                            : 'bg-white text-[#2D1B4E]'
                        }`}
                      >
                        Inter-State (IGST)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <label htmlFor="gst-amount-input" className="block text-sm font-bold text-[#2D1B4E] mb-1.5">
                    {gstMode === 'exclusive'
                      ? 'Net Invoice Amount (Before GST) (₹)'
                      : 'Gross Invoice Amount (Including GST) (₹)'}
                  </label>
                  <input
                    id="gst-amount-input"
                    type="number"
                    min={0}
                    step={1000}
                    value={gstAmountInput}
                    onChange={(e) => setGstAmountInput(Number(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-[#E3DAF3] focus:border-[#2D1B4E] focus:outline-none text-lg font-extrabold text-[#2D1B4E] tabular-nums"
                  />
                </div>

                {/* GST Slab Rate Selector */}
                <div>
                  <span className="block text-sm font-bold text-[#2D1B4E] mb-2">Select GST Slab Rate</span>
                  <div className="grid grid-cols-5 gap-2">
                    {[3, 5, 12, 18, 28].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setGstRate(rate)}
                        className={`py-2.5 rounded-xl text-sm font-extrabold cursor-pointer border-2 transition-colors ${
                          gstRate === rate
                            ? 'bg-[#2D1B4E] text-white border-[#2D1B4E]'
                            : 'bg-white text-[#2D1B4E] border-[#E3DAF3] hover:bg-[#FFE9DE]'
                        }`}
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* GST Output Breakdown Card */}
                <div className="bg-[#2D1B4E] text-white rounded-2xl p-5 space-y-3 tabular-nums">
                  <div className="grid grid-cols-3 gap-3 pb-3 border-b border-white/15">
                    <div>
                      <div className="text-xs text-[#e5dcf7]">Net Base Amount</div>
                      <div className="text-xl font-extrabold text-white mt-0.5">
                        {formatINR(gstResult.baseAmount)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#e5dcf7]">Total GST ({gstRate}%)</div>
                      <div className="text-xl font-extrabold text-[#FFB38A] mt-0.5">
                        {formatINR(gstResult.gstTax)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#e5dcf7]">Total Invoice Value</div>
                      <div className="text-xl font-extrabold text-[#FF6A3D] mt-0.5">
                        {formatINR(gstResult.totalInvoice)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-xs text-[#e5dcf7] gap-2">
                    {gstSupplyType === 'intra' ? (
                      <>
                        <span>
                          CGST ({gstRate / 2}%): <b className="text-white">{formatINR(gstResult.halfTax)}</b>
                        </span>
                        <span>+</span>
                        <span>
                          SGST ({gstRate / 2}%): <b className="text-white">{formatINR(gstResult.halfTax)}</b>
                        </span>
                      </>
                    ) : (
                      <span>
                        IGST ({gstRate}% Inter-State): <b className="text-white">{formatINR(gstResult.gstTax)}</b>
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectConsultation(
                          `GST Filing & ITC Inquiry (Invoice ${formatINR(gstResult.totalInvoice)} @ ${gstRate}% GST)`
                        );
                      }}
                      className="text-[#FFB38A] font-extrabold underline cursor-pointer bg-transparent border-0 p-0"
                    >
                      Consult CA for GST Filing →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* =====================================================
                TAB 3: BUSINESS / CORPORATE TAX (44ADA / 44AD / LLP / PVT LTD)
                ===================================================== */}
            {activeTab === 'business' && (
              <div className="space-y-5">
                <div>
                  <span className="block text-sm font-bold text-[#2D1B4E] mb-2">
                    Select Business Tax Scheme / Entity
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: '44ada', label: 'Sec 44ADA (Pro)' },
                      { id: '44ad', label: 'Sec 44AD (MSME)' },
                      { id: 'llp', label: 'LLP / Firm (30%)' },
                      { id: 'pvt', label: 'Pvt Ltd (115BAA)' },
                    ].map((scheme) => (
                      <button
                        key={scheme.id}
                        type="button"
                        onClick={() => setBizType(scheme.id as '44ada' | '44ad' | 'llp' | 'pvt')}
                        className={`py-2.5 px-2.5 rounded-xl text-xs font-bold cursor-pointer border-2 transition-colors ${
                          bizType === scheme.id
                            ? 'bg-[#2D1B4E] text-white border-[#2D1B4E]'
                            : 'bg-white text-[#2D1B4E] border-[#E3DAF3] hover:bg-[#FFE9DE]'
                        }`}
                      >
                        {scheme.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="biz-turnover" className="block text-xs font-bold text-[#2D1B4E] mb-1">
                      Annual Turnover / Gross Receipts (₹)
                    </label>
                    <input
                      id="biz-turnover"
                      type="number"
                      min={0}
                      step={100000}
                      value={bizTurnover}
                      onChange={(e) => setBizTurnover(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#E3DAF3] focus:border-[#2D1B4E] focus:outline-none text-base font-bold text-[#2D1B4E] tabular-nums"
                    />
                  </div>

                  {(bizType === 'llp' || bizType === 'pvt') && (
                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#2D1B4E] mb-1">
                        <label htmlFor="biz-margin">Net Profit Margin (%)</label>
                        <span className="text-[#FF6A3D]">{bizProfitMargin}%</span>
                      </div>
                      <input
                        id="biz-margin"
                        type="range"
                        min={5}
                        max={60}
                        step={1}
                        value={bizProfitMargin}
                        onChange={(e) => setBizProfitMargin(Number(e.target.value))}
                        className="w-full accent-[#FF6A3D] cursor-pointer mt-2"
                      />
                    </div>
                  )}
                </div>

                {/* Business Tax Result Card */}
                <div className="bg-[#F4EEFF] rounded-2xl p-5 space-y-3 tabular-nums">
                  <div className="text-xs font-bold text-[#6A5F82]">{bizResult.schemeNote}</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
                    <div>
                      <div className="text-xs text-[#6A5F82]">Taxable Net Profit</div>
                      <div className="text-xl font-extrabold text-[#2D1B4E] mt-0.5">
                        {formatINR(bizResult.taxableProfit)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#6A5F82]">Total Tax + 4% Cess</div>
                      <div className="text-2xl font-extrabold text-[#FF6A3D] mt-0.5">
                        {formatINR(bizResult.totalTax)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#6A5F82]">Effective Rate on Turnover</div>
                      <div className="text-xl font-extrabold text-[#2D1B4E] mt-0.5">
                        {bizResult.effectiveRate}%
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectConsultation(
                      `Business Tax & Audit (${bizResult.schemeNote} · Turnover ${formatINR(
                        bizTurnover
                      )} · Est. Tax ${formatINR(bizResult.totalTax)})`
                    );
                  }}
                  className="btn btn-tang w-full justify-center"
                >
                  Book CA Consultation for Business Tax Planning <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Reset & Disclaimer Footer */}
            <div className="mt-5 pt-3 border-t border-[#E3DAF3] flex flex-wrap items-center justify-between gap-2 text-xs text-[#6A5F82]">
              <span>
                * Illustrative computation for planning purposes. Final tax liability is verified by a
                Chartered Accountant prior to filing.
              </span>
              <button
                type="button"
                onClick={() => {
                  setGrossIncome(1500000);
                  setDeductions80C(150000);
                  setDeductions80DAndOther(75000);
                  setGstAmountInput(100000);
                  setGstRate(18);
                  setBizTurnover(4000000);
                }}
                className="inline-flex items-center gap-1 font-bold text-[#2D1B4E] hover:text-[#FF6A3D] bg-transparent border-0 cursor-pointer p-0 shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset values
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
