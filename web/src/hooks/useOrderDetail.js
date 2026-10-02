import { useQuery } from "@tanstack/react-query"
import { fetchOrderById } from "../lib/api"

const useOrderDetail = (orderId) => {
    return useQuery({
        queryKey: ["order", orderId],
        queryFn: () => fetchOrderById(orderId),
        enabled: !!orderId,
    })
}

export default useOrderDetail;