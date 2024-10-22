// src/App.js
import React from 'react';
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

import GroceryList from './components/GroceryList.js'; 


import './components/css/App.css';

function App() {
  return (
    
    <div className="App">
            <Header />
            <GroceryList />
            <Footer />
    </div>
  );
}

export default App;
