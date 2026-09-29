import { NextResponse } from 'next/server';

/**
 * Contact form API route.
 * Placeholder — will integrate with email service (Resend, SendGrid, etc.)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 },
      );
    }

    // TODO: Send email via Resend/SendGrid
    // await sendEmail({ to: 'han@example.com', from: email, subject: `Portfolio inquiry from ${name}`, text: message });

    console.log('[Contact API] New inquiry:', { name, email, message: message.slice(0, 100) });

    return NextResponse.json({ success: true, message: 'Message received.' });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process request.' },
      { status: 500 },
    );
  }
}
