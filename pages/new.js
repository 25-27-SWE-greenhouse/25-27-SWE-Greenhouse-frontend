import React from 'react';
import PlantForm from '../components/forms/PlantForm';
import { useAuth } from '../utils/context/authContext';

function NewPlant() {
  const { user } = useAuth();

  return (
    <div>
      <div>
        <h2>Create New Plant</h2>
        <PlantForm user={user} />
      </div>
    </div>
  );
}

export default NewPlant;
