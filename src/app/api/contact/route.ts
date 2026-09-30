import { NextResponse } from 'next/server';
import type { ContactBrief } from '@/types/content';

/**
 * Contact Brief API Route.
 * Validates qualified project briefs with anti-bot honeypot protection.
 */
export async function POST(request: Request) {
  try {
    const body: ContactBrief = await request.json();
    const { name, email, services, description, timeline, budget, honeypot } = body;

    // 1. Honeypot check: If hidden field is filled, silently discard (bot detected)
    if (honeypot && honeypot.trim().length > 0) {
      console.warn('[Contact API] Bot honeypot triggered:', { email, name });
      return NextResponse.json({ success: true, message: 'Brief received.' });
    }

    // 2. Validate required identity
    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: 'Name and a valid email address are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email format.' },
        { status: 400 }
      );
    }

    // 3. Validate scope
    if (!description || description.trim().length < 20) {
      return NextResponse.json(
        { error: 'Please provide at least 20 characters describing your project ambition.' },
        { status: 400 }
      );
    }

    // 4. Log or deliver inquiry
    console.log('[Contact API] Qualified Project Brief Received:', {
      name,
      email,
      company: body.company || 'N/A',
      services: services || [],
      timeline: timeline || 'unspecified',
      budget: budget || 'unspecified',
      charCount: description.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Project brief verified and queued for direct scoping review.',
    });
  } catch (err: unknown) {
    console.error('[Contact API] Internal error processing brief:', err);
    return NextResponse.json(
      { error: 'Failed to process project brief. Please email contact@hanm.dev directly.' },
      { status: 500 }
    );
  }
}
