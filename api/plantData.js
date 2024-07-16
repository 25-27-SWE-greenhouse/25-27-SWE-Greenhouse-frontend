import { clientCredentials } from "../utils/client";

const endpoint = clientCredentials.databaseURL;

const getPlants = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/plants.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// DONE: DELETE PLANT
const deletePlant = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/plants/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// DONE: GET SINGLE BOOK
const getSinglePlant = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/plants/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DONE: CREATE BOOK
const createPlant = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/plants.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DONE: UPDATE BOOK
const updatePlant = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/plants/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getPlants,
  createPlant,
  deletePlant,
  getSinglePlant,
  updatePlant,
};
