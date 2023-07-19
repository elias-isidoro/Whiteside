import axios, { AxiosResponse } from "axios";
import { CreatePaymongoLinkPayload } from "./validators/paymongo";

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

export async function createPaymongoLink({amount, description, remarks}:CreatePaymongoLinkPayload): Promise<PaymongoLink> {

  try {
    const response: AxiosResponse<PaymongoLink> = await axios.post(
      'https://api.paymongo.com/v1/links',
      {
        data: {
          attributes: {
            amount,
            description,
            remarks,
          },
        },
      },
      {
        auth: {
          username: process.env.PAYMONGO_SECRET_KEY!,
          password: '',
        },
        headers: {
          Accept: 'application/json',
          Authorization: 'Basic c2tfdGVzdF9XeVBOYU5RSm84TGVTdnhnZHVDUGtjanM6',
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;

  } catch (error) {

    throw new Error('Failed to create Paymongo link');
    
  }
}