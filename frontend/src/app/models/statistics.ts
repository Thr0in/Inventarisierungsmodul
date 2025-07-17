
/**
 * Statistics model interface.
 * Represents the structure of statistics data returned from the backend.
 * Includes total orders, total price, and an array of user order statistics.
 */
export interface Statistics {
    totalOrders: number;
    totalPrice: number;
    names: [
        {
            name: string;
            quantity: number;
            orderPrice: number;
        }
    ]
}
