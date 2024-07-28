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
        <div className="bg-[#BC9D6E] p-4">
            <p className="text-[6vh]">Items</p><br />
            <div className="grid grid-cols-2 gap-4">
                {data.length > 0 ? (
                    data.map((item) => (
                        <div key={item.id} className="border border-gray-300 p-4 rounded bg-">
                            <strong className="block text-lg">{item.item_name}</strong>
                            <span className="block text-sm">{item.dept}</span>
                            <em className="block text-sm">Listed by: {item.listed_by}</em>
                            <span className="block text-sm">Price: Rs{item.price}</span>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2">No data available</div>
                )}
            </div>
        </div>
    );
};

export default Catalogue;
