import { useQuery } from "@tanstack/react-query";
import { fetchDetail } from "../lib/api";

const useItemDetail = (restaurantCode, itemId) => {
    return useQuery({
        queryKey: ["item", itemId],
        queryFn: () => fetchDetail(restaurantCode, itemId),
        select: (data) => data.result
    })
}

export default useItemDetail;