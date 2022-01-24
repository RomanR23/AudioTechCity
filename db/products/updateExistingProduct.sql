UPDATE tech_cart
SET product_quantity = ($1)
WHERE product_id = ($2)
