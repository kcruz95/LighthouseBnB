const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = email => {
  const queryString = `
  SELECT *
  FROM users
  WHERE users.email = $1;
  `;

  return pool.query(queryString, [email])
  .then((res) => {
    if(res.rows) {
      return res.rows[0];
    } else {
      return null;
    }
  })
  .catch (err => {
    console.log('error:', err)
  });

  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = id => {
  const queryString = `
  SELECT *
  FROM users
  WHERE users.id = $1;
  `;

  return pool.query(queryString, [id])
  .then((res) => {
    if(res.rows) {
      return res.rows[0];
    } else {
      return null;
    }
  })
  .catch (err => {
    console.log('error:', err)
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = user => {
  const values = [user.name, user.password, user.email]
  const queryString = `
  INSERT INTO users (name, password, email)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;

  return pool.query(queryString, values)
  .then((res) => {
    if(res.rows) {
      return res.rows[0];
    } else {
      return null;
    }
  })
  .catch (err => {
    console.log('error:', err)
  });
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = (guest_id, limit = 10) => {
  const queryString = `
  SELECT properties.*, reservations.*, AVG(rating) AS average_rating,
  FROM reservations,
  JOIN properties ON reservations.property_id = properties.id,
  JOIN property_reviews ON properties.id = property_reviews.property_id,
  WHERE reservations.guest_id = $1 AND reservation.end_date < now()::date,
  GROUP BY properties.id, reservation.id,
  ORDER BY reservations.start_date,
  LIMIT $2;
  `;

  const values = [guest_id, limit];
  return pool.query(queryString, values)
  .then((res) => {
    if(res.rows) {
      return res.rows;
    } else {
      return null;
    }
  })
  .catch (err => {
    console.log('error:', err)
  });

  // return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = (options, limit = 10) => {
  //  1 setup an array for possible parameters for the query
  const queryParams = [];

  //  2 form a query with all the clauses BEFORE "WHERE"
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  //  3  check if a city, owner_id or price_per_night has been inputted
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `AND owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += `AND cost_per_night > $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += `AND cost_per_night < $${queryParams.length}`;
  }
  
  //  4  add a query AFTER "WHERE"
  queryString += `GROUP BY properties.id`;

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING AVG(property_reviews.rating) >= ${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length}`;

  //  5  console.log everything
  console.log(queryString, queryParams);

  //  6  run the query
  return pool.query(queryString, queryParams)
  .then(res => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = property => {
  const values = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    property.country,
    property.province,
    property.city,
    property.street,
    property.post_code,
  ];

  const queryString = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `;

  const values = [guest_id, values];
  return pool.query(queryString, values)
  .then((res) => {
    if(res.rows) {
      return res.rows[0];
    } else {
      return null;
    }
  })
  .catch (err => {
    console.log('error:', err)
  });

  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
}
exports.addProperty = addProperty;
