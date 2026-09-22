import crypto from "crypto"

export const generateOrderNumber = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let order_number = "";

    for (let i = 0; i < 5; i++) {
        order_number += characters.charAt(
            crypto.randomInt(characters.length)
        );
    }

    return order_number;
}