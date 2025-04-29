import { CategoryItem } from "../categories/categories.type";

export enum CART_ACTION_TYPES{
    SET_IS_CART_OPEN= 'SET_IS_CART_OPEN',
    SET_CART_ITEMS= 'SET_CART_ITEMS',
    SET_IS_POPUP_OPEN= 'SET_IS_POPUP_OPEN',
}

export type CartItem= CategoryItem & {
    quantity: number
}