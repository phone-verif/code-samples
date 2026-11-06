# Integration Guide

This guide provides a step-by-step overview of how to integrate with the Reverse OTP service.

## 1. Get your API key

To get started, you will need an API key. You can get one by signing up on the [website](https://phone-verif.com).

## 2. Backend API

### Start the verification flow

To start the verification flow, you need to make a POST request to the `/start-verification` endpoint.

**Request:**

```
POST https://api.phone-verif.com/start-verification
Content-Type: application/json
X-API-Key: your_api_key

{
  "session_id": "user-123"
}
```

**Response:**

```json
{
  "session": {
    "validation_token": "some_validation_token",
    "status": "pending"
  },
  "whatsapp": {
    "deeplink": "https://t.phone-verif.com/qr/some_validation_token"
  }
}
```

### Check the verification status

To check the verification status, you need to make a POST request to the `/check-verification-status` endpoint.

**Request:**

```
POST https://api.phone-verif.com/check-verification-status
Content-Type: application/json
X-API-Key: your_api_key

{
  "session_id": "user-123"
}
```

**Response:**

```json
{
  "session": {
    "status": "verified",
    "validated_phone_number": "33612345678"
  }
}
```

### Verify through Telegram

Telegram is optional, and WhatsApp stays the default. Add `"provider": "telegram"` to `/start-verification` to verify the number through our Telegram bot.

**Request:**

```
POST https://api.phone-verif.com/start-verification
Content-Type: application/json
X-API-Key: your_api_key

{
  "session_id": "user-123",
  "provider": "telegram"
}
```

**Response:**

```json
{
  "session": {
    "validation_token": "some_validation_token",
    "status": "pending",
    "provider": "telegram"
  },
  "telegram": {
    "bot_username": "PhoneVerif_com_bot",
    "deeplink": "https://t.phone-verif.com/tg/some_validation_token",
    "qr_code_url": "https://t.phone-verif.com/tg/some_validation_token",
    "direct_link": "https://t.me/PhoneVerif_com_bot?start=some_validation_token"
  }
}
```

Show `telegram.deeplink` as a QR code or a button. The user opens the bot, presses Start and shares their own phone number. Then check the status as usual. On a verified `flow=phone` session, the response adds the Telegram account:

```json
{
  "session": {
    "status": "verified",
    "validated_phone_number": "33612345678",
    "provider": "telegram",
    "telegram": {
      "user_id": 123456789,
      "username": "alice",
      "first_name": "Alice",
      "last_name": "Martin"
    }
  }
}
```

A Telegram token only works in the bot, so it's refused on WhatsApp and SMS. `flow=age` isn't available with `provider=telegram`. If Telegram is unavailable, the call returns `503`. You can then call `/start-verification` again without `provider` to use WhatsApp.

## 3. QR Code API (Lovable)

To generate a QR code, you need to make a GET request to the `/api/generate-qr` endpoint on the Lovable frontend.

**Request:**

```
GET https://phone-verif.com/api/generate-qr?url=https://wa.me/1234567890?text=VERIFY-some_validation_token
```

**Response:**

An SVG image of the QR code.

## 4. Live Testing

You can use the following form to test the API endpoints live.

### Start Verification

<form id="start-verification-form">
  <label for="start-session-id">Session ID:</label>
  <input type="text" id="start-session-id" name="session_id" value="user-123">
  <br>
  <label for="start-api-key">API Key:</label>
  <input type="text" id="start-api-key" name="api_key" value="your_api_key">
  <br>
  <label for="start-provider">Provider:</label>
  <select id="start-provider" name="provider">
    <option value="whatsapp">WhatsApp</option>
    <option value="telegram">Telegram</option>
  </select>
  <br>
  <button type="submit">Start Verification</button>
</form>

**Response:**

<pre id="start-verification-response"></pre>

### Check Verification Status

<form id="check-verification-status-form">
  <label for="check-session-id">Session ID:</label>
  <input type="text" id="check-session-id" name="session_id" value="user-123">
  <br>
  <label for="check-api-key">API Key:</label>
  <input type="text" id="check-api-key" name="api_key" value="your_api_key">
  <br>
  <button type="submit">Check Verification Status</button>
</form>

**Response:**

<pre id="check-verification-status-response"></pre>

### Generate QR Code

<form id="generate-qr-code-form">
  <label for="qr-code-url">URL:</label>
  <input type="text" id="qr-code-url" name="url" value="https://wa.me/1234567890?text=VERIFY-some_validation_token">
  <br>
  <button type="submit">Generate QR Code</button>
</form>

**Response:**

<img id="qr-code-image" src="" alt="QR Code">

<script>
  document.getElementById('start-verification-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const sessionId = document.getElementById('start-session-id').value;
    const apiKey = document.getElementById('start-api-key').value;
    const provider = document.getElementById('start-provider').value;
    const response = await fetch('https://api.phone-verif.com/start-verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        session_id: sessionId,
        provider,
      }),
    });
    const data = await response.json();
    document.getElementById('start-verification-response').textContent = JSON.stringify(data, null, 2);
  });

  document.getElementById('check-verification-status-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const sessionId = document.getElementById('check-session-id').value;
    const apiKey = document.getElementById('check-api-key').value;
    const response = await fetch('https://api.phone-verif.com/check-verification-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        session_id: sessionId,
      }),
    });
    const data = await response.json();
    document.getElementById('check-verification-status-response').textContent = JSON.stringify(data, null, 2);
  });

  document.getElementById('generate-qr-code-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('qr-code-url').value;
    document.getElementById('qr-code-image').src = `https://phone-verif.com/api/generate-qr?url=${encodeURIComponent(url)}`;
  });
</script>
