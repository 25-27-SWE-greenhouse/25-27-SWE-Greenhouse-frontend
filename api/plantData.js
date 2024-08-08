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
const deletePlant = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/plants/${id}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => resolve({ message: 'Plant successfully deleted' }))
    .catch(reject);
});

// DONE: GET SINGLE PLANT
const getSinglePlant = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/plants/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application',
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
  fetch(`${endpoint}/plants/${payload.id}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// View Plant Details including image, name, and species
const viewPlantDetails = (id) => new Promise((resolve, reject) => {
  getSinglePlant(id)
    .then((plantObject) => {
      resolve({
        image: plantObject.image,
        name: plantObject.name,
        species: plantObject.species,
        ...plantObject
      });
    })
    .catch((error) => reject(error));
});

export {
  getPlants,
  createPlant,
  deletePlant,
  getSinglePlant,
  updatePlant,
  viewPlantDetails,
};
