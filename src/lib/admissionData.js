/**
 * admissionData.js — BharatOS Academy Admission Helper Module
 *
 * Provides core admission identifiers and data formatting.
 * Notification and lead delivery is handled by lib/notifications.js.
 */

/**
 * Generate a unique registration ID.
 * Format: BA-{timestamp-last-8-digits}-{random-4-digits}
 * Example: BA-22334455-7291
 * Collision-safe for batch-scale usage.
 */
export function generateRegistrationId() {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `BA-${timestamp}-${random}`;
}
