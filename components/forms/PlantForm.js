import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createPlant, updatePlant } from '../../api/plantData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  species: '',
  favorite: false,
  imageUrl: '',
};

function PlantForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj?.id) {
      setFormInput({ ...initialState, ...obj });
      if (obj.imageUrl) {
        setImagePreview(obj.imageUrl);
      }
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'imageUrl') {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid: user.uid };
    if (obj?.id) {
      updatePlant(payload).then(() => router.push(`/plant/${obj.id}`));
    } else {
      createPlant(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updatePlant(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj?.id ? 'Update' : 'Create'} Plant</h2>
      <FloatingLabel controlId="floatingInput1" label="Plant Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Plant Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Species" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Species"
          name="species"
          value={formInput.species}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Image URL" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Image URL"
          name="imageUrl"
          value={formInput.imageUrl}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {imagePreview && (
        <div className="mb-3">
          <img src={imagePreview} alt="Plant preview" width="200" />
        </div>
      )}
      <Button type="submit">{obj?.id ? 'Update' : 'Create'} Plant</Button>
    </Form>
  );
}

PlantForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    species: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
};

PlantForm.defaultProps = {
  obj: initialState,
};

export default PlantForm;
