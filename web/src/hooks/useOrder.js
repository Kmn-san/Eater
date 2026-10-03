import { useQuery } from "@tanstack/react-query"
import { fetchOrder, fetchOrderById } from "../lib/api"

export const useOrder = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: () => fetchOrder()
    })
}

export const useOrderDetail = (orderId) => {
    return useQuery({
        queryKey: ["order", orderId],
        queryFn: () => fetchOrderById(orderId),
        enabled: !!orderId,
    })
}