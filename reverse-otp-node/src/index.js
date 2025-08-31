const axios = require('axios');

class ReverseOtp {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://phone-verif.com/api';
  }

  async startVerification(sessionId) {
    const response = await axios.post(`${this.baseUrl}/start-verification`, {
      session_id: sessionId,
      api_key: this.apiKey,
    });
    return response.data;
  }

  async checkVerification(sessionId) {
    const response = await axios.post(`${this.baseUrl}/check-verification-status`, {
      session_id: sessionId,
      api_key: this.apiKey,
    });
    return response.data;
  }
}

module.exports = ReverseOtp;
