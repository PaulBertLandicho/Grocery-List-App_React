import React, { useState, useEffect } from 'react';
import './css/GroceryFormModal.css'; // Add a CSS file for modal transitions

import defaults from './images/defaults.png'; // Import the default image

const GroceryFormModal = ({ showModal, onClose, onSubmit, currentItem }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(defaults); // Default image is set to the imported image

  useEffect(() => {
    if (currentItem) {
      setName(currentItem.name);
      setPrice(currentItem.price);
      setImage(currentItem.image || defaults); // Use the imported image as the default if none is provided
    } else {
      setName('');
      setPrice('');
      setImage(defaults); // Reset to the default image
    }
  }, [currentItem]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Create a local URL for the uploaded image
    } else {
      setImage(defaults); // Reset to default if no file
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    const newItem = { id: currentItem?.id || Date.now(), name, price, image };
    onSubmit(newItem);

    // Reset form and close modal
    setName('');
    setPrice('');
    setImage(defaults); // Reset to the default image
    onClose();
  };

  // Close modal if clicking outside the modal content
  const handleClickOutside = (e) => {
    if (e.target.classList.contains('modal')) {
      onClose();
    }
  };

  return (
    <div className={`modal ${showModal ? 'modal-show' : ''}`} onClick={handleClickOutside}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <span className="line"></span>
        </button>
        <form onSubmit={handleSubmit}>
          <div className="image-preview" style={{ cursor: 'pointer' }}>
            <label>
              <img 
                src={image} 
                alt="Product Preview" 
                style={{ width: '150px', height: '150px', objectFit: 'cover', border: '1px solid #ccc', borderRadius: '5px' }} 
              />
              <input 
                type="file" 
                style={{ display: 'none' }} 
                onChange={handleImageUpload} 
                accept="image/*"
              />
            </label>
          </div>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className='buttons'>
          <button className="close-modal" type="submit">{currentItem ? 'Update Product' : 'Add Product'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroceryFormModal;
