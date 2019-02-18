import { Address } from "../shared/address";
import { Dish } from "../shared/dish";

export class Restaurant{
    id: number;
    name: string;
    category: string;
    featured: boolean; 
    costfor2: number;
    workingHrsFrom:string;
    workingHrsTo: string;
    cuisine: string;
    address: Address;
    nooftables: number;
    email: string;
    phone: string;
    dishes: Dish[];
} 