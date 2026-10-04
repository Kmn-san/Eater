import { axiosInstance } from "./axios"

export const fetchRestaurant = async ({ restaurantCode, tableCode }) => {
    const response = await axiosInstance.post(`/sessions/${restaurantCode}/${tableCode}`)
    return response.data
}

export const fetchMenu = async (restaurantCode) => {
    const response = await axiosInstance.get(`/menu/${restaurantCode}`)
    return response.data
}

export const fetchDetail = async (restaurantCode, itemId) => {
    const response = await axiosInstance.get(`/menu/${restaurantCode}/${itemId}`)
    return response.data
}

export const createOrder = async (items) => {
    const response = await axiosInstance.post(`/orders`, items)
    return response.data
}

export const createPaymentIntent = async (orderId) => {
    const response = await axiosInstance.post(
        `/payment/create-payment-intent/${orderId}`,

    );

    return response.data;
};

export const fetchOrder = async () => {
    const response = await axiosInstance.get(`/orders/latest`)
    return response.data
}

export const fetchOrderById = async (orderId) => {
    const response = await axiosInstance.get(`/orders/${orderId}`)
    return response.data
}

export const checkAvailable = async (restaurantCode, itemIds) => {

    const response = await axiosInstance.post(`menu/${restaurantCode}/checkAvailable`, { itemIds })
    return response.data
}