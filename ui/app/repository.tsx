import axios from "axios";

export default class UrlRepository {
  readonly apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async createShortUrl(url: string) {
    return await axios.post(this.apiUrl, { url: url });
  }

  async retrieveOriginalUrl(shortCode: string) {
    return await axios.get(`${this.apiUrl}/${shortCode}`);
  }

  async updateShortUrl(shortCode: string, url: string) {
    return await axios.put(`${this.apiUrl}/${shortCode}`, { url: url });
  }

  async deleteShortUrl(shortCode: string) {
    return await axios.delete(`${this.apiUrl}/${shortCode}`);
  }

  async getUrlStatistics(shortCode: string) {
    return await axios.get(`${this.apiUrl}/${shortCode}/stats`);
  }

  async createCustomShortUrl(shortCode: string, url: string) {
    return await axios.post(`${this.apiUrl}/custom`, {
      shortCode: shortCode,
      url: url,
    });
  }
}
