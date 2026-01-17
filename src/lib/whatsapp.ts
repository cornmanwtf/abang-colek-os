/**
 * WhatsApp Business Helpers for Abang Colek
 * Uses Wassist as the messaging backend
 */

import { sendMessage, isWassistConfigured } from './wassist';

export interface OrderDetails {
    orderNumber: string;
    customerName: string;
    items: Array<{ name: string; qty: number; price: number }>;
    total: number;
    eventName?: string;
}

export interface EventReminder {
    eventName: string;
    date: string;
    location: string;
    specialOffer?: string;
}

export interface LuckyDrawWinner {
    winnerName: string;
    prize: string;
    eventName: string;
}

/**
 * Send order confirmation via WhatsApp
 */
export async function sendOrderConfirmation(
    phoneNumber: string,
    order: OrderDetails
): Promise<boolean> {
    if (!isWassistConfigured()) {
        console.log('[WhatsApp] Mock: Order confirmation sent to', phoneNumber);
        return true;
    }

    const itemsList = order.items
        .map(item => `• ${item.name} x${item.qty} - RM${item.price}`)
        .join('\n');

    const message = `🌶️ *ABANG COLEK*

Terima kasih ${order.customerName}!

*Order #${order.orderNumber}*
${itemsList}

─────────────
*TOTAL: RM${order.total.toFixed(2)}*

${order.eventName ? `📍 Event: ${order.eventName}` : ''}

Jumpa lagi! 🔥`;

    const result = await sendMessage(phoneNumber, message);
    return result !== null;
}

/**
 * Send event reminder via WhatsApp
 */
export async function sendEventReminder(
    phoneNumber: string,
    event: EventReminder
): Promise<boolean> {
    if (!isWassistConfigured()) {
        console.log('[WhatsApp] Mock: Event reminder sent to', phoneNumber);
        return true;
    }

    const message = `🌶️ *ABANG COLEK - EVENT REMINDER*

Jangan lupa datang!

📅 *${event.eventName}*
📍 ${event.location}
🕐 ${event.date}

${event.specialOffer ? `🎁 Special: ${event.specialOffer}` : ''}

See you there! 🔥`;

    const result = await sendMessage(phoneNumber, message);
    return result !== null;
}

/**
 * Announce lucky draw winner via WhatsApp
 */
export async function announceLuckyDrawWinner(
    phoneNumber: string,
    winner: LuckyDrawWinner
): Promise<boolean> {
    if (!isWassistConfigured()) {
        console.log('[WhatsApp] Mock: Lucky draw announcement sent to', phoneNumber);
        return true;
    }

    const message = `🎉 *TAHNIAH!* 🎉

*${winner.winnerName}*

Anda menang *${winner.prize}*!
📍 Event: ${winner.eventName}

Sila hubungi booth kami untuk claim hadiah.

🌶️ ABANG COLEK`;

    const result = await sendMessage(phoneNumber, message);
    return result !== null;
}

/**
 * Send promotional blast
 */
export async function sendPromoBlast(
    phoneNumbers: string[],
    message: string
): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    for (const phone of phoneNumbers) {
        const result = await sendMessage(phone, message);
        if (result) {
            success++;
        } else {
            failed++;
        }
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    return { success, failed };
}
