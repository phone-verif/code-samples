# API Reference

## POST https://neru-5d5813f3-phone-verif-prod.euw1.runtime.vonage.cloud/start-verification

Starts the verification flow.

**Request Body:**

-   `session_id` (string, required): A unique session ID for each user.
-   `api_key` (string, required): Your API key.

**Response:**

-   `validation_token` (string): A unique token for the verification flow.
-   `whatsapp_url` (string): A WhatsApp URL that the user can use to complete the verification.

## POST https://neru-5d5813f3-phone-verif-prod.euw1.runtime.vonage.cloud/check-verification-status

Checks the verification status.

**Request Body:**

-   `session_id` (string, required): The session ID that was used to start the verification flow.
-   `api_key` (string, required): Your API key.

**Response:**

-   `status` (string): The verification status. Can be `pending`, `verified`, `failed`, or `expired`.
-   `validated_phone_number` (string): The phone number that was verified.

## GET https://phone-verif.com/api/generate-qr

Generates a QR code.

**Query Parameters:**

-   `url` (string, required): The URL to encode in the QR code.

**Response:**

An SVG image of the QR code.
