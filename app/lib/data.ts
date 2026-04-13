import postgres, { Sql } from "postgres";
import {
  ProductWithSeller,
  Product,
  Seller,
  SellerProfile,
  SellerProduct,
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
        products.seller_id,
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
        products.seller_id,
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

/* ======================
   SELLERS
====================== */

// app/lib/data.ts

export async function fetchProductsBySellerEmail(email: string) {
  try {
    const data = await sql`
      SELECT products.* FROM products
      JOIN sellers ON products.seller_id = sellers.id
      WHERE sellers.email = ${email}
      ORDER BY products.created_at DESC
    `;
    
    return data.map((row) => ({
      ...row,
      price: Number(row.price),
    })) as Product[];
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}
export async function fetchAllSellers(): Promise<SellerProfile[]> {
  try {
    const data = await sql<SellerProfile[]>`
      SELECT 
        s.id,
        s.name,
        s.avatar,
        s.email,
        s.bio,
        s.location,
        s.created_at AS joined,
        COUNT(p.id) AS "productsCount",
        0 AS rating -- placeholder until you implement seller ratings
      FROM sellers s
      LEFT JOIN products p ON p.seller_id = s.id
      GROUP BY s.id
      ORDER BY s.name
    `;

    // Convert numeric fields
    return data.map((row) => ({
      ...row,
      productsCount: Number(row.productsCount),
      rating: Number(row.rating),
      joined: row.joined, // leave as string for now
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch sellers.");
  }
}

export async function fetchSellerByEmail(email: string) {
  try {
    const data = await sql`
      SELECT * FROM sellers WHERE email = ${email}
    `;
    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch seller.");
  }
}

export async function fetchSellerProfile(id: string): Promise<SellerProfile | null> {
  console.log("Seller ID:", id);
  if (!id) {
    console.error("❌ fetchSellerProfile called with undefined id");
    return null;
  }
  try {
    const sellerData = await sql<Seller[]>`
      SELECT * FROM sellers WHERE id = ${id}
    `;

    if (!sellerData[0]) return null;

    const productData = await sql<Product[]>`
      SELECT id, name, price, image 
      FROM products 
      WHERE seller_id = ${id}
    `;

    // 🔥 Transform products to match SellerProduct
    const products: SellerProduct[] = productData.map((p) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      image: p.image ?? null,
    }));

    return {
      id: sellerData[0].id,
      name: sellerData[0].name,
      email: sellerData[0].email,
      avatar: sellerData[0].avatar ?? null,
      bio: sellerData[0].bio ?? null,
      location: sellerData[0].location ?? null,
      joined: sellerData[0].created_at,
      productsCount: products.length,
      rating: 5, // placeholder
      products,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch seller profile.");
  }
}