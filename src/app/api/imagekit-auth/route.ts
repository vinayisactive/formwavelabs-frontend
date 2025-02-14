import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

if (!urlEndpoint || !publicKey || !privateKey) {
  throw new Error(`
    Missing ImageKit environment variables. 
    Check if IMAGEKIT_PUBLIC_URL_ENDPOINT, IMAGEKIT_PUBLIC_KEY, 
    and IMAGEKIT_PRIVATE_KEY are set in your environment.
  `);
}

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

export async function GET() {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    return NextResponse.json(authParams);
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed", details: error },
      { status: 500 }
    );
  }
}

export const DELETE = async (req: NextRequest) => {
  const { fileId } = await req.json();

  try {
    await imagekit.deleteFile(fileId);
    return NextResponse.json(
      {
        message: "Image deleted Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete image", details: error },
      { status: 500 }
    );
  }
};
