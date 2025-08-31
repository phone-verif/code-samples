require('dotenv').config();
const ReverseOtp = require('../src');

const apiKey = process.env.REVERSE_OTP_API_KEY;
if (!apiKey) {
  console.error('REVERSE_OTP_API_KEY not found in .env file');
  process.exit(1);
}

const reverseOtp = new ReverseOtp(apiKey);

async function main() {
  const sessionId = 'user-123'; // Replace with a unique session ID for each user

  try {
    // Start the verification flow
    const startResponse = await reverseOtp.startVerification(sessionId);
    console.log('Start verification response:', startResponse);

    // In a real application, you would now display the QR code or the WhatsApp link to the user
    // and wait for them to complete the verification.

    // For this example, we will wait for 10 seconds before checking the status.
    console.log('Waiting for 10 seconds...');
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Check the verification status
    const checkResponse = await reverseOtp.checkVerification(sessionId);
    console.log('Check verification response:', checkResponse);

  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

main();
