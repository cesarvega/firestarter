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
    name: string,
    active: string,
    description: string,
    smallDescription: string,
    cigarOrigin: string,
    strength: string,
    wrapperColor: string,
    wrapper: string,
    binder: string,
    filler: string,
    rolledBy: string,
    manufacturer: string,
    sku: string,
    quantitysku: string,
    shippingFee: string,
    extraShippingFee: string,
    price: number,
    boxOf: number,
    boxOfPrice: number,
    comparedPrice: string,
    taxRate: string,
    priceTaxExcl: string,
    priceTaxIncl: string,
    itemsInstock: string,
    priority: string,
    smokeRings: string,
    photos: string
}



