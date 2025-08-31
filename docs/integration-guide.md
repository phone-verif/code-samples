# Integration Guide

This guide provides a step-by-step overview of how to integrate with the Reverse OTP service.

## 1. Get your API key

To get started, you will need an API key. You can get one by signing up on the [website](https://phone-verif.com).

## 2. Start the verification flow

To start the verification flow, you need to make a POST request to the `/api/start-verification` endpoint.

**Request:**

```
POST /api/start-verification
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

## 3. Display the QR code or WhatsApp link

Once you have received the `validation_token` and `whatsapp_url`, you need to display the QR code or the WhatsApp link to the user.

The user will then scan the QR code or click on the WhatsApp link to complete the verification.

## 4. Check the verification status

To check the verification status, you need to make a POST request to the `/api/check-verification-status` endpoint.

**Request:**

```
POST /api/check-verification-status
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
