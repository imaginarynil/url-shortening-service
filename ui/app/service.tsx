import UrlRepository from "./repository";

export default class UrlService {
  readonly urlRepository: UrlRepository;

  constructor(urlRepository: UrlRepository) {
    this.urlRepository = urlRepository;
  }

  async createShortUrl(url: string) {
    try {
      const res = await this.urlRepository.createShortUrl(url);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async retrieveOriginalUrl(shortCode: string) {
    try {
      const res = await this.urlRepository.retrieveOriginalUrl(shortCode);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateShortUrl(shortCode: string, url: string) {
    try {
      const res = await this.urlRepository.updateShortUrl(shortCode, url);
      return res.data;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  async deleteShortUrl(shortCode: string) {
    try {
      const res = await this.urlRepository.deleteShortUrl(shortCode);
      return res.data;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  async getUrlStatistics(shortCode: string) {
    try {
      const res = await this.urlRepository.getUrlStatistics(shortCode);
      return res.data;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  async createCustomShortUrl(shortCode: string, url: string) {
    try {
      const res = await this.urlRepository.createCustomShortUrl(shortCode, url);
      return res.data;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
}
