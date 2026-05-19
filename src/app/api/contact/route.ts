import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation/schemas';
import { checkRateLimit, getClientIp, sanitizeInput } from '@/lib/security';
import { createAdminClient } from '@/lib/supabase/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(`contact:${ip}`, 5, 60000);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate
    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Sanitize
    const sanitized = {
      name: sanitizeInput(parsed.data.name),
      email: sanitizeInput(parsed.data.email),
      phone: sanitizeInput(parsed.data.phone),
      subject: sanitizeInput(parsed.data.subject),
      message: sanitizeInput(parsed.data.message),
    };

    // Insert to database
    const supabase = createAdminClient();
    const { error } = await supabase.from('messages').insert(sanitized);

    if (error) throw error;

    // Send email notification via Resend
    try {
      await resend.emails.send({
        from: 'Fornitura Contact <onboarding@resend.dev>',
        to: 'forniturammc@gmail.com',
        subject: `Yeni müraciət: ${sanitized.subject}`,
        html: `
          <h3>Yeni əlaqə müraciəti</h3>
          <p><strong>Ad:</strong> ${sanitized.name}</p>
          <p><strong>E-poçt:</strong> ${sanitized.email}</p>
          <p><strong>Telefon:</strong> ${sanitized.phone}</p>
          <p><strong>Mövzu:</strong> ${sanitized.subject}</p>
          <p><strong>Mesaj:</strong></p>
          <p>${sanitized.message}</p>
        `,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // We don't throw here to ensure the user gets a success response since DB insert succeeded
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
