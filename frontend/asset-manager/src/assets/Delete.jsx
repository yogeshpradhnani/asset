import axios from 'axios';
import React, { useState } from 'react'

export default function Delete() {
    const [name, setName] = useState('');
    const [assetData, setAssetData] = useState(null);
    const fetchAssetData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/assets/filter?name=${name}`);
          setAssetData(response.data.data[0]);
         console.log(response);

        } catch (error) {
          console.error('Error fetching asset:', error);
          alert('Asset not found!');
        }
      };
  return (
     <div className="container mx-auto p-4"name="delete">
      <h1 className="text-2xl font-bold mb-4">Asset Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Asset Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={fetchAssetData}
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-700 
        "
        >
          Get Asset Details
        </button>

      </div>
      <div>
        {assetData && (
          <div>
            <h2 className="text-xl font-bold mb-4">Asset Details</h2>
            <p>Name: {assetData.name}</p>
            <p>Description: {assetData.description}</p>
            <p>Assigned To: {assetData.assignedTo?.name}</p>
            <p>Assigned Date: {assetData.assignedDate}</p>
      </div>

        )}
        <button
          onClick={() => {
            axios
             .delete(`http://localhost:3000/api/assets/delete/${assetData._id}`)
             .then((response) => {
                console.log(response);
                alert('Asset deleted successfully!');
              })
             .catch((error) => {
                console.error('Error deleting asset:', error);
                alert('Failed to delete asset!');
              });
          }}
          className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-700"
        >Delete</button>
        </div>
        </div>
  
  )

}