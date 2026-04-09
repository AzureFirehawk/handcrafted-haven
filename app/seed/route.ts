import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/* ======================
   USERS (Buyers)
====================== */
async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const password = await bcrypt.hash("password123", 10);

  await sql`
    INSERT INTO users (name, email, password)
    VALUES 
      ('Jane Doe', 'jane@example.com', ${password}),
      ('John Smith', 'john@example.com', ${password}),
      ('Oak & Ember Admin', 'oakember@example.com', ${password})
    ON CONFLICT (email) DO NOTHING;
  `;
}

/* ======================
   SELLERS
====================== */
async function seedSellers() {
  await sql`
    CREATE TABLE IF NOT EXISTS sellers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      bio TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    INSERT INTO sellers (name, email, bio)
    VALUES 
      ('Oak & Ember Co.', 'oakember@example.com', 'Rustic handmade wooden goods.'),
      ('Clay & Color Studio', 'claycolor@example.com', 'Hand-painted ceramics and gifts.')
    ON CONFLICT (email) DO NOTHING;
  `;
}

/* ======================
   PRODUCTS
====================== */
async function seedProducts() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price NUMERIC(10,2) NOT NULL,
      image TEXT,
      category VARCHAR(255),
      seller_id UUID REFERENCES sellers(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const sellers = await sql`SELECT id, email FROM sellers`;

  const oakSeller = sellers.find(s => s.email === 'oakember@example.com');
  const claySeller = sellers.find(s => s.email === 'claycolor@example.com');

  await sql`
    INSERT INTO products (name, description, price, image, category, seller_id)
    VALUES
      (
        'Rustic Wooden Candle Holder',
        'Hand-carved from reclaimed wood.',
        24.99,
        'https://images.unsplash.com/photo-1602524813704-5c4c84c7c6b0?auto=format&fit=crop&w=800&q=80',
        'Home Décor',
        ${oakSeller?.id}
      ),
      (
        'Hand-Painted Ceramic Mug',
        'Each mug is uniquely hand-painted.',
        18.50,
        'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=800&q=80',
        'Handmade Gifts',
        ${claySeller?.id}
      )
    ON CONFLICT DO NOTHING;
  `;
}

/* ======================
   ORDERS
====================== */
async function seedOrders() {
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      total NUMERIC(10,2),
      status VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

/* ======================
   ORDER ITEMS
====================== */
async function seedOrderItems() {
  await sql`
    CREATE TABLE IF NOT EXISTS order_items (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
      product_id UUID REFERENCES products(id) ON DELETE CASCADE,
      quantity INT NOT NULL,
      price NUMERIC(10,2) NOT NULL
    );
  `;
}

/* ======================
   MAIN SEED FUNCTION
====================== */
export async function GET() {
  try {
    await sql.begin(async (sql) => {
      await seedUsers();
      await seedSellers();
      await seedProducts();
      await seedOrders();
      await seedOrderItems();
    });

    return Response.json({ message: 'Handcrafted Haven DB seeded successfully' });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}