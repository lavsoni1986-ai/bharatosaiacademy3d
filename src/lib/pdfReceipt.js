/**
 * pdfReceipt.js — BharatOS Academy PDF Receipt & Admission Form Engine
 *
 * Strict grid-based rendering optimized for high-contrast physical printing.
 * Supports A4 portrait (Student Copy + Office Counterfoil split) and A6 thermal receipt (margin 0).
 */

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// ───────────────────────────────────────────────────────────────────────────
//  COLOR PALETTE (Ink-saving, high-contrast black-and-white for printing)
// ───────────────────────────────────────────────────────────────────────────
const C = {
  text:   rgb(0, 0, 0),          // Deep Black #000000
  label:  rgb(0.27, 0.27, 0.27), // Dark Gray for label hierarchy
  dim:    rgb(0.45, 0.45, 0.45), // Medium Gray for auxiliary text
  line:   rgb(0.75, 0.75, 0.75), // Light Gray for divider lines
  badgeBg:rgb(0, 0, 0),          // Black badge fill
  badgeTx:rgb(1, 1, 1),          // White badge text
};

// ───────────────────────────────────────────────────────────────────────────
//  TYPOGRAPHY SCALE (Sized for print crispness)
// ───────────────────────────────────────────────────────────────────────────
const F = {
  brand:    14,
  subtitle: 9,
  label:     8,
  value:    10,
  badge:     8,
  small:     8,
};

const MAX_LINES_PER_FIELD = 4;

/**
 * Word-wrap text to fit within maxWidth.
 */
function wrapText(text, font, size, maxWidth) {
  if (!text || text.trim().length === 0) {
    return { lines: [""], lineCount: 1 };
  }

  const words = text.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? current + " " + word : word;
    const w = font.widthOfTextAtSize(candidate, size);

    if (w <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      if (font.widthOfTextAtSize(word, size) > maxWidth) {
        lines.push(word);
        current = "";
      } else {
        current = word;
      }
    }
  }

  if (current) lines.push(current);

  if (lines.length > MAX_LINES_PER_FIELD) {
    const truncated = lines.slice(0, MAX_LINES_PER_FIELD);
    const last = truncated[MAX_LINES_PER_FIELD - 1];
    truncated[MAX_LINES_PER_FIELD - 1] = last.replace(/\s+$/, "") + " ...";
    return { lines: truncated, lineCount: MAX_LINES_PER_FIELD };
  }

  return { lines, lineCount: lines.length || 1 };
}

/**
 * Generate a branded admission receipt/form PDF.
 * @param {Object} d - Registration data
 * @param {Object} [options]
 * @param {string} [options.paperSize] - "A4" or "A6"
 */
