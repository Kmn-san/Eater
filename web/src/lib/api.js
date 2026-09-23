import { axiosInstance } from "./axios"

export const fetchRestaurant = async ({ restaurantCode, tableCode }) => {
    const response = await axiosInstance.post(`/sessions/${restaurantCode}/${tableCode}`)
    return response.data
}