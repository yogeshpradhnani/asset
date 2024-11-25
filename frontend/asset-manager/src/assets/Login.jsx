import React, { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    assignedTo: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('assignedTo', formData.assignedTo);
    if (formData.image) {
      form.append('imageString', formData.image);
    }

    try {
      const response = await fetch('http://localhost:3000/api/assets/create/', {
        method: 'POST',
        body: form,
       
      });

      const result = await response.json();
      if (response.ok) {
        alert('Asset created successfully!');
        setFormData({
          name: '',
          description: '',
          assignedTo: '',
          image: null,
        })

      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="mt-[100px] flex mx-auto border-2 border-black w-[400px] h-[300px] rounded-md" name="create">
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <h1 className="text-2xl mt-3">Create Asset</h1>

        <input
          name="name"
          className="border-2 border-black rounded-md mt-4 w-[220px] text-center"
          type="text"
          placeholder="Enter Asset Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          className="border-2 border-black rounded-md mt-2 w-[220px] text-center"
          type="text"
          placeholder="Enter Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          name="assignedTo"
          className="border-2 border-black rounded-md mt-2 w-[220px] text-center"
          type="text"
          placeholder="Enter Name to Assign"
          value={formData.assignedTo}
          onChange={handleChange}
        />

        <input
          name="image"
          className="border-2 border-black rounded-md mt-2 w-[220px]"
          type="file"
        
          onChange={handleFileChange}
        />

        <button
          className="btn btn-primary mt-2 text-center"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
