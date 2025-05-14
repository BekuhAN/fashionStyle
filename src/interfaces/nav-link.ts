import { type BaseModel } from "./base-model";

export interface NavLink extends BaseModel  {
    title: string;
    path: string;
  }