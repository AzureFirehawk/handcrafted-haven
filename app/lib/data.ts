import postgres, { Sql } from "postgres";
import {
  ProductWithSeller,
  Product,
} from "./definitions";

const sql: Sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

/* ======================
   PRODUCTS
====================== */

// Get all products (for listing page)
export async function fetchProducts(): Promise<ProductWithSeller[]> {
  try {
    const data = await sql<ProductWithSeller[]>`
      SELECT 
        products.id,
        products.name,
        products.description,
        products.price,
        products.image,
        products.category,
        products.created_at,
        sellers.name AS seller_name,
        sellers.email AS seller_email
      FROM products
      JOIN sellers ON products.seller_id = sellers.id
      ORDER BY products.created_at DESC
    `;

    return data.map((row) => ({
      ...row,
      price: Number(row.price),
    })) as ProductWithSeller[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products.");
  }
}

// Get single product by ID
export async function fetchProductById(id: string): Promise<ProductWithSeller | null> {
  try {
    const data = await sql<ProductWithSeller[]>`
      SELECT 
        products.id,
        products.name,
        products.description,
        products.price,
        products.image,
        products.category,
        products.created_at,
        sellers.name AS seller_name,
        sellers.email AS seller_email
      FROM products
      JOIN sellers ON products.seller_id = sellers.id
      WHERE products.id = ${id}
      LIMIT 1
    `;

    return data[0]
  ? {
      ...data[0],
      price: Number(data[0].price),
    }
  : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch product.");
  }
}

/* ======================
   USERS
====================== */

export async function fetchUserByEmail(email: string) {
  try {
    const data = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user.");
  }
}