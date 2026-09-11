/**
 * notifications.js — BharatOS Academy Email & WhatsApp Notification Engine
 *
 * Handles server-side notification delivery for new admission leads:
 * 1. Primary: Transactional Email via Resend REST API (with PDF receipt attachment)
 * 2. Secondary: WhatsApp notification to Academy Administrator
 */

/**
 * Format Indian date and time string.
 */
export function formatIndianDateTime(date = new Date()) {
  const dateStr = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
  const timeStr = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
  return `${dateStr} at ${timeStr}`;
}

/**
 * Generate HTML email template for admission lead notification.
 * @param {Object} admission
 * @param {string} formattedDate
 */
function buildAdmissionEmailHtml(admission, formattedDate) {
  const {
    registrationId,
    studentName,
    studentMobile,
    parentMobile,
    qualification,
    futureGoal,
    paymentPlan = "45-Day Practical AI Program (₹8,999)",
    source = "BharatOS AI Academy Admission Portal",
  } = admission;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Admission Lead — BharatOS Academy</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f9; color: #1f2937;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f6f9; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #0b0f19; padding: 24px 30px; border-bottom: 3px solid #00f0ff;">
              <h1 style="margin: 0; font-size: 22px; color: #ffffff; font-weight: 800; letter-spacing: 0.5px;">
                BHARATOS ACADEMY
              </h1>
              <p style="margin: 4px 0 0; font-size: 13px; color: #94a3b8; font-weight: 500;">
                NEW ADMISSION / LEAD NOTIFICATION
              </p>
            </td>
          </tr>

          <!-- Registration Badge Bar -->
          <tr>
            <td style="background-color: #f8fafc; padding: 14px 30px; border-bottom: 1px solid #e2e8f0;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-size: 13px; color: #475569; font-weight: 600;">
                    Reg ID: <span style="color: #0284c7; font-family: monospace; font-size: 14px; font-weight: 700;">${registrationId}</span>
                  </td>
                  <td align="right" style="font-size: 12px; color: #64748b;">
                    ${formattedDate}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 24px 30px;">
              <h2 style="margin: 0 0 16px; font-size: 16px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">
                Student Information
              </h2>

              <table width="100%" border="0" cellspacing="0" cellpadding="8" style="font-size: 14px; margin-bottom: 20px;">
                <tr>
                  <td width="35%" style="color: #64748b; font-weight: 600; vertical-align: top;">Student Full Name:</td>
                  <td style="color: #0f172a; font-weight: 700; vertical-align: top;">${studentName}</td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="color: #64748b; font-weight: 600; vertical-align: top;">Student Mobile:</td>
                  <td style="color: #0f172a; font-weight: 700; vertical-align: top;">
                    <a href="tel:${studentMobile}" style="color: #0284c7; text-decoration: none;">${studentMobile}</a>
                    &nbsp;&nbsp;
                    <a href="https://wa.me/91${studentMobile}" style="color: #16a34a; text-decoration: none; font-size: 12px; font-weight: 600;">[WhatsApp Chat]</a>
                  </td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; vertical-align: top;">Parent Mobile:</td>
                  <td style="color: #0f172a; font-weight: 600; vertical-align: top;">
                    ${parentMobile && parentMobile !== "Not provided" ? `<a href="tel:${parentMobile}" style="color: #0284c7; text-decoration: none;">${parentMobile}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}
                  </td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="color: #64748b; font-weight: 600; vertical-align: top;">Class / Qualification:</td>
                  <td style="color: #0f172a; font-weight: 600; vertical-align: top;">${qualification}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; vertical-align: top;">Selected Payment Plan:</td>
                  <td style="color: #0284c7; font-weight: 700; vertical-align: top;">${paymentPlan}</td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="color: #64748b; font-weight: 600; vertical-align: top;">Payment Status:</td>
                  <td style="color: #d97706; font-weight: 700; vertical-align: top;">Pending Manual Verification (via WhatsApp Screenshot)</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; vertical-align: top;">Lead Source:</td>
                  <td style="color: #334155; font-weight: 500; vertical-align: top;">${source}</td>
                </tr>
              </table>

              <!-- Future Goal Box -->
              <div style="background-color: #f8fafc; border-left: 4px solid #00f0ff; padding: 14px 18px; border-radius: 4px; margin-bottom: 20px;">
                <p style="margin: 0 0 6px; font-size: 12px; color: #475569; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  Future Goal / Aspirations:
                </p>
                <p style="margin: 0; font-size: 14px; color: #1e293b; line-height: 1.5; font-style: italic;">
                  "${futureGoal}"
                </p>
              </div>

              <!-- Attachment Note -->
              <p style="margin: 0 0 10px; font-size: 12px; color: #64748b; line-height: 1.5;">
                📎 <strong>Admission Receipt PDF:</strong> The official PDF admission receipt has been attached to this email and was also delivered to the student.
              </p>
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                This admission was submitted through the BharatOS Academy website.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0b0f19; padding: 16px 30px; text-align: center; border-top: 1px solid #1e293b;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                © 2026 BharatOS Academy • Sovereign AI Education Infrastructure
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

/**
 * Generate plain text fallback for admission email.
 * @param {Object} admission
 * @param {string} formattedDate
 */
function buildAdmissionEmailText(admission, formattedDate) {
  const {
    registrationId,
    studentName,
    studentMobile,
    parentMobile = "Not provided",
    qualification,
    futureGoal,
    paymentPlan = "Gyanoday Special — Full Payment ₹1,599",
    source = "BharatOS Academy Website",
  } = admission;

  return `BHARATOS ACADEMY
NEW ADMISSION / LEAD

Registration ID:
${registrationId}

Date & Time:
${formattedDate}

Student Name:
${studentName}

Student Mobile:
${studentMobile}

Parent Mobile:
${parentMobile}

Current Class / Qualification:
${qualification}

Selected Payment Plan:
${paymentPlan}

Payment Status:
Pending Manual Verification (via WhatsApp Screenshot)

Future Goal:
${futureGoal}

Source:
${source}

This admission was submitted through the BharatOS Academy website.
Official Admission Receipt PDF is attached.`;
}

/**
 * Send Admin Notification Email via Resend API.
 *
 * @param {Object} params
 * @param {Object} params.admission - Admission data object
 * @param {Uint8Array|Buffer} [params.pdfBuffer] - Generated PDF binary buffer
 * @returns {Promise<{success: boolean, id?: string}>}
 */
export async function sendAdminEmail({ admission, pdfBuffer }) {
  const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || "lavsoni1986@gmail.com";
  const fromEmail = process.env.FROM_EMAIL || "BharatOS Academy <onboarding@resend.dev>";

  const formattedDate = formatIndianDateTime(new Date());
  const subject = `New BharatOS Academy Admission — ${admission.studentName} — ${admission.registrationId}`;
  const htmlContent = buildAdmissionEmailHtml(admission, formattedDate);
  const textContent = buildAdmissionEmailText(admission, formattedDate);

  // If running without an API key, log email and return skipped status
  if (!apiKey || apiKey === "mock") {
    console.log("[notifications:email] RESEND_API_KEY / EMAIL_API_KEY not configured. Skipping email notification.");
    console.log(`To: ${adminEmail}`);
    console.log(`Subject: ${subject}`);
    return { success: true, skipped: true };
  }

  const payload = {
    from: fromEmail,
    to: [adminEmail],
    subject,
    html: htmlContent,
    text: textContent,
  };

  // Attach PDF receipt if available
  if (pdfBuffer) {
    payload.attachments = [
      {
        filename: `${admission.registrationId}-admission.pdf`,
        content: Buffer.from(pdfBuffer).toString("base64"),
      },
    ];
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown Resend error");
    throw new Error(`Resend email delivery failed (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  return { success: true, id: result.id };
}

/**
 * Send WhatsApp Notification to Administrator.
 *
 * Designed to be non-blocking and production-safe. Supports:
 * - Meta WhatsApp Business Cloud API (WHATSAPP_ACCESS_TOKEN + WHATSAPP_PHONE_NUMBER_ID)
 * - Twilio WhatsApp API (TWILIO_ACCOUNT_SID + TWILIO_AUTH_TOKEN + TWILIO_WHATSAPP_NUMBER)
 * - Generic WhatsApp Webhook Gateway (WHATSAPP_WEBHOOK_URL)
 *
 * @param {Object} params
 * @param {Object} params.admission
 * @returns {Promise<{success: boolean, skipped?: boolean, error?: string}>}
 */
export async function sendWhatsAppNotification({ admission }) {
  const adminWhatsApp = process.env.ADMIN_WHATSAPP_NUMBER || "919753239303";
  const cleanPhone = adminWhatsApp.replace(/\D/g, "");

  const messageText = `🔔 NEW BHARATOS ACADEMY ADMISSION

Registration ID: ${admission.registrationId}

Student: ${admission.studentName}

Mobile: ${admission.studentMobile}

Parent Mobile: ${admission.parentMobile || "Not provided"}

Class: ${admission.qualification}

Payment Plan: ${admission.paymentPlan || "Gyanoday Special — Full Payment ₹1,599"}

Payment Status: Pending Verification

Future Goal: ${admission.futureGoal}

Source: ${admission.source || "BharatOS Academy Website"}

Please follow up with the student for fee verification.`;

  try {
    // 1. Generic Webhook Gateway
    if (process.env.WHATSAPP_WEBHOOK_URL) {
      const resp = await fetch(process.env.WHATSAPP_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: cleanPhone,
          message: messageText,
          admission,
        }),
      });
      if (!resp.ok) {
        console.warn(`[notifications:whatsapp] Webhook gateway returned ${resp.status}`);
      }
      return { success: resp.ok };
    }

    // 2. Meta WhatsApp Cloud API
    if (process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
      const resp = await fetch(
        `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: cleanPhone,
            type: "text",
            text: { body: messageText },
          }),
        }
      );
      return { success: resp.ok };
    }

    // 3. Twilio WhatsApp API
    if (
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_WHATSAPP_NUMBER
    ) {
      const auth = Buffer.from(
        `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
      ).toString("base64");

      const params = new URLSearchParams({
        From: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        To: `whatsapp:+${cleanPhone}`,
        Body: messageText,
      });

      const resp = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
        {
          method: "POST",
          headers: {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        }
      );
      return { success: resp.ok };
    }

    // If no WhatsApp provider configured
    console.log(
      "[notifications:whatsapp] WhatsApp credentials not configured. Skipping WhatsApp notification."
    );
    return { success: true, skipped: true };
  } catch (error) {
    console.error("[notifications:whatsapp] WhatsApp notification error:", error.message);
    return { success: false, error: error.message };
  }
}
