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
    <div className="bg-[#BC9D6E] h-[47.5vh] ">
      <br />
      <div className="ml-4">
        <h1 className="text-[4vh]">Add Item</h1>
        <form onSubmit={handleAddItem} className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="shadow appearance-none border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#7B4926] w-[25%]"
          />
          <input
            type="text"
            placeholder="Description"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="shadow appearance-none border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#7B4926] w-[25%]"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="shadow appearance-none border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#7B4926] w-[25%]"
          />
          <button
            type="submit"
            className="bg-[#7B4926] text-white border rounded-lg p-1 ml-2 w-[15%]"
          >
            Add Item
          </button>
        </form>
      </div>
      <br />
      <h1>Items Listed by {email}</h1>
      <div className="ml-8">
        <table className="table-auto w-[80vw] text-left">
          <thead>
            <tr>
              <th className="border-4 border-[#7B4926] px-4 py-2">Item Name</th>
              <th className="border-4 border-[#7B4926] px-4 py-2">Description</th>
              <th className="border-4 border-[#7B4926] px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="border-4 border-[#7B4926] px-4 py-2">{item.item_name}</td>
                <td className="border-4 border-[#7B4926] px-4 py-2">{item.dept}</td>
                <td className="border-4 border-[#7B4926] px-4 py-2">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddOption;
