import { type BaseModel } from "./base-model";
import type { CatalogItemType } from "./catalog-item";

export interface Category extends BaseModel  {
    title: string;
    description: string;
    products?: Array<CatalogItemType> ;
  }