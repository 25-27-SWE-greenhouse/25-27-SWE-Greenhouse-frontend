import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getPlants } from '../api/plantData';
import { useAuth } from '../utils/context/authContext';
import PlantCard from '../components/PlantCard';

function Home() {
  const [plants, setPlants] = useState([]);
  const { user } = useAuth();

  const getAllThePlants = () => {
    getPlants(user.uid).then(setPlants);
  };

  useEffect(() => {
    getAllThePlants();
  }, []);

  return (
    <div className="text-center my-4">
      <article className="equipment" style={{ maxHeight: '900px', overflowY: 'auto' }}>
        <Link href="/plant/new" passHref>
          <Button>Add A Plant</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {plants.map((plant) => (
            <PlantCard key={plant.id} id={plant.id} name={plant.name} species={plant.species} image={plant.image} />
          ))}
        </div>
      </article>
    </div>
  );
}

export default Home;
