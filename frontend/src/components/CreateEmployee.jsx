import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        courses: checked
          ? [...prevState.courses, value]
          : prevState.courses.filter(course => course !== value)
      }));
    } else if (type === 'file') {
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparing the data to send to the API
    let data = {
      name: formData.name,
      email: formData.email,
      mobileNo: formData.mobile,
      designation: formData.designation,
      gender: formData.gender,
      courses: formData.courses, // Array is sent directly
    };

    try {
      const response = await axios.post('http://localhost:8000/api/v1/employeesNew', data);
      if (response.status === 201) {
        toast.success('Employee created successfully!');
        // Reset form data
        setFormData({
          name: '',
          email: '',
          mobile: '',
          designation: '',
          gender: '',
          courses: [],
        });
      } else {
        toast.error('Error creating employee: ' + response.data.error);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.details) {
        toast.error('Error creating employee: ' + error.response.data.details);
      } else {
        toast.error('Network error: ' + error.message);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-[80vh]">
      <h1 className="text-3xl text-center font-bold mb-6">Create Employee</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
          <select
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <fieldset className="mb-4">
          <legend className="block text-sm font-medium text-gray-700">Gender</legend>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="male" className="text-sm text-gray-700">Male</label>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="female" className="text-sm text-gray-700">Female</label>
          </div>
        </fieldset>

        <fieldset className="mb-4">
          <legend className="block text-sm font-medium text-gray-700">Courses</legend>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="mca"
              name="courses"
              value="MCA"
              checked={formData.courses.includes('MCA')}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="mca" className="text-sm text-gray-700">MCA</label>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="bca"
              name="courses"
              value="BCA"
              checked={formData.courses.includes('BCA')}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="bca" className="text-sm text-gray-700">BCA</label>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="bsc"
              name="courses"
              value="BSC"
              checked={formData.courses.includes('BSC')}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="bsc" className="text-sm text-gray-700">BSC</label>
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default CreateEmployee;
