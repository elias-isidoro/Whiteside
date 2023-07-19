import { createPaymongoLink } from '@/lib/paymongo';
import { CreatePaymongoLinkValidator, CreatePaymongoLinkPayload } from '@/lib/validators/paymongo';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload: CreatePaymongoLinkPayload = CreatePaymongoLinkValidator.parse(body);
    
    // Call the createPaymongoLink function
    try{
      const { data: { attributes: { checkout_url = '/' } } } = await createPaymongoLink(payload);
      return NextResponse.json({ link: checkout_url }, { status: 200 });
    }catch (err) {
      return NextResponse.json({ link: 'fail to create' }, { status: 200 });
    }

    
  } catch (err) {

    
    return NextResponse.json({ link: `fail at beginning` }, { status: 200 });
    return new Response(JSON.stringify(err), { status: 500 });
  }
}