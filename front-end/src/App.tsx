import React from 'react';
import Register from './pages/Register';
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import BreakFix from './pages/Tickets/BreakFix/BreakFix';
import BreakFixForm from './pages/Tickets/BreakFix/BreakFixForm';
import TicketPage from './pages/TicketPage';
import Dashboard from './pages/Dashboard'
import MainPage from './pages/MainPage'
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProtectedRoute from './pages/ProtectRouteHandler/ProtectedRoute';
import AccessDenied from './pages/Admin/AccessDenied';
import ReduxCounterReact from './pages/Practise/ReduxCounterReact';
import TodoRedux from './pages/Practise/TodoRedux';
import CounterPage from './pages/Practise/contextPage/CounterPage';
import { CounterContext } from './pages/Practise/contextApi/CounterContext';
import ParentSearch from './pages/Practise/CallBack/ParentSearch'
import FocusPointInput from './pages/Practise/UseRef/FocusInput';

const App: React.FC = ()=>{
  return(
    <CounterContext>
      <Router>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/RegisterUser' element={
            <Register/>          
          }/>
        <Route path='/Login' element={
            <Login/>
          }/>
          <Route path='/Practise' element={
            <ReduxCounterReact/>
          }/>
          <Route path='/Practise1' element={
            <TodoRedux/>
          }/>
          <Route path='/Practise2' element ={
            <CounterPage/>
          }/>
          <Route path='/Practise3' element ={
            <FocusPointInput/>
          }/>
        <Route path='/Home' element={
          <ProtectedRoute allowedRole={['Admin', 'User']}>
            <Home/>
          </ProtectedRoute>
          }/>
        
        <Route path='/Ticket/BreakFix' element={
          <ProtectedRoute allowedRole={['Admin', 'User']}>
            <BreakFix/>
          </ProtectedRoute>
          
          }/>
        <Route path='/Ticket/BreakFix/BreakFixForm' element={
          <ProtectedRoute allowedRole={['Admin', 'User']}>
            <BreakFixForm/>
          </ProtectedRoute>
          }/>
        <Route path='/Ticket' element={
          <ProtectedRoute allowedRole={['Admin', 'User']}>
            <TicketPage/>
          </ProtectedRoute>
          
          }/>
        <Route path='/Dashboard' element={
          <ProtectedRoute allowedRole={['Admin', 'User']}>
            <Dashboard/>
          </ProtectedRoute>
          }/>
        <Route path='/AdminDashboard' element={
          <ProtectedRoute allowedRole={['Admin']}>
          <AdminDashboard/>
          </ProtectedRoute>
          }/>
          <Route path='/AccessDenied' element={<AccessDenied/>}/>
      </Routes>
      <ToastContainer 
        position="top-center"    
        autoClose={3000}        
        hideProgressBar={true} 
        newestOnTop={false}     
        closeOnClick            
        rtl={false}           
        pauseOnFocusLoss       
        draggable            
        pauseOnHover            
      />
    </Router>
    </CounterContext>
  )
}

export default App;