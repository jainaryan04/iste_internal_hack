import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddOption = ({ email }) => {
  const [itemName, setItemName] = useState('');
  const [dept, setDept] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log(`Fetching items for email: ${email}`);
        const response = await axios.get(`/items/${email}`);
        setItems(response.data);
        console.log('Fetched items:', response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    if (email) {
      fetchItems();
    }
  }, [email]);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/items', {
        item_name: itemName,
        dept,
        listed_by: email,
        price,
      });
      setMessage(response.data.message);
      const itemsResponse = await axios.get(`/items/${email}`);
      setItems(itemsResponse.data);
      setItemName('');
      setDept('');
      setPrice('');
    } catch (error) {
      setMessage(error.response?.data.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h1>Add Item</h1>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={dept}
          onChange={(e) => setDept(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>
      {message && <p>{message}</p>}

      <h2>Items Listed by {email}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.item_name} - {item.dept} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddOption;
