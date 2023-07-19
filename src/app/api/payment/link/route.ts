import { createPaymongoLink } from '@/lib/paymongo';
import { CreatePaymongoLinkValidator, CreatePaymongoLinkPayload } from '@/lib/validators/paymongo';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload: CreatePaymongoLinkPayload = CreatePaymongoLinkValidator.parse(body);
    
    // Call the createPaymongoLink function
    const { data: { attributes: { checkout_url = '/' } } } = await createPaymongoLink(payload);

    return NextResponse.json({ link: checkout_url }, { status: 200 });
    
  } catch (err) {
    return new Response('Could not get payment link', { status: 500 });

  }
}