import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios for API requests

const EmployeeList = () => {
  const [search, setSearch] = useState('');
  const [employees, setEmployees] = useState([]);
  const [sortField, setSortField] = useState('name'); // Default sort field
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/getAllEmployees');
        if (response.status === 200) {
          setEmployees(response.data);
        } else {
          throw new Error('Failed to fetch employees');
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(search.toLowerCase()) ||
    employee.email.toLowerCase().includes(search.toLowerCase())
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortField === 'createdAt') {
      return sortOrder === 'asc'
        ? new Date(a[sortField]) - new Date(b[sortField])
        : new Date(b[sortField]) - new Date(a[sortField]);
    } else {
      return sortOrder === 'asc'
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    }
  });

  const paginatedEmployees = sortedEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/employees/delete/${id}`);
      if (response.status === 200) {
        setEmployees(employees.filter(employee => employee._id !== id));
        toast.success('Employee deleted successfully');
      } else {
        throw new Error('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast.error('Error deleting employee');
    }
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-4">Employee List</h1>
      <div className="flex justify-between mb-4">
        <span className="text-lg font-medium">Total Employees: {filteredEmployees.length}</span>
        <Link to={'/create-employee'} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create Employee</Link>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search keyword"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border-b cursor-pointer" onClick={() => handleSort('name')}>
              Name {sortField === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-4 py-2 border-b cursor-pointer" onClick={() => handleSort('email')}>
              Email {sortField === 'email' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-4 py-2 border-b">Mobile Number</th>
            <th className="px-4 py-2 border-b">Designation</th>
            <th className="px-4 py-2 border-b">Gender</th>
            <th className="px-4 py-2 border-b">Course</th>
            <th className="px-4 py-2 border-b cursor-pointer" onClick={() => handleSort('createdAt')}>
              Created Date {sortField === 'createdAt' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="px-4 py-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.map(employee => (
            <tr key={employee._id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{employee.name}</td>
              <td className="px-4 py-2">{employee.email}</td>
              <td className="px-4 py-2">{employee.mobileNo}</td>
              <td className="px-4 py-2">{employee.designation}</td>
              <td className="px-4 py-2">{employee.gender}</td>
              <td className="px-4 py-2">{employee.courses.join(', ')}</td>
              <td className="px-4 py-2">{new Date(employee.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2 text-center">
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2"
                >
                  <Link to={`/employee-edit/${employee._id}`}>Edit</Link>
                </button>
                <button
                  onClick={() => handleDelete(employee._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg font-medium">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
