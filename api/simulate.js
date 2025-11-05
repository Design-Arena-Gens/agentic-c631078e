const { generateAutoReply } = require('../lib/agent');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { text, name } = req.body || {};
    if (!text || typeof text !== 'string') return res.status(400).json({ error: 'text_required' });

    const reply = await generateAutoReply({ text, fromName: name || 'there', timestamp: Date.now() });
    return res.status(200).json({ ok: true, reply });
  } catch (err) {
    console.error('Simulate error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
