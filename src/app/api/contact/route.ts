import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation/schemas';
import { checkRateLimit, getClientIp, sanitizeInput } from '@/lib/security';
import { createAdminClient } from '@/lib/supabase/server';

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
