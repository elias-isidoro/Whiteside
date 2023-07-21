import { getAuthSession } from '@/lib/auth';
import { Payment } from '@/types/payment';
import axios, { AxiosResponse } from 'axios';
import { NextResponse } from 'next/server';
import { z } from 'zod';

interface FetchResponse {
  hasMore: boolean,
  data: Payment[]
}


export async function GET() {

  try {

    const session = await getAuthSession()

    if(!session?.user){
      return new Response('Unauthorized', {status: 401})
    }

    
    const {data: { data: payments }}: AxiosResponse<FetchResponse> = await axios.get(
      'https://api.paymongo.com/v1/payments',{
        auth: { 
          username: process.env.PAYMONGO_SECRET_KEY!, 
          password: ''
        },
        headers: { 
          Accept: 'application/json'
        }
      }
    )

    return NextResponse.json({ payments }, { status:200 })

  } catch (error) {
    
    if(error instanceof z.ZodError){
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not fetch payments', {status: 500})

  }
}