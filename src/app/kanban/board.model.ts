export interface Board {
  id?: string;
  title?: string;
  priority?: number;
  tasks?: Task[];
}

export interface Task {
  description?: string;
  label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}

export interface Product {
  id?: string;
  name?: string;
  active?: boolean;
  description?: string;
  smallDescription?: string;
  cigarOrigin?: string;
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
