import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Image from 'next/image'; // Import Image from next/image
// Removed unused imports: createPlant, updatePlant
// Removed unused variable: user

const initialFormData = {
  name: '',
  species: '',
  favorite: false,
  image: '',
};

function PlantForm({ initialData = initialFormData, onSubmit }) {
  const [formInput, setFormInput] = useState(initialData);
  const [imagePreview, setImagePreview] = useState(initialData.image);
  const router = useRouter();

  useEffect(() => {
    setFormInput(initialData);
    setImagePreview(initialData.image);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
    if (name === 'image') {
      setImagePreview(value); // Update image preview when URL changes
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formInput);
    router.push('/');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{formInput.id ? 'Update' : 'Create'} Plant</h2>
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
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {imagePreview && (
        <div className="mb-3">
          <Image src={imagePreview} alt="Plant preview" width={200} height={200} /> {/* Use next/image */}
        </div>
      )}
      <Button type="submit">{formInput.id ? 'Update' : 'Create'} Plant</Button>
    </Form>
  );
}

PlantForm.propTypes = {
  initialData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    species: PropTypes.string,
    image: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

PlantForm.defaultProps = {
  initialData: initialFormData, // Add defaultProps declaration
};

export default PlantForm;
