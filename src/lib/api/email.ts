import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY)
const ADMIN_EMAIL = import.meta.env.ADMIN_EMAIL

// ─── In-kind confirmation to donor ───────────────────────────

export async function sendInkindConfirmation(data: {
  donor_name: string
  donor_email: string
  item_description: string
  received_at: string
}) {
  const date = new Date(data.received_at).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  await resend.emails.send({
    from: 'MabEcare Foundation <onboarding@resend.dev>',
    to: data.donor_email,
    subject: 'Your donation to MabEcare Foundation has arrived',
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1a0010, #2d0020); padding: 40px 32px; text-align: center; border-radius: 12px 12px 0 0;">
          <div style="width: 52px; height: 52px; background: #ff1493; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 24px;">♥</span>
          </div>
          <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0;">Your items have arrived!</h1>
          <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 8px 0 0;">MabEcare Foundation</p>
        </div>

        <!-- Body -->
        <div style="padding: 36px 32px; border: 1px solid #f0f0f0; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
            Dear <strong>${data.donor_name}</strong>,
          </p>
          <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
            We are delighted to let you know that your in-kind donation has safely arrived at MabEcare Foundation.
            Your generosity means the world to us and to the mothers and children we serve.
          </p>

          <!-- Donation details box -->
          <div style="background: #fdf4ff; border: 1px solid #e9d5ff; border-radius: 10px; padding: 20px 24px; margin: 0 0 24px;">
            <p style="margin: 0 0 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af;">Donation Details</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #6b7280; width: 40%;">Items donated</td>
                <td style="padding: 6px 0; font-size: 13px; color: #111827; font-weight: 600;">${data.item_description}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #6b7280;">Date received</td>
                <td style="padding: 6px 0; font-size: 13px; color: #111827; font-weight: 600;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #6b7280;">Received by</td>
                <td style="padding: 6px 0; font-size: 13px; color: #111827; font-weight: 600;">MabEcare Foundation Team</td>
              </tr>
            </table>
          </div>

          <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
            Your contribution will directly support our programmes for pregnant women, mothers, and children in Ghana.
            We will put your items to the best possible use.
          </p>
          <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 32px;">
            If you have any questions, please reach out to us at
            <a href="mailto:mabecarefoundation@gmail.com" style="color: #ff1493; text-decoration: none;">mabecarefoundation@gmail.com</a>.
          </p>

          <!-- Sign off -->
          <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0;">
            With sincere gratitude,<br/>
            <strong style="color: #111827;">The MabEcare Foundation Team</strong>
          </p>
        </div>

        <!-- Footer -->
        <div style="padding: 20px 32px; text-align: center;">
          <p style="font-size: 11px; color: #9ca3af; margin: 0;">
            MabEcare Foundation &bull; Ho, Volta Region, Ghana<br/>
            <a href="https://mabecare-foundation.vercel.app" style="color: #9ca3af;">mabecare-foundation.vercel.app</a>
          </p>
        </div>

      </div>
    `,
  })
}

// ─── Internal alert to foundation on new donation ────────────

export async function sendDonationAlert(data: {
  type: 'paystack' | 'cash'
  channel?: string
  amount: number
  currency: string
  donor_name?: string
  donor_email?: string
  donor_phone?: string
  reference?: string
  date: string
}) {
  if (!ADMIN_EMAIL) return

  const channelLabel: Record<string, string> = {
    card: 'Card', mobile_money: 'Mobile Money',
    bank_transfer: 'Bank Transfer', ussd: 'USSD',
    apple_pay: 'Apple Pay', qr: 'QR Code',
  }

  const date = new Date(data.date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const typeLabel = data.type === 'cash' ? 'Cash' : 'Paystack'
  const channel   = data.channel ? (channelLabel[data.channel] ?? data.channel) : 'Cash'
  const amount    = `${data.currency} ${Number(data.amount).toLocaleString('en-GH', { minimumFractionDigits: 2 })}`

  await resend.emails.send({
    from: 'MabEcare Donations <onboarding@resend.dev>',
    to: ADMIN_EMAIL,
    subject: `New ${typeLabel} donation — ${amount}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #1a0010 0%, #2d0020 60%, #0d0d0d 100%); padding: 36px 32px; position: relative;">
    <!-- Pink accent bar -->
    <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #ff1493, #ff69b4);"></div>

    <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;">
      <div>
        <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(255,20,147,0.15); border: 1px solid rgba(255,20,147,0.3); border-radius: 100px; padding: 4px 12px; margin-bottom: 14px;">
          <div style="width: 6px; height: 6px; background: #ff1493; border-radius: 50%;"></div>
          <span style="color: #ff69b4; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">New In-Kind Submission</span>
        </div>
        <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 4px; letter-spacing: -0.02em;">${data.donor_name}</h1>
        <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;">
          📍 ${data.country ?? 'Location not provided'}
        </p>
      </div>
      <!-- Heart icon -->
      <div style="width: 48px; height: 48px; background: rgba(255,20,147,0.15); border: 1px solid rgba(255,20,147,0.25); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <span style="font-size: 22px;">🎁</span>
      </div>
    </div>
  </div>

  <!-- Body -->
  <div style="padding: 32px;">

    <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
      A new in-kind donation has been submitted through the MabEcare website. Review the details below and update the status in your dashboard.
    </p>

    <!-- Details card -->
    <div style="border: 1px solid #f3e8ff; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
      <div style="background: linear-gradient(135deg, #fdf4ff, #fce7f3); padding: 14px 20px; border-bottom: 1px solid #f3e8ff;">
        <p style="margin: 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #c084fc;">Submission Details</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; background: #ffffff;">
        <tr style="border-bottom: 1px solid #faf5ff;">
          <td style="padding: 12px 20px; font-size: 12px; color: #9ca3af; width: 36%; font-weight: 500;">Donor name</td>
          <td style="padding: 12px 20px; font-size: 13px; color: #111827; font-weight: 600;">${data.donor_name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #faf5ff;">
          <td style="padding: 12px 20px; font-size: 12px; color: #9ca3af; font-weight: 500;">Email</td>
          <td style="padding: 12px 20px; font-size: 13px; color: #ff1493;">${data.donor_email}</td>
        </tr>
        <tr style="border-bottom: 1px solid #faf5ff;">
          <td style="padding: 12px 20px; font-size: 12px; color: #9ca3af; font-weight: 500;">Country</td>
          <td style="padding: 12px 20px; font-size: 13px; color: #111827; font-weight: 600;">${data.country ?? '—'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #faf5ff;">
          <td style="padding: 12px 20px; font-size: 12px; color: #9ca3af; font-weight: 500;">Items donated</td>
          <td style="padding: 12px 20px; font-size: 13px; color: #111827; font-weight: 600;">${data.item_description}</td>
        </tr>
        <tr style="border-bottom: 1px solid #faf5ff;">
          <td style="padding: 12px 20px; font-size: 12px; color: #9ca3af; font-weight: 500;">Est. value</td>
          <td style="padding: 12px 20px; font-size: 13px; color: #111827; font-weight: 600;">${estValue}</td>
        </tr>
        <tr style="${data.message ? 'border-bottom: 1px solid #faf5ff;' : ''}">
          <td style="padding: 12px 20px; font-size: 12px; color: #9ca3af; font-weight: 500;">Expected ship</td>
          <td style="padding: 12px 20px; font-size: 13px; color: #111827; font-weight: 600;">${shipDate}</td>
        </tr>
        ${data.message ? `
        <tr>
          <td style="padding: 12px 20px; font-size: 12px; color: #9ca3af; font-weight: 500; vertical-align: top;">Message</td>
          <td style="padding: 12px 20px; font-size: 13px; color: #374151; font-style: italic; line-height: 1.6;">"${data.message}"</td>
        </tr>` : ''}
      </table>
    </div>

    <!-- Next steps -->
    <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 10px; padding: 14px 18px; margin-bottom: 28px;">
      <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #f97316;">Next Steps</p>
      <ol style="margin: 0; padding-left: 16px; color: #6b7280; font-size: 13px; line-height: 1.8;">
        <li>Review the submission in your dashboard</li>
        <li>Contact the donor to confirm shipping details</li>
        <li>Update the status to <strong>In Transit</strong> once collected</li>
        <li>Mark as <strong>Received</strong> when items arrive — this triggers a confirmation email to the donor</li>
      </ol>
    </div>

    <!-- CTA -->
    <div style="text-align: center;">
      <a href="https://mabecare-foundation.vercel.app/admin/" style="display: inline-block; background: linear-gradient(135deg, #ff1493, #e0006a); color: #ffffff; font-size: 14px; font-weight: 700; padding: 14px 36px; border-radius: 10px; text-decoration: none; letter-spacing: 0.01em; box-shadow: 0 4px 14px rgba(255,20,147,0.35);">
        View in Dashboard →
      </a>
    </div>

  </div>

  <!-- Footer -->
  <div style="background: #fafafa; border-top: 1px solid #f3f4f6; padding: 20px 32px; text-align: center;">
    <p style="font-size: 12px; color: #9ca3af; margin: 0 0 4px;">
      <strong style="color: #374151;">MabEcare Foundation</strong> &bull; Ho, Volta Region, Ghana
    </p>
    <p style="font-size: 11px; color: #d1d5db; margin: 0;">
      Automated notification · Do not reply to this email
    </p>
  </div>

</div>
    `,
  })
}

// ─── Internal alert on new in-kind submission ─────────────────

export async function sendInkindAlert(data: {
  donor_name: string
  donor_email: string
  country?: string
  item_description: string
  estimated_value?: number
  expected_ship_date?: string
  message?: string
}) {
  if (!ADMIN_EMAIL) return

  const estValue = data.estimated_value
    ? `GHS ${Number(data.estimated_value).toLocaleString('en-GH', { minimumFractionDigits: 2 })}`
    : 'Not provided'

  const shipDate = data.expected_ship_date
    ? new Date(data.expected_ship_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Not specified'

  await resend.emails.send({
    from: 'MabEcare Donations <onboarding@resend.dev>',
    to: ADMIN_EMAIL,
    subject: `New in-kind submission from ${data.donor_name}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">

        <!-- Header -->
        <div style="background: #064e3b; padding: 28px 32px; border-radius: 12px 12px 0 0;">
          <p style="color: rgba(255,255,255,0.5); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 4px;">New In-Kind Submission</p>
          <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0;">${data.donor_name}</h1>
          <p style="color: rgba(255,255,255,0.6); font-size: 13px; margin: 4px 0 0;">${data.country ?? 'Location not provided'}</p>
        </div>

        <!-- Body -->
        <div style="padding: 28px 32px; border: 1px solid #f0f0f0; border-top: none; border-radius: 0 0 12px 12px;">

          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 20px 24px; margin: 0 0 24px;">
            <p style="margin: 0 0 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af;">Submission Details</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #dcfce7;">
                <td style="padding: 8px 0; font-size: 13px; color: #6b7280; width: 38%;">Donor name</td>
                <td style="padding: 8px 0; font-size: 13px; color: #111827; font-weight: 600;">${data.donor_name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dcfce7;">
                <td style="padding: 8px 0; font-size: 13px; color: #6b7280;">Donor email</td>
                <td style="padding: 8px 0; font-size: 13px; color: #111827;">${data.donor_email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dcfce7;">
                <td style="padding: 8px 0; font-size: 13px; color: #6b7280;">Country</td>
                <td style="padding: 8px 0; font-size: 13px; color: #111827; font-weight: 600;">${data.country ?? '—'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dcfce7;">
                <td style="padding: 8px 0; font-size: 13px; color: #6b7280;">Items</td>
                <td style="padding: 8px 0; font-size: 13px; color: #111827; font-weight: 600;">${data.item_description}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dcfce7;">
                <td style="padding: 8px 0; font-size: 13px; color: #6b7280;">Est. value</td>
                <td style="padding: 8px 0; font-size: 13px; color: #111827; font-weight: 600;">${estValue}</td>
              </tr>
              <tr ${data.message ? 'style="border-bottom: 1px solid #dcfce7;"' : ''}>
                <td style="padding: 8px 0; font-size: 13px; color: #6b7280;">Expected ship</td>
                <td style="padding: 8px 0; font-size: 13px; color: #111827; font-weight: 600;">${shipDate}</td>
              </tr>
              ${data.message ? `
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #6b7280; vertical-align: top;">Message</td>
                <td style="padding: 8px 0; font-size: 13px; color: #374151; font-style: italic;">"${data.message}"</td>
              </tr>` : ''}
            </table>
          </div>

          <div style="text-align: center;">
            <a href="https://mabecare-foundation.vercel.app/admin/" style="display: inline-block; background: #10B981; color: #ffffff; font-size: 13px; font-weight: 600; padding: 12px 28px; border-radius: 8px; text-decoration: none;">
              View in Dashboard
            </a>
          </div>

        </div>

        <!-- Footer -->
        <div style="padding: 20px 32px; text-align: center;">
          <p style="font-size: 11px; color: #9ca3af; margin: 0;">
            Automated notification from MabEcare admin system. Do not reply.
          </p>
        </div>

      </div>
    `,
  })
}
