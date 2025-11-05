module.exports = async (req, res) => {
  try {
    const envStatus = {
      WHATSAPP_VERIFY_TOKEN: Boolean(process.env.WHATSAPP_VERIFY_TOKEN),
      WHATSAPP_ACCESS_TOKEN: Boolean(process.env.WHATSAPP_ACCESS_TOKEN),
      WHATSAPP_PHONE_NUMBER_ID: Boolean(process.env.WHATSAPP_PHONE_NUMBER_ID),
      OPENAI_API_KEY: Boolean(process.env.OPENAI_API_KEY),
    };
    return res.status(200).json({ ok: true, env: envStatus });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'status_failed' });
  }
};
