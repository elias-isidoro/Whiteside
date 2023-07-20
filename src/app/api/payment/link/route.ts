import { getAuthSession } from '@/lib/auth';
import { CreatePaymongoLinkValidator, CreatePaymongoLinkPayload } from '@/lib/validators/paymongo';
import axios, { AxiosResponse } from 'axios';
import { NextResponse } from 'next/server';
import { z } from 'zod';

interface PaymongoLink {
  data: {
    id: string;
    type: string;
    attributes: {
      amount: number;
      archived: boolean;
      currency: string;
      description: string;
      livemode: boolean;
      fee: number;
      remarks: string;
      status: string;
      tax_amount: number | null;
      taxes: any[];
      checkout_url: string;
      reference_number: string;
      created_at: number;
      updated_at: number;
      payments: any[];
    };
  };
}

export async function POST(req: Request) {

  try {

    const session = await getAuthSession()

    if(!session?.user){
      return new Response('Unauthorized', {status: 401})
    }

    const body = await req.json();

    const payload: CreatePaymongoLinkPayload = CreatePaymongoLinkValidator.parse(body);
    
    const {data: { data: { attributes: { checkout_url } } }}: AxiosResponse<PaymongoLink> = await axios.post(
      'https://api.paymongo.com/v1/links',
      {
        "data": {
          "attributes": {
            "amount": payload.amount,
            "description": payload.description,
            "remarks": payload.remarks
          }
        }
      },
      {
        auth: { 
          username: process.env.PAYMONGO_SECRET_KEY!, 
          password: ''
        },
        headers: { 
          Accept: 'application/json', 
          Authorization:'Basic c2tfdGVzdF9XeVBOYU5RSm84TGVTdnhnZHVDUGtjanM6',
          'Content-Type': 'application/json',
        },
      }
    )
  
    return NextResponse.json({ link: checkout_url }, { status:200 })

  } catch (error) {
    
    if(error instanceof z.ZodError){
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not create payment link', {status: 500})

  }
}