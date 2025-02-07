import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const isDev = process.env.NODE_ENV === "development";

const urlEndpoint = isDev 
  ? process.env.NEXT_PUBLIC_URL_ENDPOINT 
  : process.env.IMAGEKIT_PUBLIC_URL_ENDPOINT;

const publicKey = isDev 
  ? process.env.NEXT_PUBLIC_PUBLIC_KEY 
  : process.env.IMAGEKIT_PUBLIC_KEY;

const privateKey = process.env.PRIVATE_KEY;

if (!urlEndpoint || !publicKey || !privateKey) {
  throw new Error("Missing required ImageKit environment variables.");
}

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export async function GET() {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    return NextResponse.json(authParams);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate authentication parameters", details: error },
      { status: 500 }
    );
  }
}
