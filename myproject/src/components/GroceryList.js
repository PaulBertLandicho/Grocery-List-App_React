import React, { useState, useEffect } from "react";
import GroceryFormModal from "./GroceryFormModal";
import GroceryItem from "./GroceryItem";

import "./css/GroceryList.css";

// Import static images
import apple from "./images/apple.png";
import banana from "./images/banana.png";

const GroceryList = () => {
  // Initial static items with imported images
  const staticItems = [
    {
      id: 1,
      name: "Apples",
      price: 3.99,
      image: apple,
    },
    {
      id: 2,
      name: "Bananas",
      price: 1.99,
      image: banana,
    },
  ];

  const [groceryItems, setGroceryItems] = useState(staticItems);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [sortCriteria, setSortCriteria] = useState("name"); // Sort by 'name', 'price', etc.
  const [sortOrder, setSortOrder] = useState("asc"); // Sort order state (ascending or descending)

  // Load items from localStorage when the component mounts or page is reloaded
  useEffect(() => {
    const savedItems = localStorage.getItem("groceryItems");
    if (savedItems) {
      setGroceryItems(JSON.parse(savedItems));
    }
  }, []);

  // Save items to localStorage whenever groceryItems state changes
  useEffect(() => {
    localStorage.setItem("groceryItems", JSON.stringify(groceryItems));
  }, [groceryItems]);

  const addItem = (item) => {
    const newItem = { id: Date.now(), ...item };
    setGroceryItems([...groceryItems, newItem]);
  };

  const editItem = (updatedItem) => {
    const updatedItems = groceryItems.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setGroceryItems(updatedItems);
  };

  const deleteItem = (itemId) => {
    const updatedItems = groceryItems.filter((item) => item.id !== itemId);
    setGroceryItems(updatedItems);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setCurrentItem(null); // Reset currentItem when closing modal
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    openModal();
  };

  // Filter grocery items based on search term
  const filteredItems = groceryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the filtered items based on selected sortCriteria (name or price) and sortOrder (asc or desc)
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortCriteria === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortCriteria === "price") {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    }
    return 0; 
  });

  // Toggle sort order between ascending and descending
  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  // Handle sorting criteria change (name, price, etc.)
  const handleSortCriteriaChange = (e) => {
    setSortCriteria(e.target.value);
    setSortOrder("asc"); // Reset to ascending when criteria changes
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Sorting options */}
      <div className="sort-box">
        <form className="d-flex">
          <div className="form-group me-2">
            <select
              name="sort"
              className="form-control"
              value={sortCriteria}
              onChange={handleSortCriteriaChange}
            >
              <option value="name">Sort by Product Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </form>
      </div>

      {/* Add Product Button */}
      <div className="add">
        <button onClick={openModal}>
          <i className="far fa-plus-square" style={{ marginLeft: "8px" }}></i>{" "}
          Add Product
        </button>
      </div>

      <GroceryFormModal
        showModal={showModal}
        onClose={closeModal}
        onSubmit={currentItem ? editItem : addItem}
        currentItem={currentItem}
      />

      {/* Make this container scrollable */}
      <div className="grocery-list-container">
        <div className="grocery-list">
          {sortedItems.map((item) => (
            <GroceryItem
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={deleteItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroceryList;
