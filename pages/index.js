/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getPlants } from '../api/plantData';
import { useAuth } from '../utils/context/authContext';
import PlantCard from '../components/PlantCard';

function Home() {
  // TODO: Set a state for plants
  const [plants, setPlants] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllThePlants = () => {
    getPlants(user.uid).then(setPlants);
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllThePlants();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/plant/new" passHref>
        <Button>Add A Plant</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {plants.map((plant) => (
          <PlantCard key={plant.firebaseKey} plantObj={plant} onUpdate={getAllThePlants} />
        ))}
      </div>

    </div>
  );
}

export default Home;
