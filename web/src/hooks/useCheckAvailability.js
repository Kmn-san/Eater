
import { useQuery } from "@tanstack/react-query"
import { checkAvailable } from "../lib/api"

const useCheckAvailability = ({ restaurantCode, itemIds }) => {
    return useQuery({
        queryKey: ["availability", restaurantCode, itemIds],
        queryFn: () => checkAvailable(restaurantCode, itemIds),
        enabled: itemIds.length > 0
    })
}

export default useCheckAvailability