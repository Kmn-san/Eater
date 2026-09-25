import { useQuery } from "@tanstack/react-query";
import { fetchMenu } from "../lib/api";

const useMenu = (restaurantCode) => {
    return useQuery({
        queryKey: ["menu", restaurantCode],
        queryFn: () => fetchMenu(restaurantCode),
        select: (data) => data.result
    })
}

export default useMenu;