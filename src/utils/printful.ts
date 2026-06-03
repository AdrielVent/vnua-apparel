interface PrintfulRecipient {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code: string;
  country_code: string;
  zip: string;
  phone?: string;
  email?: string;
}

interface PrintfulOrderItem {
  variant_id: number;
  quantity: number;
}

interface CreateOrderPayload {
  recipient: PrintfulRecipient;
  items: PrintfulOrderItem[];
}

export async function createPrintfulOrder(payload: CreateOrderPayload) {
  const token = process.env.PRINTFUL_API_TOKEN;
  if (!token) {
    throw new Error('PRINTFUL_API_TOKEN environment variable is not defined');
  }

  const response = await fetch('https://api.printful.com/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      recipient: payload.recipient,
      items: payload.items,
      confirm: false, // Create as a draft first so the user can verify/approve it manually in Printful dashboard
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || 'Failed to create Printful order');
  }

  return data.result;
}
