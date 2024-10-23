import React, { useState, useEffect } from "react";
import GroceryFormModal from "./GroceryFormModal";
import GroceryItem from "./GroceryItem";
import { FaMoon, FaSun } from "react-icons/fa"; // Import icons for dark/light mode
import "./css/GroceryList.css";

// Import static images
import apple from "./images/apple.png";
import banana from "./images/banana.png";

const GroceryList = () => {

  // Initial static items with imported images
  const staticItems = [
    {
      id: 1,
      name: "Apple",
      price: 3.99,
      image: apple,
    },
    {
      id: 2,
      name: "Banana",
      price: 1.99,
      image: banana,
    },
  ];

  const [groceryItems, setGroceryItems] = useState(staticItems);
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isDarkMode, setIsDarkMode] = useState(false); 

  useEffect(() => {
    const savedItems = localStorage.getItem("groceryItems");
    if (savedItems) {
      setGroceryItems(JSON.parse(savedItems));
    }
  }, []);

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
    setCurrentItem(null);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    openModal();
  };

  const filteredItems = groceryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const handleSortCriteriaChange = (e) => {
    setSortCriteria(e.target.value);
    setSortOrder("asc");
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Set dark mode class on body
  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <div>
      {/* Dark Mode Toggle Button */}
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? <FaSun size={15} /> : <FaMoon size={15} />}
      </div>

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

      <div className="grocery-list-container">
        <div className="grocery-list">
          {sortedItems.map((item) => (
            <GroceryItem
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={deleteItem}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroceryList;
