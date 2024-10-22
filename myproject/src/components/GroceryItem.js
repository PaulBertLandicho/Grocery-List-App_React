import React from 'react';

import './css/GroceryItem.css'

const GroceryItem = ({ item, onEdit, onDelete }) => {
  const getImageSrc = () => {
    if (item.image instanceof File) {
      return URL.createObjectURL(item.image);
    }
    return item.image; 
  };

  return (
    <div className="grocery-item">

    {/* Display the image */}
    {item.image ? (
      <img src={getImageSrc()} alt={item.name} className="grocery-item-image" style={{ width: '100px', height: '100px' }} />
    ) : (
      <div className="grocery-item-placeholder">No Image</div>
    )}
    <div>
      <h4>{item.name}</h4>
      <p>Price: ₱{item.price ? Number(item.price).toFixed(2) : '0.00'}</p> 
      <button className="edit" onClick={() => onEdit(item)}>Edit</button>
      <button className="delete" onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  </div>
  
  );
};

export default GroceryItem;
