import { type BaseModel } from "./base-model";

export interface Comment extends BaseModel  {
    name: string;
    image: string;
    text: string;
  }