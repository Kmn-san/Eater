import { useMutation } from "@tanstack/react-query"
import { createOrder } from "../lib/api"

const useCreateOrder = () => {
    return useMutation({
        mutationKey: ["orders"],
        mutationFn: createOrder
    })
}
export default useCreateOrder;