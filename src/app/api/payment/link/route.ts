import { CreatePaymongoLinkValidator, CreatePaymongoLinkPayload } from '@/lib/validators/paymongo';
import axios from 'axios';
import { NextResponse } from 'next/server';

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

    const body = await req.json();

    const payload: CreatePaymongoLinkPayload = CreatePaymongoLinkValidator.parse(body);
    
    try{
      const { data: { attributes: { checkout_url = '/' } } }: PaymongoLink = await axios.post(
        'https://api.paymongo.com/v1/links',
        { 
          data: { 
            attributes: {
              amount: payload.amount,
              description: payload.description,
              remarks: payload.remarks
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
  
      return NextResponse.json({ link: checkout_url }, { status: 200 });

    }catch (err) {

      return NextResponse.json({ link: 'failed to request for a link' }, { status: 200 });
      
    }

  } catch (err) {
    
    return NextResponse.json({ link: 'Invalid payload' }, { status: 500 });

  }
}