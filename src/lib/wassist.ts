/**
 * Wassist WhatsApp API Client
 * @see https://docs.wassist.app
 */

// Configuration from environment variables
const WASSIST_API_KEY = import.meta.env.VITE_WASSIST_API_KEY || '';
const WASSIST_AGENT_ID = import.meta.env.VITE_WASSIST_AGENT_ID || '';
const WASSIST_API_URL = 'https://api.wassist.app';

export interface WassistMessage {
    id: string;
    contact: string;
    content: string;
    direction: 'inbound' | 'outbound';
    timestamp: string;
    status: 'sent' | 'delivered' | 'read' | 'failed';
}

export interface WassistConversation {
    id: string;
    contact: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

/**
 * Check if Wassist is configured
 */
export function isWassistConfigured(): boolean {
    return Boolean(WASSIST_API_KEY && WASSIST_AGENT_ID);
}

/**
 * Send a message via Wassist AI agent
 */
export async function sendMessage(contact: string, prompt: string): Promise<WassistMessage | null> {
    if (!isWassistConfigured()) {
        console.warn('[Wassist] Not configured - set VITE_WASSIST_API_KEY and VITE_WASSIST_AGENT_ID');
        return null;
    }

    try {
        const response = await fetch(`${WASSIST_API_URL}/v1/conversations/prompt`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${WASSIST_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                agentId: WASSIST_AGENT_ID,
                contact,
                prompt,
            }),
        });

        if (!response.ok) {
            throw new Error(`Wassist API error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('[Wassist] Failed to send message:', error);
        return null;
    }
}

/**
 * Fetch recent conversations
 */
export async function getConversations(): Promise<WassistConversation[]> {
    if (!isWassistConfigured()) {
        return [];
    }

    try {
        const response = await fetch(`${WASSIST_API_URL}/v1/agents/${WASSIST_AGENT_ID}/conversations`, {
            headers: {
                'Authorization': `Bearer ${WASSIST_API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Wassist API error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('[Wassist] Failed to fetch conversations:', error);
        return [];
    }
}

/**
 * Fetch messages for a specific conversation
 */
export async function getMessages(conversationId: string): Promise<WassistMessage[]> {
    if (!isWassistConfigured()) {
        return [];
    }

    try {
        const response = await fetch(`${WASSIST_API_URL}/v1/conversations/${conversationId}/messages`, {
            headers: {
                'Authorization': `Bearer ${WASSIST_API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Wassist API error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('[Wassist] Failed to fetch messages:', error);
        return [];
    }
}
