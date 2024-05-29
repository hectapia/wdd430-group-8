const { db } = require('@vercel/postgres');
const {
  artisans,
  products,
  reviews,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedArtisans(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "artisans" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS artisans (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        fname VARCHAR(45) NOT NULL,
        lname VARCHAR(45) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        category VARCHAR(45) NOT NULL,
        story TEXT NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "artisans" table`);

    // Insert data into the "artisans" table
    const insertedArtisans = await Promise.all(
      artisans.map(async (artisan) => {
        const hashedPassword = await bcrypt.hash(artisan.password, 10);
        return client.sql`
        INSERT INTO artisans (id, lname,  fname, email, password, 
                              category, story, image_url)
        VALUES (${artisan.id}, ${artisan.lname},  ${artisan.fname}, ${artisan.email}, 
                ${hashedPassword}, ${artisan.category}, ${artisan.story}, ${artisan.image_url})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedArtisans.length} artisans`);

    return {
      createTable,
      artisans: insertedArtisans,
    };
  } catch (error) {
    console.error('Error seeding artisans:', error);
    throw error;
  }
}

async function seedProducts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "products" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        artisan_id UUID NOT NULL,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        category VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      );
    `;

    console.log(`Created "products" table`);

    // Insert data into the "products" table
    const insertedProducts = await Promise.all(
      products.map(async (product) => {
        return client.sql`
        INSERT INTO products (id, artisan_id, name, description, price, category, image_url, type, date)
        VALUES (${product.id}, ${product.artisan_id},  ${product.name}, 
                ${product.description}, ${product.price}, ${product.category}, 
                ${product.image_url}, ${product.type}, ${product.date})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedProducts.length} products`);

    return {
      createTable,
      products: insertedProducts,
    };
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
}

async function seedReviews(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "reviews" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        product_id UUID NOT NULL,
        user_name VARCHAR(45) NOT NULL,
        comment VARCHAR(255),
        rating INT NOT NULL
      );
    `;

    console.log(`Created "reviews" table`);

    // Insert data into the "reviews" table
    const insertedReviews = await Promise.all(
      reviews.map(async (review) => {
        return client.sql`
        INSERT INTO reviews (id, product_id, user_name, comment, rating)
        VALUES (${review.id}, ${review.product_id}, ${review.user_name}, 
                ${review.comment}, ${review.rating})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedReviews.length} reviews`);

    return {
      createTable,
      reviews: insertedReviews,
    };
  } catch (error) {
    console.error('Error seeding reviews:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await seedArtisans(client);
  await seedProducts(client);
  await seedReviews(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
