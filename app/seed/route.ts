import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { Seller } from '../lib/definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/* ======================
   USERS (Buyers)
====================== */
async function seedUsers(sql: any) {
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
async function seedSellers(sql: any) {
  await sql`
    CREATE TABLE IF NOT EXISTS sellers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      bio TEXT,
      avatar TEXT,
      location TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
  INSERT INTO sellers (name, email, bio, avatar, location)
  VALUES 
    (
      'Mama Sarah''s Crafts',
      'mamasarah@example.com',
      'Proud Kampala artisan specializing in handmade basket weaving, pottery, and recycled fabric home decor.',
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39',
      'Kampala, Uganda'
    ),
    (
      'Nordic Pine Workshop',
      'nordicpine@example.com',
      'Scandinavian-inspired wooden home goods crafted from sustainably sourced pine.',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      'Oslo, Norway'
    ),
    (
      'Desert Clay Co.',
      'desertclay@example.com',
      'Hand-thrown pottery inspired by desert tones and textures.',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      'Santa Fe, USA'
    ),
    (
      'Thread & Loom',
      'threadloom@example.com',
      'Textile artist creating handwoven scarves and home fabrics.',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
      'Istanbul, Turkey'
    ),
    (
      'Bap Craft Studio',
      'bapcraft@example.com',
      'Creative studio specializing in unique handmade crafts and modern designs. We blend traditional techniques with contemporary aesthetics to create one-of-a-kind pieces that brighten your home.',
      '/images/bap-craft.jpg',
      'Kampala, Uganda'
    ),
    (
      'Artisan Wooden Creations',
      'artisanwoodencreations@example.com',
      'Specializing in hand-carved wooden sculptures, vases, and decorative figurines made from sustainable local wood in Kampala.',
      '/images/snowman-figurine.webp',
      'Kampala, Uganda'
    )
    ON CONFLICT (email) DO NOTHING;
  `;
}

/* ======================
   PRODUCTS
====================== */
async function seedProducts(sql: any) {
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

  await sql`
    DO $$ 
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'unique_product'
      ) THEN
        ALTER TABLE products 
        ADD CONSTRAINT unique_product UNIQUE (name, seller_id);
      END IF;
    END $$;
  `;
  
  const sellers = await sql`SELECT id, email FROM sellers`;

  const getSeller = (email: string) => {
    const seller = sellers.find((s: Seller) => s.email === email);
    if (!seller) throw new Error(`Seller not found: ${email}`);
    return seller.id;
  };

  await sql`
    INSERT INTO products (name, description, price, image, category, seller_id)
    VALUES
      -- Mama Sarah
      (
        'Handwoven Basket',
        'Traditional Ugandan basket made from natural fibers.',
        32.00,
        'https://images.unsplash.com/photo-1598300056393-4aac492f4344',
        'Home Décor',
        ${getSeller('mamasarah@example.com')}
      ),
      (
        'Recycled Fabric Wall Hanging',
        'Colorful wall décor made from recycled textiles.',
        45.00,
        'https://images.unsplash.com/photo-1616627452603-9fdfc7a4b3d7',
        'Home Décor',
        ${getSeller('mamasarah@example.com')}
      ),
      (
        'Woven Kisii Basket Set',
        'Intricately woven basket set inspired by Kisii craftsmanship.',
        65.00,
        '/images/woven-basket-kisii.jpg',
        'Home Décor',
        ${getSeller('mamasarah@example.com')}
      ),
      (
        'Handmade Ceramic Coffee Mug',
        'Locally crafted ceramic mug with unique glaze finish.',
        28.00,
        '/images/ceramic-coffee-mug.jpg',
        'Kitchen',
        ${getSeller('mamasarah@example.com')}
      ),

      -- Nordic Pine
      (
        'Minimalist Wooden Lamp',
        'Clean Scandinavian design with warm lighting.',
        65.00,
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511',
        'Home Décor',
        ${getSeller('nordicpine@example.com')}
      ),
      (
        'Hand-carved Serving Board',
        'Perfect for kitchen or display.',
        38.00,
        'https://images.unsplash.com/photo-1582582621959-48d27397dc69',
        'Kitchen',
        ${getSeller('nordicpine@example.com')}
      ),

      -- Desert Clay
      (
        'Desert Glaze Vase',
        'Earth-toned ceramic vase with matte finish.',
        52.00,
        'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61',
        'Home Décor',
        ${getSeller('desertclay@example.com')}
      ),
      (
        'Clay Coffee Mug Set',
        'Set of 2 handmade mugs.',
        28.00,
        'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a',
        'Kitchen',
        ${getSeller('desertclay@example.com')}
      ),

      -- Thread & Loom
      (
        'Handwoven Wool Scarf',
        'Soft and warm artisan scarf.',
        40.00,
        'https://images.unsplash.com/photo-1521335629791-ce4aec67dd53',
        'Apparel',
        ${getSeller('threadloom@example.com')}
      ),
      (
        'Textured Throw Blanket',
        'Cozy woven blanket with intricate patterns.',
        75.00,
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
        'Home Décor',
        ${getSeller('threadloom@example.com')}
      ),

      -- Bap Craft
      (
        'Decorative Craft Piece',
        'Modern handmade decorative piece with vibrant design.',
        42.00,
        '/images/bap-craft.jpg',
        'Home Décor',
        ${getSeller('bapcraft@example.com')}
      ),
      (
        'Modern Handmade Vase',
        'Contemporary vase with artistic finish.',
        50.00,
        '/images/modern-handmade-vase.jpg',
        'Home Décor',
        ${getSeller('bapcraft@example.com')}
      ),

      -- Artisan Wooden Creations
      (
        'Snowman Figurine',
        'Hand-carved wooden snowman figurine.',
        35.00,
        '/images/snowman-figurine.webp',
        'Decor',
        ${getSeller('artisanwoodencreations@example.com')}
      ),
      (
        'Hand-Carved Wooden Vase',
        'Elegant vase carved from sustainable wood.',
        48.00,
        '/images/wooden-vase.webp',
        'Home Décor',
        ${getSeller('artisanwoodencreations@example.com')}
      )

    ON CONFLICT (name, seller_id) DO NOTHING;
    `;
}
/* ======================
   ORDERS
====================== */
async function seedOrders(sql: any) {
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
async function seedOrderItems(sql: any) {
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
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql.begin(async (tx) => {
      await seedUsers(tx);
      await seedSellers(tx);
      await seedProducts(tx);
      await seedOrders(tx);
      await seedOrderItems(tx);
    });

    return new Response(
      JSON.stringify({ message: "Handcrafted Haven DB seeded successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Seed error:", error);

    return new Response(
      JSON.stringify({ error: "Failed to seed database" }),
      { status: 500 }
    );
  }
}