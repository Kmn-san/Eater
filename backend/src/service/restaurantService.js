import { query } from "../utlis/db.js"

export const verifyRestaurantAndTable = async (restaurant_code, table_code) => {
    const { rows } = await query(`
        SELECT 
            t.id AS table_id,
            r.id AS restaurant_id,
            r.name
        FROM restaurant r
        JOIN restaurant_table t
            ON r.id = t.restaurant_id
        WHERE r.restaurant_code = $1
            AND t.table_code = $2
            AND t.is_active = true
            AND r.is_active = true
        `, [restaurant_code, table_code])
    return rows[0]
}