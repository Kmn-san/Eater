import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "../lib/api";

const useCreateCheckoutSession = () => {
    return useMutation({
        mutationFn: createCheckoutSession,
    });
};

export default useCreateCheckoutSession;