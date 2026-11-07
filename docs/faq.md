# FAQ

**Q: What is Reverse OTP?**

A: Reverse OTP is a phone verification method that uses WhatsApp to verify users. Instead of sending an SMS OTP to the user, the app itself sends a pre-filled message, and the server verifies the sender.

**Q: How is Reverse OTP more secure than SMS OTP?**

A: Reverse OTP is more secure than SMS OTP because it is not vulnerable to SIM swapping attacks. With Reverse OTP, the verification is tied to the user's WhatsApp account, which is more secure than their phone number.

**Q: Can users verify through Telegram instead of WhatsApp?**

A: Yes. Every session is open to Telegram by default: show `telegram.deeplink` from the `/start-verification` response. The user opens our Telegram bot, presses Start and shares their own phone number. You receive the same webhook and status result as on WhatsApp, and it uses the same credits. To lock a session to one channel, send `provider=telegram` or `provider=whatsapp`.

**Q: How much does Reverse OTP cost?**

A: Reverse OTP is generally cheaper than SMS OTP. For more information, please refer to our [pricing page](https://phone-verif.com/pricing).
