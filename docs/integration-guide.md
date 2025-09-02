# Integration Guide

This guide provides a step-by-step overview of how to integrate with the Reverse OTP service.

## 1. Get your API key

To get started, you will need an API key. You can get one by signing up on the [website](https://phone-verif.com).

## 2. Backend API (Vonage)

### Start the verification flow

To start the verification flow, you need to make a POST request to the `/start-verification` endpoint on the Vonage backend.

**Request:**

```
POST https://neru-5d5813f3-phone-verif-prod.euw1.runtime.vonage.cloud/start-verification
Content-Type: application/json

{
  "session_id": "user-123",
  "api_key": "your_api_key"
}
```

**Response:**

```json
{
  "validation_token": "some_validation_token",
  "whatsapp_url": "https://wa.me/1234567890?text=VERIFY-some_validation_token"
}
```

### Check the verification status

To check the verification status, you need to make a POST request to the `/check-verification-status` endpoint on the Vonage backend.

**Request:**

```
POST https://neru-5d5813f3-phone-verif-prod.euw1.runtime.vonage.cloud/check-verification-status
Content-Type: application/json

{
  "session_id": "user-123",
  "api_key": "your_api_key"
}
```

**Response:**

```json
{
  "status": "verified",
  "validated_phone_number": "+1234567890"
}
```

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
    const response = await fetch('https://neru-5d5813f3-phone-verif-prod.euw1.runtime.vonage.cloud/start-verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        api_key: apiKey,
      }),
    });
    const data = await response.json();
    document.getElementById('start-verification-response').textContent = JSON.stringify(data, null, 2);
  });

  document.getElementById('check-verification-status-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const sessionId = document.getElementById('check-session-id').value;
    const apiKey = document.getElementById('check-api-key').value;
    const response = await fetch('https://neru-5d5813f3-phone-verif-prod.euw1.runtime.vonage.cloud/check-verification-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        api_key: apiKey,
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
