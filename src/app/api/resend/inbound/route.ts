import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FORWARD_TO = process.env.CONTACT_EMAIL_TO || 'forniturammc@gmail.com';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Resend webhook event-lərini loqla
    console.log('RESEND_INBOUND_WEBHOOK_RECEIVED:', JSON.stringify(payload, null, 2));

    // Webhook event tipini yoxla
    if (payload.type !== 'email.received') {
      return NextResponse.json({ success: true, message: 'Ignored non-email event' });
    }

    const emailData = payload.data;
    const { from, to, subject, text, html, created_at } = emailData;

    // Email-i yönləndir
    const { data, error } = await resend.emails.send({
      from: 'Fornitura <info@fornitura.az>',
      to: FORWARD_TO,
      subject: `Yeni email: ${subject || '(Mövzu yoxdur)'}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #000; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">Yeni Daxil Olan Email</h2>
          <p><strong>Göndərən:</strong> ${from}</p>
          <p><strong>Alan:</strong> ${Array.isArray(to) ? to.join(', ') : to}</p>
          <p><strong>Mövzu:</strong> ${subject}</p>
          <p><strong>Tarix:</strong> ${new Date(created_at).toLocaleString('az-AZ')}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            <strong>Mesaj mətni:</strong><br />
            ${html || `<pre style="white-space: pre-wrap;">${text}</pre>`}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('RESEND_FORWARDING_ERROR:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error: any) {
    console.error('RESEND_INBOUND_GENERAL_ERROR:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
