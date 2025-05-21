import { type BaseModel } from "./base-model";

export interface CatalogItemType extends BaseModel<string>  {
    title: string;
    info: string;
    image: string[];
    price: number;
    oldPrice: number;
    categoryId: number;
    trendId: number;
    new: boolean;
    popular: boolean;
    measurements: string;
    care: string,
    count?: number
  }