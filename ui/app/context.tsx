import { createContext } from "react";
import UrlRepository from "./repository";
import UrlService from "./service";

const API_BASE_URL = "http://localhost:8080";
export const API_URL = `${API_BASE_URL}/shorten`;

export function createUrlService() {
  return new UrlService(new UrlRepository(API_URL));
}

export const UrlServiceContext = createContext(createUrlService());
