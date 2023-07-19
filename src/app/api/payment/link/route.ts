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

      if(err instanceof Error){
        return NextResponse.json({ link: err.message }, { status: 200 });
      }else{
        return { data: { attributes: { checkout_url: 'Failed to axios Paymongo link' } } }
      }

      
    }

    
  } catch (err) {
    if(err instanceof Error){
      return NextResponse.json({ link: err.message }, { status: 500 });
    }else{
      return { data: { attributes: { checkout_url: 'Failed at beginning of creation of Paymongo link' } } }
    }

  }
}