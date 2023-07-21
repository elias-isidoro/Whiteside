export interface Payment {
  id: string;
  type: string;
  attributes: {
    access_url: null;
    amount: number;
    balance_transaction_id: string;
    billing: {
      address: {
        city: string;
        country: string;
        line1: string;
        line2: string;
        postal_code: string;
        state: string;
      };
      email: string;
      name: string;
      phone: string;
    };
    currency: string;
    description: string;
    disputed: boolean;
    external_reference_number: string;
    fee: number;
    foreign_fee: number;
    livemode: boolean;
    net_amount: number;
    origin: string;
    payment_intent_id: string;
    payout: null;
    source: {
      id: string;
      type: string;
      brand: string;
      country: string;
      last4: string;
    };
    statement_descriptor: string;
    status: string;
    tax_amount: null;
    metadata: {
      pm_reference_number: string;
    };
    refunds: any[];
    taxes: any[];
    available_at: number;
    created_at: number;
    credited_at: number;
    paid_at: number;
    updated_at: number;
  };
}