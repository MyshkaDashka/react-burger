export type TIngredientItem = {
    _id: string,
    name: string,
    type: "bun" | "sauce" | "main",
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
}

export type TUserData = {
    email: string;
    password?: string;
    name: string;
}

export type TTokenResponce = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}

export type TIngredientListResponce = {
    success: boolean;
    data: Array<TIngredientItem>
}

export type TResetPasswordResponce = {
    success: boolean;
    message: string
}

export type TRegisterResponce = {
    success: boolean;
    user: {
        email: string,
        name: string
    },
    accessToken: string,
    refreshToken: string
}

export type TLogoutResponce = {
    success: boolean;
    message: string
}

export type TOrderResponce = {
    success: boolean;
    name: string,
    order: {
        number: number
    },
}

export type TAuthUserResponce = {
    success: boolean;
    user: {
        email: string,
        name: string
    },
}

export interface IOrderFeedItem {
    ingredients: Array<string>;
    _id: string;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export type TOrder = {
    success: boolean,
    orders: Array<IOrderFeedItem>,
    total: number,
    totalToday: number
}
