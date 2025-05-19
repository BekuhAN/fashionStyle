import {type BaseModel} from './base-model';

export interface NewsItem extends BaseModel {
    title: string;
    date: string;
    image: string;
    content: string;
}