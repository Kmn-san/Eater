export const formatPrice = (cents) => {
    return `RM ${(cents / 100).toFixed(2)}`;
};