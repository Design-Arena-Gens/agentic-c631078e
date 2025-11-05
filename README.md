## WhatsApp Agent (Vercel)

A minimalist serverless WhatsApp auto-reply agent ready for the WhatsApp Business Cloud API, deployable on Vercel.

### Features
- Webhook verification endpoint: `/api/webhook` (GET)
- Message handling (auto-replies, rule-based with optional AI): `/api/webhook` (POST)
- Status endpoint: `/api/status`
- Simulator (no WhatsApp needed): `/api/simulate`
- Static dashboard at `/` with setup guidance and a simulator UI

### Environment Variables
- `WHATSAPP_VERIFY_TOKEN` (string): Token to verify webhook subscription
- `WHATSAPP_ACCESS_TOKEN` (string): WhatsApp Cloud API access token
- `WHATSAPP_PHONE_NUMBER_ID` (string): Your business phone number ID
- `OPENAI_API_KEY` (optional): Enhances replies via GPT

### Local Check
No local server is required. You can sanity-check syntax:

```bash
npm test
```

### Webhook Setup (Meta Console)
1. Deploy to Vercel and set the environment variables above.
2. Configure webhook URL: `https://<your-domain>/api/webhook`
3. Use `WHATSAPP_VERIFY_TOKEN` to verify.
4. Send a message to your WhatsApp business number; you should receive an auto-reply.

### Simulator
Use the dashboard at `/` to simulate an incoming message and preview the agent reply without WhatsApp.