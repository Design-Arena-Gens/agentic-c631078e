const { generateAutoReply } = require('../lib/agent');
const { sendWhatsAppTextMessage, extractMessagesFromWebhook, getVerifyToken } = require('../lib/whatsapp');

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];

      if (mode === 'subscribe' && token === getVerifyToken()) {
        return res.status(200).send(challenge);
      }
      return res.status(403).json({ error: 'Verification failed' });
    }

    if (req.method === 'POST') {
      const body = req.body;
      const messages = extractMessagesFromWebhook(body);

      if (messages.length === 0) {
        return res.status(200).json({ ok: true });
      }

      // Process messages one by one, but do not await sends to avoid webhook timeouts
      const sendPromises = [];
      for (const msg of messages) {
        try {
          if (!msg.from || !msg.text) continue;
          const reply = await generateAutoReply({
            text: msg.text,
            fromName: msg.profileName || 'there',
            timestamp: msg.timestamp || Date.now(),
          });
          sendPromises.push(sendWhatsAppTextMessage(msg.from, reply));
        } catch (innerErr) {
          // best-effort; keep processing
          console.error('Message processing error:', innerErr);
        }
      }

      // Fire and forget but cap the time we wait
      Promise.allSettled(sendPromises).catch(() => {});
      return res.status(200).json({ ok: true, processed: messages.length });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