export async function generateReceiptPDF(d, options = {}) {
  const paperSize = (options.paperSize || "A4").toUpperCase();
  const isA4 = paperSize === "A4";

  // Page Dimensions
  const PAGE_W = isA4 ? 595.28 : 297.64;
  const PAGE_H = isA4 ? 841.89 : 419.53;
  const PAD = isA4 ? 36 : 0; // Margins: 36 for A4, 0 for A6 receipt

  const doc = await PDFDocument.create();
  const page = doc.addPage([PAGE_W, PAGE_H]);
  const fnt = await doc.embedFont(StandardFonts.Helvetica);
  const bld = await doc.embedFont(StandardFonts.HelveticaBold);

  // Date strings
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
  const dateTimeStr = `${dateStr} at ${timeStr}`;

  // Helper: Draw Right Aligned Text
  function drawTextRight(str, sz, color, font, y, margin = PAD) {
    const w = font.widthOfTextAtSize(str, sz);
    page.drawText(str, { x: PAGE_W - margin - w, y, size: sz, font, color });
  }

  // Helper: Centered Pill Badge
  function drawBadge(yCenter, text) {
    const badgeW = bld.widthOfTextAtSize(text, F.badge);
    const badgeH = 14;
    const badgeX = (PAGE_W - badgeW) / 2;

    page.drawRectangle({
      x: badgeX - 8,
      y: yCenter - badgeH / 2,
      width: badgeW + 16,
      height: badgeH,
      color: C.badgeBg,
    });

    page.drawText(text, {
      x: badgeX,
      y: yCenter - badgeH / 2 + 3,
      size: F.badge,
      font: bld,
      color: C.badgeTx,
    });
  }

  // Helper: Left-Aligned Form Field
  function drawField(label, value, x, y, width) {
    page.drawText(label, { x, y, size: F.label, font: fnt, color: C.label });
    let cy = y - 11;
    const safeValue = value && value.trim().length > 0 ? value : "(Not specified)";
    const { lines } = wrapText(safeValue, bld, F.value, width);
    for (const line of lines) {
      page.drawText(line, { x, y: cy, size: F.value, font: bld, color: C.text });
      cy -= 12;
    }
    return cy;
  }

  if (isA4) {
    // ═══════════════════════════════════════════════════════════════════
    //  A4 PORTRAIT LAYOUT: STUDENT COPY (TOP) & COUNTERFOIL (BOTTOM)
    // ═══════════════════════════════════════════════════════════════════

    const midY = PAGE_H / 2; // 420.95 pt
    const colW = (PAGE_W - PAD * 2 - 20) / 2; // Two columns

    // ─────────────────────────────────────────────────────────────────
    //  1. STUDENT COPY (Top Half: y from 420.95 to 841.89)
    // ─────────────────────────────────────────────────────────────────
    let cy = PAGE_H - PAD; // 805.89

    // Full Header
    page.drawText("BHARATOS ACADEMY", { x: PAD, y: cy, size: F.brand, font: bld, color: C.text });
    drawTextRight("Admission Reservation — Student Copy", F.subtitle, C.text, fnt, cy);
    
    cy -= 10;
    page.drawLine({
      start: { x: PAD, y: cy },
      end: { x: PAGE_W - PAD, y: cy },
      thickness: 0.5,
      color: C.line,
    });

    // Metadata Row
    cy -= 15;
    page.drawText(`Registration ID: ${d.registrationId}`, { x: PAD, y: cy, size: F.small, font: bld, color: C.text });
    drawTextRight(`Date: ${dateTimeStr}`, F.small, C.dim, fnt, cy);

    // Grid Fields
    cy -= 25;
    let y1 = drawField("Student Name", d.studentName, PAD, cy, colW);
    let y2 = drawField("Student Mobile", d.studentMobile, PAGE_W / 2 + 10, cy, colW);
    cy = Math.min(y1, y2) - 10;

    y1 = drawField("Parent Mobile", d.parentMobile, PAD, cy, colW);
    y2 = drawField("Class / Qualification", d.qualification, PAGE_W / 2 + 10, cy, colW);
    cy = Math.min(y1, y2) - 10;

    cy = drawField("Future Goal", d.futureGoal, PAD, cy, PAGE_W - PAD * 2);

    // Centered Pill Badge
    cy -= 15;
    drawBadge(cy, "FOUNDING BATCH RESERVED");

    // Signature Block (Anchored at bottom right of Top Copy)
    const sigW = 120;
    const sigX = PAGE_W - PAD - sigW;
    const sigY_top = midY + 24;

    page.drawLine({
      start: { x: sigX, y: sigY_top + 10 },
      end: { x: PAGE_W - PAD, y: sigY_top + 10 },
      thickness: 0.5,
      color: C.text,
    });
    page.drawText("Authorized Signatory", {
      x: sigX + 12,
      y: sigY_top,
      size: F.small,
      font: fnt,
      color: C.text,
    });

    // ─────────────────────────────────────────────────────────────────
    //  SECTION DIVISION LINE (Dashed cutting line at midpoint)
    // ─────────────────────────────────────────────────────────────────
    page.drawLine({
      start: { x: PAD, y: midY },
      end: { x: PAGE_W - PAD, y: midY },
      thickness: 0.8,
      color: C.dim,
      dashArray: [4, 4],
    });
    
    const cutText = " - - - - - - - - - - - - - - CUT / FOLD HERE - - - - - - - - - - - - - - ";
    const cutTextW = fnt.widthOfTextAtSize(cutText, 7);
    page.drawRectangle({
      x: (PAGE_W - cutTextW) / 2 - 4,
      y: midY - 6,
      width: cutTextW + 8,
      height: 12,
      color: rgb(1, 1, 1),
    });
    page.drawText(cutText, {
      x: (PAGE_W - cutTextW) / 2,
      y: midY - 3,
      size: 7,
      font: fnt,
      color: C.dim,
    });

    // ─────────────────────────────────────────────────────────────────
    //  2. COUNTERFOIL COPY (Bottom Half: y from PAD to 420.95)
    // ─────────────────────────────────────────────────────────────────
    cy = midY - 24;

    // Compact Header (minimal duplication)
    page.drawText("BHARATOS ACADEMY — COUNTERFOIL COPY", { x: PAD, y: cy, size: 11, font: bld, color: C.text });
    
    cy -= 8;
    page.drawLine({
      start: { x: PAD, y: cy },
      end: { x: PAGE_W - PAD, y: cy },
      thickness: 0.5,
      color: C.line,
    });

    // Metadata Row
    cy -= 15;
    page.drawText(`Registration ID: ${d.registrationId}`, { x: PAD, y: cy, size: F.small, font: bld, color: C.text });
    drawTextRight(`Date: ${dateTimeStr}`, F.small, C.dim, fnt, cy);

    // Grid Fields
    cy -= 25;
    y1 = drawField("Student Name", d.studentName, PAD, cy, colW);
    y2 = drawField("Student Mobile", d.studentMobile, PAGE_W / 2 + 10, cy, colW);
    cy = Math.min(y1, y2) - 10;

    y1 = drawField("Parent Mobile", d.parentMobile, PAD, cy, colW);
    y2 = drawField("Class / Qualification", d.qualification, PAGE_W / 2 + 10, cy, colW);
    cy = Math.min(y1, y2) - 10;

    cy = drawField("Future Goal", d.futureGoal, PAD, cy, PAGE_W - PAD * 2);

    // Centered Pill Badge
    cy -= 15;
    drawBadge(cy, "FOUNDING BATCH RESERVED");

    // Signature Block (Anchored at bottom right of Bottom Copy)
    const sigY_bot = PAD + 24;

    page.drawLine({
      start: { x: sigX, y: sigY_bot + 10 },
      end: { x: PAGE_W - PAD, y: sigY_bot + 10 },
      thickness: 0.5,
      color: C.text,
    });
    page.drawText("Authorized Signatory", {
      x: sigX + 12,
      y: sigY_bot,
      size: F.small,
      font: fnt,
      color: C.text,
    });

  } else {
    // ═══════════════════════════════════════════════════════════════════
    //  A6 PORTRAIT LAYOUT: THERMAL/RECEIPT ONLY (0 Page Margins)
    // ═══════════════════════════════════════════════════════════════════
    const margin = 12; // Internal padding inside 0 page margin
    const usableW = PAGE_W - margin * 2;
    let cy = PAGE_H - 18;

    // Header Row
    page.drawText("BHARATOS ACADEMY", { x: margin, y: cy, size: 11, font: bld, color: C.text });
    drawTextRight("Admission Receipt", 8, C.text, fnt, cy, margin);

    cy -= 8;
    page.drawLine({
      start: { x: margin, y: cy },
      end: { x: PAGE_W - margin, y: cy },
      thickness: 0.5,
      color: C.line,
    });

    // Metadata Row
    cy -= 12;
    page.drawText(`Reg ID: ${d.registrationId}`, { x: margin, y: cy, size: 8, font: bld, color: C.text });
    drawTextRight(dateStr, 8, C.dim, fnt, cy, margin);

    // Vertical Tighter Stack for A6
    cy -= 18;
    
    function drawFieldA6(label, value, y) {
      page.drawText(`${label}:`, { x: margin, y, size: 8, font: fnt, color: C.label });
      const safeVal = value && value.trim().length > 0 ? value : "(Not specified)";
      
      if (label === "Future Goal") {
        // Multi-line stack block
        let valY = y - 10;
        const { lines } = wrapText(safeVal, bld, 8, usableW);
        for (const line of lines) {
          page.drawText(line, { x: margin, y: valY, size: 8, font: bld, color: C.text });
          valY -= 10;
        }
        return valY;
      } else {
        // Inline layout
        const labelW = fnt.widthOfTextAtSize(`${label}: `, 8);
        const valX = margin + labelW;
        const maxValW = PAGE_W - margin - valX;
        const { lines } = wrapText(safeVal, bld, 8, maxValW);
        page.drawText(lines[0], { x: valX, y, size: 8, font: bld, color: C.text });
        return y - 12;
      }
    }

    cy = drawFieldA6("Student Name", d.studentName, cy);
    cy = drawFieldA6("Mobile No", d.studentMobile, cy);
    if (d.parentMobile && d.parentMobile !== "Not provided") {
      cy = drawFieldA6("Parent Mob", d.parentMobile, cy);
    }
    cy = drawFieldA6("Qualification", d.qualification, cy);
    cy = drawFieldA6("Future Goal", d.futureGoal, cy);

    // Centered Pill Badge
    cy -= 12;
    const badgeTxt = "FOUNDING BATCH RESERVED";
    const badgeW = bld.widthOfTextAtSize(badgeTxt, 8);
    const badgeX = (PAGE_W - badgeW) / 2;
    const badgeH = 12;

    page.drawRectangle({
      x: badgeX - 6,
      y: cy - badgeH / 2,
      width: badgeW + 12,
      height: badgeH,
      color: C.badgeBg,
    });
    page.drawText(badgeTxt, {
      x: badgeX,
      y: cy - badgeH / 2 + 2,
      size: 8,
      font: bld,
      color: C.badgeTx,
    });

    // Signature Block (Anchored at bottom right of A6 page)
    const sigW = 90;
    const sigX = PAGE_W - margin - sigW;
    const sigY_a6 = 18;

    page.drawLine({
      start: { x: sigX, y: sigY_a6 + 9 },
      end: { x: PAGE_W - margin, y: sigY_a6 + 9 },
      thickness: 0.5,
      color: C.text,
    });
    page.drawText("Signature", {
      x: sigX + 18,
      y: sigY_a6,
      size: 7,
      font: fnt,
      color: C.text,
    });
  }

  return doc.save();
}
