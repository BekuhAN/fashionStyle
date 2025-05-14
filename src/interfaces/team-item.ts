import { type BaseModel } from "./base-model";

export interface TeamItem extends BaseModel  {
    name: string;
    image: string;
    position: string;
  }