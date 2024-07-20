import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePlant } from '../api/plantData';

function PlantCard({
  id,
  name,
  species,
  onUpdate,
}) {
  const deleteThisPlant = () => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePlant(id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      {/* <Card.Img variant="top" src={image} alt={name} style={{ height: '400px' }} /> */}
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text><strong>Species:</strong> {species}</Card.Text>
        {/* <Card.Text><strong>Tags:</strong> {plant.tags.join(', ')}</Card.Text> */}
        <Link href={`/plant/${id}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/plant/edit/${id}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPlant} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PlantCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlantCard;
