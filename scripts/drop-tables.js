const { db } = require('@vercel/postgres');

async function dropArtisans(client) {
  try {
    // Create the "artisans" table if it doesn't exist
    const dropTable = await client.sql`
      DROP TABLE IF EXISTS artisans CASCADE;
    `;

    console.log(`Dropped "artisans" table`);

    return {
      dropTable,
    };
  } catch (error) {
    console.error('Error Dropping artisans:', error);
    throw error;
  }
}

async function dropProducts(client) {
  try {
    // Create the "products" table if it doesn't exist
    const dropTable = await client.sql`
      DROP TABLE IF EXISTS products CASCADE;
    `;

    console.log(`Dropped "products" table`);

    return {
      dropTable,
    };
  } catch (error) {
    console.error('Error Dropping products:', error);
    throw error;
  }
}

async function dropReviews(client) {
  try {
    // Create the "reviews" table if it doesn't exist
    const dropTable = await client.sql`
        DROP TABLE IF EXISTS reviews CASCADE;
    `;

    console.log(`Dropped "reviews" table`);

    return {
      dropTable,
    };
  } catch (error) {
    console.error('Error dropping reviews:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await dropArtisans(client);
  await dropProducts(client);
  await dropReviews(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to drop some tables of the database:',
    err,
  );
});
