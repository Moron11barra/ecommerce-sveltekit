// @ts-ignore
export function toProduct(rows) {
    // @ts-ignore
    return rows.map(row => {
        return {
            id: row.id,
            name: row.name,
            description: row.description,
            price: row.price,
            imageUrl: row.image_url,
            paymentUrl: row.stripe_payment_url
        }
    });
}