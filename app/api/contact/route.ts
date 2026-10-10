import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limit store per IP for spam protection
const recentSubmissions = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      handle,
      goal,
      note,
      website_url, // Honeypot field — must be empty
      formRenderedAt, // Timestamp check — blocks instant bot submissions
    } = body;

    // 1. Honeypot check: If a bot filled the hidden website_url field, silently reject
    if (website_url && String(website_url).trim().length > 0) {
      return NextResponse.json(
        { ok: false, error: 'Spam submission blocked by honeypot filter.' },
        { status: 400 }
      );
    }

    // 2. Submission speed check: Humans take at least 1.5 seconds to fill out the form
    const now = Date.now();
    if (typeof formRenderedAt === 'number' && now - formRenderedAt < 1500) {
      return NextResponse.json(
        { ok: false, error: 'Submission was too fast. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    // 3. Rate limiting check per IP (cooldown of 15 seconds between submissions)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local-client';
    const lastTime = recentSubmissions.get(ip);
    if (lastTime && now - lastTime < 15000) {
      return NextResponse.json(
        {
          ok: false,
          error: 'You recently submitted an inquiry. Please wait 15 seconds before sending another.',
        },
        { status: 429 }
      );
    }

    // 4. Required field & format validation
    const cleanName = String(name || '').trim();
    const cleanEmail = String(email || '').trim();
    const cleanHandle = String(handle || '').trim();
    const cleanGoal = String(goal || '').trim();
    const cleanNote = String(note || '').trim();

    if (!cleanName || cleanName.length < 2 || cleanName.length > 120) {
      return NextResponse.json(
        { ok: false, error: 'Please provide your full name (2–120 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail) || cleanEmail.length > 160) {
      return NextResponse.json(
        { ok: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    recentSubmissions.set(ip, now);

    // Generate a clean inquiry reference number
    const referenceId = `CA-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    // Note: Email delivery requires configuring an SMTP / transactional email provider in production.
    const emailConfigured =
      Boolean(process.env.CONTACT_RECEIVER_EMAIL) &&
      process.env.CONTACT_RECEIVER_EMAIL !== 'your-ca-firm@example.com';

    return NextResponse.json({
      ok: true,
      referenceId,
      receivedAt: new Date().toISOString(),
      emailDeliveryMode: emailConfigured ? 'configured' : 'placeholder_pending_smtp_setup',
      summary: {
        name: cleanName,
        email: cleanEmail,
        entity: cleanHandle || 'Not specified',
        service: cleanGoal,
        note: cleanNote,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Unable to process request. Please check your inputs and try again.' },
      { status: 400 }
    );
  }
}
