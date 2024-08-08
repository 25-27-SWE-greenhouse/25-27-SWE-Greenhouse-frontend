import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { viewPlantDetails, deletePlant } from '../api/plantData';

export default function ViewPlant() {
  const [plantDetails, setPlantDetails] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const router = useRouter();

  // Grab id from URL
  const { id } = router.query;

  // Fetch plant details
  useEffect(() => {
    if (id) {
      viewPlantDetails(id)
        .then((data) => setPlantDetails(data))
        .catch((error) => {
          console.error('Error fetching plant details:', error);
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

  // eslint-disable-next-line camelcase
  const { image_URL, name, species } = plantDetails;

  const deleteThisPlant = () => {
    deletePlant(id)
      .then(() => {
        router.push('/plants');
      })
      .catch((deleteError) => {
        console.error('Error deleting plant:', deleteError);
        setFetchError('Error deleting plant.');
      });
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      {/* eslint-disable-next-line camelcase */}
      <Card.Img variant="top" src={image_URL} style={{ height: '200px', objectFit: 'cover' }} />
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
