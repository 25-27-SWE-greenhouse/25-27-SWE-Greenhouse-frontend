import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { deletePlant } from '../api/plantData';

function PlantCard({ plantObj }) {
  return (
    <Card style={{ width: '24rem', margin: '10px' }}>
      <Card.Img variant="top" src={plantObj.image} alt={plantObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{plantObj.name}</Card.Title>
        <p className="card-text bold">{plantObj.favorite ? 'Favorite' : ''}</p>
        {/* DYNAMIC LINK TO VIEW THE PLANT DETAILS */}
        <Link href={`/plant/${plantObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE PLANT DETAILS */}
        <Link href={`/plant/edit/${plantObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={() => deletePlant(plantObj.firebaseKey)} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PlantCard.propTypes = {
  plantObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    plant_type: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default PlantCard;
