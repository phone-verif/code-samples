# API Reference

Authenticate every call with the `X-API-Key` header.

## POST https://api.phone-verif.com/start-verification

Starts the verification flow.

**Request Body:**

-   `session_id` (string, optional): A unique session ID for each user. Created randomly if omitted.
-   `provider` (string, optional): `whatsapp` (default) or `telegram`. `telegram` can't be combined with `flow=age`.

**Response:**

-   `session.validation_token` (string): A unique token for the verification flow.
-   `session.status` (string): The session status, `pending` at the start.
-   `session.provider` (string): `telegram`. Present on Telegram sessions only.
-   `whatsapp.deeplink` (string): A link that the user can use to complete the verification in WhatsApp. Also available as `whatsapp.qr_code_url` and `whatsapp.direct_link`.
-   `telegram` (object): Returned in place of `whatsapp` and `sms` on a Telegram session.
    -   `bot_username` (string): The username of the Telegram bot.
    -   `deeplink` (string): A tracked link that opens the bot.
    -   `qr_code_url` (string): A tracked link to encode as a QR code.
    -   `direct_link` (string): An untracked `t.me` link that opens the bot.

**Errors:**

-   `400`: Invalid parameters, including an unknown `provider` or `provider=telegram` with `flow=age`.
-   `503`: `TELEGRAM_UNAVAILABLE`, when `provider=telegram` was requested and Telegram is unavailable.

## POST https://api.phone-verif.com/check-verification-status

Checks the verification status.

**Request Body:**

-   `session_id` (string, required): The session ID that was used to start the verification flow.

**Response:**

-   `session.status` (string): The verification status, for example `pending`, `opened`, `verified` or `expired`.
-   `session.validated_phone_number` (string): The phone number that was verified, in digits with no `+`.
-   `session.provider` (string): `telegram`. Present on Telegram sessions only.
-   `session.telegram` (object): The Telegram account that completed the session. Present on verified `flow=phone` Telegram sessions only.
    -   `user_id` (integer): The numeric Telegram account ID. It isn't the Phone-Verif `user_id`.
    -   `username` (string or null)
    -   `first_name` (string or null)
    -   `last_name` (string or null)

## GET https://phone-verif.com/api/generate-qr

Generates a QR code.

**Query Parameters:**

-   `url` (string, required): The URL to encode in the QR code.

**Response:**

An SVG image of the QR code.
