import { NextRequest, NextResponse } from "next/server";
import { UrlService } from "../service";
import { validateShortCode } from "../util";
import { UrlRepository } from "../repository";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> },
) {
  const { shortCode } = await params;
  if (!validateShortCode(shortCode)) {
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_UI_BASE_URL}/`, request.url),
    );
  }
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL_SERVER;
    if (!apiBaseUrl) {
      throw new Error("API URL for server-side cannot be empty");
    }
    const apiUrl = `${apiBaseUrl}/shorten`;
    // create a new url service and repository with server-side api address because the handler is called from the server, not client
    const urlService = new UrlService(new UrlRepository(apiUrl));
    const { url } = await urlService.retrieveOriginalUrl(shortCode);
    return NextResponse.redirect(new URL(url));
  } catch (error) {
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_UI_BASE_URL}/`, request.url),
    );
  }
}
