import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FORWARD_TO = process.env.CONTACT_EMAIL_TO || 'forniturammc@gmail.com';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Resend webhook event-lərini loqla
    console.log('RESEND_WEBHOOK_RECEIVED:', JSON.stringify(payload, null, 2));

    const eventType = payload?.type;
    console.log('RESEND_EMAIL_EVENT_TYPE:', eventType);

    // Webhook event tipini yoxla
    if (eventType !== 'email.received') {
      return NextResponse.json({ success: true, ignored: true });
    }

    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is missing');
    }

    const emailData = payload.data;
    const fromAddress = emailData?.from || 'Naməlum';
    const toAddress = Array.isArray(emailData?.to) ? emailData.to.join(', ') : (emailData?.to || 'info@fornitura.az');
    const originalSubject = emailData?.subject || '(Mövzu yoxdur)';
    const createdAt = emailData?.created_at || new Date().toISOString();
    const contentHtml = emailData?.html || (emailData?.text ? `<pre style="white-space: pre-wrap;">${emailData.text}</pre>` : '<p>Mesaj mətni tapılmadı.</p>');

    const forwardFrom = 'Fornitura <info@fornitura.az>';
    console.log('RESEND_FORWARD_FROM_ATTEMPT_1:', forwardFrom);

    // Email-i yönləndir
    let result = await resend.emails.send({
      from: forwardFrom,
      to: FORWARD_TO,
      replyTo: fromAddress,
      subject: `Yeni email: ${originalSubject}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #000; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">Yeni Daxil Olan Email</h2>
          <p><strong>Göndərən:</strong> ${fromAddress}</p>
          <p><strong>Alan:</strong> ${toAddress}</p>
          <p><strong>Mövzu:</strong> ${originalSubject}</p>
          <p><strong>Tarix:</strong> ${new Date(createdAt).toLocaleString('az-AZ')}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            <strong>Mesaj:</strong><br />
            ${contentHtml}
          </div>
          <p style="font-size: 12px; color: #888; margin-top: 20px;">
            Qeyd: Cavab yazmaq üçün birbaşa bu emaili cavablandıra bilərsiniz (Reply-To aktivdir).
          </p>
        </div>
      `,
    });

    // Əgər 403 xətası (domain icazəsi) olarsa, fallback olaraq onboarding ünvanını yoxla
    if (result.error && (result.error as any).statusCode === 403) {
      console.warn('RESEND_FORWARDING_403_DETECTED, trying fallback address...');
      const fallbackFrom = 'Fornitura <onboarding@resend.dev>';
      console.log('RESEND_FORWARD_FROM_ATTEMPT_2:', fallbackFrom);
      
      result = await resend.emails.send({
        from: fallbackFrom,
        to: FORWARD_TO,
        replyTo: fromAddress,
        subject: `Yeni email: ${originalSubject}`,
        html: `<p><strong>Domen hələ təsdiqlənməyib.</strong></p>` + contentHtml, // Sadələşdirilmiş mesaj
      });
    }

    console.log('RESEND_FORWARD_RESULT:', result);

    if (result.error) {
      console.error('RESEND_FORWARDING_ERROR_FULL:', {
        statusCode: (result.error as any)?.statusCode,
        name: result.error.name,
        message: result.error.message,
        from: forwardFrom,
        to: FORWARD_TO,
      });
      return NextResponse.json({ success: false, error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('RESEND_INBOUND_GENERAL_ERROR:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
