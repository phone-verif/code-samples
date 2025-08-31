import os
import requests

class ReverseOtp:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = 'https://phone-verif.com/api'

    def start_verification(self, session_id):
        response = requests.post(f'{self.base_url}/start-verification', json={
            'session_id': session_id,
            'api_key': self.api_key,
        })
        response.raise_for_status()
        return response.json()

    def check_verification(self, session_id):
        response = requests.post(f'{self.base_url}/check-verification-status', json={
            'session_id': session_id,
            'api_key': self.api_key,
        })
        response.raise_for_status()
        return response.json()
