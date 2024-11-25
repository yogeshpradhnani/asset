import React, { useState } from 'react';
import axios from 'axios';

const AssetForm = () => {
  const [name, setName] = useState('');
  const [assetData, setAssetData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    assignedTo: '',
    imageString: null,
  });

  // Fetch asset data
  const fetchAssetData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/assets/filter?name=${name}`);
      setAssetData(response.data.data[0]);
     
      
      setFormData({
        _id: response.data.data[0]._id,
        name: response.data.data[0].name,
        description: response.data.data[0].description,
        assignedTo: response.data.data?.assignedTo?.name,
        submittedDate:response.data.data?.submittedDate

   
      });
    } catch (error) {
      console.error('Error fetching asset:', error);
      alert('Asset not found!');
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // Update asset data
  const updateAsset = async () => {
    try {
      console.log(formData);
      
      
      await axios.put(`http://localhost:3000/api/assets/update/${assetData._id}`, formData);
      alert('Asset updated successfully!');
    } catch (error) {
      console.error('Error updating asset:', error);
      alert('Failed to update asset!');
    }
  };

  return (
    <div className="container mx-auto p-4" name="update">
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
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-700"
        >
          Get Asset Details
        </button>
      </div>

      {assetData && (
        <form className="border p-4 rounded-md shadow-md">
          <div className="mb-4">
            <label className="block font-bold">Asset Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold">Asset Value:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold">Asset Owner:</label>
            <input
              type="text"
              name="assignedTo"
              value={formData.assignedTo?.name }
              onChange={handleChange}
              className="border p-2 w-full"
            />
            </div>
          <div className="mb-4">
            <label className="block font-bold">Asset Owner:</label>
            <input
              type="date"
              name="submittedDate"
              value={formData.submittedDate }
              onChange={handleChange}
              className="border p-2 w-full"
            />
            </div>
      
          
          <button
            type="button"
            onClick={updateAsset}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Update Asset
          </button>
        </form>
      )}
    </div>
  );
};

export default AssetForm;
