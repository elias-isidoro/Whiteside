import { CreateImageKitCredsPayload } from '@/lib/validators/imagekit';
import { NextResponse } from 'next/server';

export async function GET() {

  try{

    const credentials: CreateImageKitCredsPayload = {
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
      authenticationEndpoint: process.env.IMAGEKIT_AUTH_ENDPOINT!,
    }

    return NextResponse.json(credentials)

  }catch(err){

    return new Response('Could not get credentials', {status: 500})

  }
  
}