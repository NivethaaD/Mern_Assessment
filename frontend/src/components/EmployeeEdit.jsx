// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios'

// const EmployeeEdit = () => {
//   const { id } = useParams(); // Get the employee ID from the URL
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     designation: '',
//     gender: '',
//     courses: [],
//   });

//   useEffect(() => {
//     const fetchEmployee = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/api/v1/getEmployee/${id}`);
//         if (response.ok) {
//           const data = await response.json();
//           setFormData({
//             name: data.name,
//             email: data.email,
//             mobile: data.mobileNo,
//             designation: data.designation,
//             gender: data.gender,
//             courses: data.courses,
//           });
//         } else {
//           toast.error('Failed to fetch employee data');
//         }
//       } catch (error) {
//         console.error('Error fetching employee data:', error);
//         toast.error('Error fetching employee data');
//       }
//     };

//     fetchEmployee();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox') {
//       setFormData(prevState => ({
//         ...prevState,
//         courses: checked
//           ? [...prevState.courses, value]
//           : prevState.courses.filter(course => course !== value)
//       }));
//     } else {
//       setFormData(prevState => ({
//         ...prevState,
//         [name]: value
//       }));
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const formDataToSend = new FormData();
//   //   for (const key in formData) {
//   //     if (key === 'courses') {
//   //       formData[key].forEach(course => formDataToSend.append('courses', course));
//   //     } else {
//   //       formDataToSend.append(key, formData[key]);
//   //     }
//   //   }

   
//   // try {
//   //   console.log('Submitting form with data:', formDataToSend);
    
//   //   const response = await axios.put(`http://localhost:8000/api/v1/employees/update/${id}`, formDataToSend, {
//   //     headers: {
//   //       'Content-Type': 'application/json'
//   //     }
//   //   })
//   //   toast.success('Employee updated successfully');
//   // } catch (error) {
//   //   console.error('Error updating employee:', error);
//   //   toast.error('Error updating employee');
//   // }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const formDataToSend = {
//       name: formData.name,
//       email: formData.email,
//       mobileNo: formData.mobile,  // Use mobileNo if that's what the backend expects
//       designation: formData.designation,
//       gender: formData.gender,
//       courses: formData.courses,
//     };
  
//     try {
//       console.log('Submitting form with data:', formDataToSend);
      
//       const response = await axios.put(`http://localhost:8000/api/v1/employees/update/${id}`, formDataToSend, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (response.status === 200) {
//         // Display prompt box
//         // window.alert('Employee updated successfully!');
  
//         // Also show a toast success message
//         toast.success('Employee updated successfully');
//       } else {
//         toast.error('Failed to update employee');
//       }
//     } catch (error) {
//       console.error('Error updating employee:', error);
//       toast.error('Error updating employee');
//     }
//   };
  
  
  
//   return (
//     <div className="p-6 bg-gray-50 min-h-[80vh]">
//       <h1 className="text-3xl text-center font-bold mb-6">Update Employee</h1>
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
//           <input
//             type="text"
//             id="mobile"
//             name="mobile"
//             value={formData.mobile}
//             onChange={handleChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
//           <select
//             id="designation"
//             name="designation"
//             value={formData.designation}
//             onChange={handleChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             required
//           >
//             <option value="">Select Designation</option>
//             <option value="HR">HR</option>
//             <option value="Manager">Manager</option>
//             <option value="Sales">Sales</option>
//           </select>
//         </div>

//         <fieldset className="mb-4">
//           <legend className="block text-sm font-medium text-gray-700">Gender</legend>
//           <div className="flex items-center mt-2">
//             <input
//               type="radio"
//               id="male"
//               name="gender"
//               value="Male"
//               checked={formData.gender === 'Male'}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label htmlFor="male" className="text-sm text-gray-700">Male</label>
//           </div>
//           <div className="flex items-center mt-2">
//             <input
//               type="radio"
//               id="female"
//               name="gender"
//               value="Female"
//               checked={formData.gender === 'Female'}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label htmlFor="female" className="text-sm text-gray-700">Female</label>
//           </div>
//         </fieldset>

//         <fieldset className="mb-4">
//           <legend className="block text-sm font-medium text-gray-700">Course</legend>
//           <div className="flex items-center mt-2">
//             <input
//               type="checkbox"
//               id="mca"
//               name="courses"
//               value="MCA"
//               checked={formData.courses.includes('MCA')}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label htmlFor="mca" className="text-sm text-gray-700">MCA</label>
//           </div>
//           <div className="flex items-center mt-2">
//             <input
//               type="checkbox"
//               id="bca"
//               name="courses"
//               value="BCA"
//               checked={formData.courses.includes('BCA')}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label htmlFor="bca" className="text-sm text-gray-700">BCA</label>
//           </div>
//           <div className="flex items-center mt-2">
//             <input
//               type="checkbox"
//               id="bsc"
//               name="courses"
//               value="BSC"
//               checked={formData.courses.includes('BSC')}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label htmlFor="bsc" className="text-sm text-gray-700">BSC</label>
//           </div>
//         </fieldset>

//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EmployeeEdit;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeEdit = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
  });
  const [formMessage, setFormMessage] = useState(''); // State to hold form messages

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/getEmployee/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.name,
            email: data.email,
            mobile: data.mobileNo,
            designation: data.designation,
            gender: data.gender,
            courses: data.courses,
          });
        } else {
          setFormMessage('Failed to fetch employee data.');
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setFormMessage('Error fetching employee data.');
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        courses: checked
          ? [...prevState.courses, value]
          : prevState.courses.filter(course => course !== value)
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
  
    const formDataToSend = {
      name: formData.name,
      email: formData.email,
      mobileNo: formData.mobile,  // Use mobileNo if that's what the backend expects
      designation: formData.designation,
      gender: formData.gender,
      courses: formData.courses,
    };
  
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/employees/update/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        setFormMessage('Employee updated successfully!');
      } else {
        setFormMessage('Failed to update employee.');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      setFormMessage('Error updating employee.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-[80vh]">
      <h1 className="text-3xl text-center font-bold mb-6">Update Employee</h1>

      {/* Display success or error message */}
      {formMessage && (
        <div className={`text-center mb-4 font-semibold ${formMessage.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
          {formMessage}
        </div>
      )}

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
          <legend className="block text-sm font-medium text-gray-700">Course</legend>
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
          Update
        </button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
