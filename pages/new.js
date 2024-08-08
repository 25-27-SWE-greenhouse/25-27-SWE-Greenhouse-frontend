import React from 'react';
import PlantForm from '../components/forms/PlantForm';
import { useAuth } from '../utils/context/authContext';
import { createPlant } from '../api/plantData';

const NewPlant = () => {
  const { user } = useAuth();

  const handleSubmit = async (formData) => {
    try {
      await createPlant(formData);
    } catch (error) {
      console.error('error creating a plant', error);
    }
  };

  return (
    <div>
      <div>
        <h2>Create New Plant</h2>
        <PlantForm user={user} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default NewPlant;
