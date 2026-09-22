import { query } from "../utlis/db.js"
import crypto from "crypto";

export const createGuestSession = async (table_id) => {
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
    const { rows } = await query(`
        INSERT INTO guest_sessions
        (token_hash,table_id)
        VALUES
        ($1,$2)
        RETURNING *
        `, [tokenHash, table_id])
    return {
        session: rows[0],
        token
    }
}

export const findSession = async (token) => {
    const tokenHash = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
    const { rows } = await query(`
        SELECT
            g.id AS session_id,
            g.table_id AS table_id,
            t.restaurant_id,
            g.expired_at
            
        FROM guest_sessions g
        JOIN restaurant_table t
            ON t.id = g.table_id 
        WHERE g.token_hash = $1 
        `, [tokenHash])
    return rows[0];
}