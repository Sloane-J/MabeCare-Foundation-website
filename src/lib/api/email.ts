import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export async function sendInkindConfirmation(data: {
  donor_name: string
  donor_email: string
  item_description: string
  received_at: string
}) {
  const date = new Date(data.received_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  await resend.emails.send({
    from: 'MabEcare Foundation <onboarding@resend.dev>',
    to: data.donor_email,
    subject: 'Your donation to MabEcare Foundation has arrived',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #1a1a1a;">Thank you, ${data.donor_name}!</h2>
        <p style="color: #444; line-height: 1.6;">
          We are delighted to let you know that your donation has safely arrived at MabEcare Foundation.
        </p>
        <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 24px 0;">
          <p style="margin: 0; color: #1a1a1a;"><strong>Items donated:</strong></p>
          <p style="margin: 8px 0 0; color: #444;">${data.item_description}</p>
          <p style="margin: 12px 0 0; color: #1a1a1a;"><strong>Date received:</strong> ${date}</p>
        </div>
        <p style="color: #444; line-height: 1.6;">
          Your generosity makes a real difference to the communities we serve.
          We are truly grateful for your support.
        </p>
        <p style="color: #444; line-height: 1.6;">
          With gratitude,<br/>
          <strong>The MabEcare Foundation Team</strong>
        </p>
      </div>
    `,
  })
}
