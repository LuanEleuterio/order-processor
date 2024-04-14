interface Products {
  product_id: number;
  value: string;
}

interface Orders {
  order_id: number;
  date: string;
  total: string;
  products: Products[];
}

export class OrderResponseDTO {
  private user_id: number;
  private name: string;
  private orders: Orders[];
}
