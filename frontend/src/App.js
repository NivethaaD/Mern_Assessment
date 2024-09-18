import './App.css';
import CreateEmployee from './components/CreateEmployee';
import EmployeeEdit from './components/EmployeeEdit';
import EmployeeList from './components/EmployeeList';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  const [user, setUser] = useState(null);
  return (
    <div>
     <BrowserRouter>
      <Navbar user={user} setUser={setUser}/>
     <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/login' element={<Login setUser={setUser}/>}/>
       <Route path='/employee-list' element={<EmployeeList/>}/>
       <Route path='/employee-edit' element={<EmployeeEdit/>}/>
       <Route path='/create-employee' element={<CreateEmployee/>}/>
       <Route path='/employee-edit/:id' element={<EmployeeEdit />} />
       <Route path="/dashboard" element={<Dashboard />} />
     </Routes>
      <Footer/>
      <ToastContainer />
     </BrowserRouter>
    </div>
  );
}

export default App;
