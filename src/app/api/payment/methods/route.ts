import { NextResponse } from 'next/server';

export async function GET() {

  try{

    console.log()
    
    return NextResponse.json({methods:''})

  }catch(err){

    console.log(err)
    
    return new Response('Could not get payment methods', {status: 500})

  }
  
}