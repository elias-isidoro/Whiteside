import { ImageKitAuthValidator } from '@/lib/validators/imagekit';
import ImageKit from 'imagekit';
import { NextResponse } from 'next/server'

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
});

export async function GET() {
  try{

    const authenticationParameters = ImageKitAuthValidator.parse(imagekit.getAuthenticationParameters())
    return NextResponse.json(authenticationParameters)

  }catch(err){

    return new Response('Could not get token', {status: 500})

  }
  
}