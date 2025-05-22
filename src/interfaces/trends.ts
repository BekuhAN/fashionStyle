import { type BaseModel } from "./base-model";
import type { CatalogItemType } from "./catalog-item";

export interface TrendsItem extends BaseModel<string>  {
    title: string,
    image: string,
    description: string,
    catalog?: CatalogItemType[]
  }