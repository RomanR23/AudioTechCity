UPDATE tech_users
SET password = ($1)
WHERE id = ($2)