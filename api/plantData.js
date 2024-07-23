import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPlants = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/plants`, {
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
    .then(() => resolve({ message: 'Plant successfully deleted' }))
    .catch(reject);
});

// DONE: GET SINGLE PLANT
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

// DONE: CREATE PLANT
const createPlant = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/plants`, {
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

// DONE: UPDATE PLANT
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
