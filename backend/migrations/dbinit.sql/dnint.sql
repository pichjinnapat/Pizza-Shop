`CREATE TABLE products(
        id SERIAL PRIMARY KEY NOT NULL,
        car Integer,
        name TEXT NOT NULL,
        number INTEGER NOT NULL,
        size INTEGER NOT NULL,
        status INTEGER NOT NULL,
        userId SERIAL NOT NULL,
        created_at TIMESTAMP,
      )`