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
  image,
  onUpdate,
}) {
  const deleteThisPlant = () => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePlant(id).then(() => {
        if (onUpdate) {
          onUpdate();
        } else {
          console.error('onUpdate function is not defined');
        }
      });
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={image} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text><strong>Species:</strong> {species}</Card.Text>
        <Link href={`/${id}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/plants/edit/${id}`} passHref>
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
  image: PropTypes.string,
  onUpdate: PropTypes.func,
};

PlantCard.defaultProps = {
  image: '',
  onUpdate: () => {}, // Added default prop for onUpdate
};

export default PlantCard;
