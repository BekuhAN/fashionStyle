import { type BaseModel } from "./base-model";

export interface Service extends BaseModel<string>  {
    title: string;
    description: string;
    image: string;
    icon: string;
    content: string;
  }