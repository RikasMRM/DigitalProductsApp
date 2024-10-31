export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  coverPhotos: string[];
  benefits: Benefit[];
  additionalDetails: AdditionalDetail[];
}

export interface Benefit {
  id: string;
  text: string;
}

export interface AdditionalDetail {
  id: string;
  attribute: string;
  value: string;
}
