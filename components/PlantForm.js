import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createPlant, updatePlant } from '../api/plantData';

const initialState = {
  image: '',
  id: '',
  name: '',
  species: '',
};

function PlantForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj) {
      updatePlant(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlant(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePlant(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="floatingInput1" label="Plant" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Plant"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Plant Type" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Plant Type"
          name="plant type"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />
      <Button type="submit">{obj ? 'Update' : 'Create'} Plant</Button>
    </Form>
  );
}

PlantForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    species: PropTypes.string,
    image_URL: PropTypes.string,
  }),
};

PlantForm.defaultProps = {
  obj: null,
};

export default PlantForm;
