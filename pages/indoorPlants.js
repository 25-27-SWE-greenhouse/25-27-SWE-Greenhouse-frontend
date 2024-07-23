import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPlants } from '../api/plantData';
import { useAuth } from '../utils/context/authContext';
import PlantCard from '../components/PlantCard';

function IndoorPlants() {
  const [indoorPlants, setIndoorPlants] = useState([]);
  const { user } = useAuth();

  function filter(plants) {
    return plants.filter((plant) => plant.type === 'indoor'); // Assuming 'indoor' is the correct type
  }

  const getAllThePlants = () => {
    getPlants(user.uid).then((allPlants) => {
      const filtered = filter(allPlants);
      setIndoorPlants(filtered);
    });
  };

  useEffect(() => {
    getAllThePlants();
  }); // Adding 'user' as a dependency

  return (
    <div className="text-center my-4">
      <Link href="/plant/new" passHref>
        <Button>Add a Plant</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {indoorPlants.map((plant) => (
          <PlantCard key={plant.firebaseKey} plantObj={plant} onUpdate={getAllThePlants} />
        ))}
      </div>
    </div>
  );
}

export default IndoorPlants;
