import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap'; // Moved import to the correct order
import { useRouter } from 'next/router';
import { viewPlantDetails, deletePlant } from '../api/plantData';

export default function ViewPlant() {
  const [plantDetails, setPlantDetails] = useState(null);
  const [fetchError, setFetchError] = useState(null); // Renamed to avoid shadowing
  const router = useRouter();

  // Grab id from URL
  const { id } = router.query;

  // Fetch plant details
  useEffect(() => {
    if (id) {
      viewPlantDetails(id)
        .then((data) => setPlantDetails(data))
        .catch((error) => {
          console.error('Error fetching plant details:', error); // You can replace this with console.debug or remove it
          setFetchError('Error fetching plant details.');
        });
    }
  }, [id]);

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  if (!plantDetails) {
    return <div>Loading...</div>;
  }

  const { imageURL, name, species } = plantDetails; // Renamed to camel case

  // Removed unnecessary console.log statements

  const deleteThisPlant = () => {
    deletePlant(id)
      .then(() => {
        // Redirect or update state after successful deletion
        router.push('/plants'); // Redirecting to the plants list page
      })
      .catch((deleteError) => { // Renamed to avoid shadowing
        console.error('Error deleting plant:', deleteError); // You can replace this with console.debug or remove it
        setFetchError('Error deleting plant.');
      });
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={imageURL} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text><strong>Species:</strong> {species}</Card.Text>
        <Button variant="danger" onClick={deleteThisPlant} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}
