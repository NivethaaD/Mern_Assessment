import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Welcome to Admin Panel
        </h1>
        <p className="text-lg">
          Manage your dashboard and settings from here.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
