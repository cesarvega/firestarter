export interface Customer {
    first: string,
    last: string,
    email: string,
    address: string,
    shippingAddress?: string,
    address2: string,
    shippingAddress2?: string,
    state: string,
    shippingState?: string,
    contry: string,
    shippingContry?: string,
    zipcode: number,
    shippingzipcode?: number,
    phoneNumber?: number,
    cradNUmber: number,
    expDate: string,
    ccv: string,
    cardType: string,
    companyName?: string
}

export interface Order {
    orderDate: string,
    customerId: string,
    dueDate: string,
    totalDue: string,
    totalPaid: string,
    products: [{ product: Product, quantity: "0" }],
    clientId: string,
    total: number,
    subtotal: number,
    totaltax: number,
    discount: number,
    orderNotes: string,
}

export interface Product {
    uid?: string;
    name?: string;
    active?: boolean;
    description?: string;
    smallDescription?: string;
    badgeNumber?: number;
    like?: boolean;
    cigarOrigin?: string;
    cigarShape?: string;
    brands?: string;
    strength?: string;
    wrapperColor?: string;
    wrapper?: string;
    binder?: string;
    filler?: string;
    rolledBy?: string;
    manufacturer?: string;
    sku?: string; 
    quantitysku?: number; 
    shippingFee?: number;
    extraShippingFee?: number;
    price?: number;
    boxOf?: number;
    boxOfPrice?: number;
    comparedPrice?: number;
    taxRate?: number;
    priceTaxExcl?: number;
    priceTaxIncl?: number;
    itemsInstock?: number;
    priority?: number;
    smokeRings?: number;
    photos?: Photos[];
  }
  
  export interface Photos {
    description?: string;
    url?: string;
  }
  
  export interface item {
    itemUnitPrice: number;
    itemQuantity: number;
    itemTotal: number;
    itleLiked: boolean;    
  }
  
  export interface OrderCalc {
    orderTotal: number;
    items: item[];
    orderDate: Date;
    customerId: string;
  }
  

