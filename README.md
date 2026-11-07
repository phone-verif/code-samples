# Phone-Verif code samples

Sample integrations for [Phone-Verif](https://phone-verif.com), which verifies phone numbers with reverse OTP. Instead of receiving an SMS code, your user sends one pre-filled WhatsApp message and you get the verified number.

Telegram is available on every session too.

## How it works

1. Your backend calls `POST /start-verification`.
2. You show the returned link as a QR code on desktop, or as a button on mobile.
3. Your user opens WhatsApp and sends the pre-filled message.
4. You receive a webhook, or call `/check-verification-status`, and read the verified number.

## Quickstart

[Create an account](https://phone-verif.com/auth) to get an API key. You get 100 free credits after [onboarding](https://phone-verif.com/onboarding).

Start a session:

```bash
curl -X POST https://api.phone-verif.com/start-verification \
  -H "X-API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"session_id": "user-123"}'
```

Show `whatsapp.deeplink` from the response to your user:

```json
{
  "session": {
    "validation_token": "xyz789",
    "status": "pending"
  },
  "whatsapp": {
    "deeplink": "https://t.phone-verif.com/qr/xyz789"
  }
}
```

Then check the result:

```bash
curl -X POST https://api.phone-verif.com/check-verification-status \
  -H "X-API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"session_id": "user-123"}'
```

```json
{
  "session": {
    "status": "verified",
    "validated_phone_number": "33612345678"
  }
}
```

In production, use [webhooks](https://phone-verif.com/integration-guide) rather than polling.

### Verify through Telegram

Show `telegram.deeplink` from the response next to the WhatsApp link, and the first channel the user completes wins. To lock a session to the bot, add `provider`:

```json
{"session_id": "user-123", "provider": "telegram"}
```

See the [Telegram section of the integration guide](docs/integration-guide.md#verify-through-telegram).

## Samples

| Sample | Language | What it shows |
|--------|----------|---------------|
| [`reverse-otp-node`](reverse-otp-node) | Node.js | Start a session and check its status |
| [`reverse-otp-python`](reverse-otp-python) | Python | Start a session and check its status |
| [`reverse-otp-android`](reverse-otp-android) | Kotlin | Start a session from an Android app |
| [`reverse-otp-ios`](reverse-otp-ios) | Swift | Start a session from an iOS app |

> [!WARNING]
> The mobile samples keep the API key in the app to stay short. Don't ship that: anyone can extract a key from an app. In production, call the API from your backend.

## Documentation

- [Integration guide](https://phone-verif.com/integration-guide)
- [API reference](docs/api-reference.md)
- [OpenAPI spec](openapi.yaml)
- [FAQ](docs/faq.md)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
