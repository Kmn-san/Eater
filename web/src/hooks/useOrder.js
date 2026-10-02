import { useQuery } from "@tanstack/react-query"
import { fetchOrder } from "../lib/api"

const useOrder = () => {
    return useQuery({
        queryKey: ["order"],
        queryFn: () => fetchOrder()
    })
}

export default useOrder;