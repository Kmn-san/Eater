import { useMutation } from "@tanstack/react-query";
import { createPaymentIntent } from "../lib/api";


const useCreatePaymentIntent = () => {
    return useMutation({
        mutationFn: createPaymentIntent,
    });
};

export default useCreatePaymentIntent;