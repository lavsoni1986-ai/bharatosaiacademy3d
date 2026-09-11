/**
 * /api/admission — BharatOS Academy Admission Reservation API
 *
 * Flow:
 * 1. Validate & sanitize student submission
 * 2. Generate unique Registration ID (or reuse provided)
 * 3. Generate PDF receipt in memory
 * 4. Dispatch Email notification to Admin with PDF attachment (Resend API)
 * 5. Dispatch WhatsApp notification to Admin (non-blocking)
 * 6. Return JSON response or PDF receipt
 */

import { generateRegistrationId } from "../src/lib/admissionData.js";
import { generateReceiptPDF } from "../src/lib/pdfReceipt.js";
import {
  sendAdminEmail,
  sendWhatsAppNotification,
} from "./notifications.js";

const PHONE_REGEX = /^[6-9]\d{9}$/;

function validateAndSanitize(body) {
  const errors = [];
  const s = {};

  const trim = (val) => (typeof val === "string" ? val.trim() : "");

  s.studentName = trim(body.studentName);
  if (!s.studentName) errors.push("Student full name is required.");

  s.studentMobile = trim(body.studentMobile);
  if (!s.studentMobile) {
    errors.push("Student mobile number is required.");
  } else if (!PHONE_REGEX.test(s.studentMobile)) {
    errors.push("Invalid student mobile number. Must be a valid 10-digit Indian number.");
  }

  s.parentMobile = trim(body.parentMobile);
  if (s.parentMobile && !PHONE_REGEX.test(s.parentMobile)) {
    errors.push("Invalid parent mobile number. Must be a valid 10-digit Indian number.");
  }

  s.qualification = trim(body.qualification);
  if (!s.qualification) errors.push("Current class / qualification is required.");

  s.futureGoal = trim(body.futureGoal);
  if (!s.futureGoal) errors.push("Future goal is required.");

  s.paymentPlan = trim(body.paymentPlan) || "Gyanoday Special — Full Payment: ₹1,599";
  s.source = trim(body.source) || "BharatOS AI Academy Admission Portal";

  return { valid: errors.length === 0, errors, sanitized: s };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }

  try {
    const body = req.body || {};

    if (body.website && body.website.trim().length > 0) {
      return res.status(200).json({ success: true, honeypot: true });
    }

    const { valid, errors, sanitized } = validateAndSanitize(body);
    if (!valid) {
      return res.status(400).json({ error: "Validation failed.", details: errors });
    }

    const registrationId = body.registrationId || generateRegistrationId();

    const admission = {
      registrationId,
      studentName: sanitized.studentName,
      studentMobile: sanitized.studentMobile,
      parentMobile: sanitized.parentMobile || "Not provided",
      qualification: sanitized.qualification,
      futureGoal: sanitized.futureGoal,
      paymentPlan: sanitized.paymentPlan,
      source: sanitized.source,
      submittedAt: new Date().toISOString(),
    };

    let pdfBuffer;
    try {
      pdfBuffer = await generateReceiptPDF(
        {
          registrationId,
          studentName: sanitized.studentName,
          studentMobile: sanitized.studentMobile,
          parentMobile: sanitized.parentMobile || "Not provided",
          qualification: sanitized.qualification,
          futureGoal: sanitized.futureGoal,
        },
        { paperSize: "A4" }
      );
    } catch (pdfErr) {
      console.warn("[admission] PDF generation warning:", pdfErr);
    }

    // Dispatch notifications in background
    try {
      await sendAdminEmail({ admission, pdfBuffer });
    } catch (emailErr) {
      console.warn("[admission] Email alert warning:", emailErr.message);
    }

    try {
      await sendWhatsAppNotification({ admission });
    } catch (waErr) {
      console.warn("[admission] WhatsApp alert warning:", waErr.message);
    }

    if (req.headers.accept === "application/pdf" && pdfBuffer) {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${registrationId}-admission.pdf"`
      );
      return res.status(200).send(Buffer.from(pdfBuffer));
    }

    return res.status(200).json({
      success: true,
      registrationId,
      admission,
      message: "Admission registration recorded successfully.",
    });
  } catch (error) {
    console.error("[admission] Internal error:", error);
    return res.status(500).json({
      error: "Internal server error.",
      message: error.message,
    });
  }
}
