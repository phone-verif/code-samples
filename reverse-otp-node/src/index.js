const axios = require('axios');

class ReverseOtp {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.phone-verif.com';
  }

  async startVerification(sessionId) {
    const response = await axios.post(`${this.baseUrl}/start-verification`, {
      session_id: sessionId,
    }, { headers: { 'X-API-Key': this.apiKey } });
    return response.data;
  }

  async checkVerification(sessionId) {
    const response = await axios.post(`${this.baseUrl}/check-verification-status`, {
      session_id: sessionId,
    }, { headers: { 'X-API-Key': this.apiKey } });
    return response.data;
  }
}

module.exports = ReverseOtp;
