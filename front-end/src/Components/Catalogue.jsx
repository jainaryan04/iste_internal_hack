import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Catalogue = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/data');
                console.log('Fetched data:', response.data);
                setData(response.data);
            } catch (err) {
                console.error('Error fetching data:', err.message);
            }
        };

        fetchData();
    }, []);

    console.log('Data state:', data); 

    return (
        <div>
            <p className="text-[6vh]">Items</p><br />
            <ul>
                {data.length > 0 ? (
                    data.map((item) => (
                        <li key={item.id}>
                            <strong>{item.item_name}</strong><br />
                            <span>{item.dept}</span><br />
                            <em>Listed by: {item.listed_by}</em><br />
                            <span>Price: Rs{item.price}</span> <br /><br />
                        </li>
                    ))
                ) : (
                    <li>No data available</li>
                )}
            </ul>
        </div>
    );
};

export default Catalogue;
