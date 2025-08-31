import os
import time
from dotenv import load_dotenv
from src.reverse_otp import ReverseOtp

load_dotenv()

api_key = os.getenv('REVERSE_OTP_API_KEY')
if not api_key:
    print('REVERSE_OTP_API_KEY not found in .env file')
    exit(1)

reverse_otp = ReverseOtp(api_key)

def main():
    session_id = 'user-123'  # Replace with a unique session ID for each user

    try:
        # Start the verification flow
        start_response = reverse_otp.start_verification(session_id)
        print('Start verification response:', start_response)

        # In a real application, you would now display the QR code or the WhatsApp link to the user
        # and wait for them to complete the verification.

        # For this example, we will wait for 10 seconds before checking the status.
        print('Waiting for 10 seconds...')
        time.sleep(10)

        # Check the verification status
        check_response = reverse_otp.check_verification(session_id)
        print('Check verification response:', check_response)

    except Exception as e:
        print('Error:', e)

if __name__ == '__main__':
    main()
