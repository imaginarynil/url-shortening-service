import { NextRequest, NextResponse } from "next/server";
import { urlService } from "../service";
import { validateShortCode } from "../util";

export async function GET(
  request: NextRequest,
  { params }: { params: { shortCode: string } },
) {
  const { shortCode } = await params;
  if (!validateShortCode(shortCode)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  try {
    const { url } = await urlService.retrieveOriginalUrl(shortCode);
    return NextResponse.redirect(new URL(url));
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
