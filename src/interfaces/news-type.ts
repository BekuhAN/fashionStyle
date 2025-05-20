import {type BaseModel} from './base-model';

export interface NewsType extends BaseModel {
    title: string;
    date: string;
    image: string;
    content: string;
}