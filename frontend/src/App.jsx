// src/App.js
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/LoginScreen'
import Signup from './pages/SignupScreen'
import { Toaster } from 'react-hot-toast'
import VerifyOtp from './pages/VerifyOtpScreen'
import Home from './pages/HomeScreen'
import Purchase from './pages/PurchaseScreen'
import Found from './pages/FoundScreen'
import ProductDetails from './pages/PurchaseDetailsScreen'
import FoundDetails from './pages/FoundDetailsScreen'
import UploadFoundScreen from './pages/UploadFoundScreen'
import UploadPurchaseScreen from './pages/UploadPurchaseScreen'
import AccountScreen from './pages/AccountScreen'





function App() {
  return (
    <BrowserRouter>
      {/* Toast container with custom theme */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            padding: '16px',
            borderRadius: '12px',
            fontSize: '15px',
            fontFamily: 'Segoe UI, sans-serif',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          },
          success: {
            style: {
              background: '#ecfdf5',
              color: '#065f46',
              border: '1px solid #a7f3d0',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: '#ecfdf5',
            },
          },
          error: {
            style: {
              background: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #fecaca',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fef2f2',
            },
          },
        }}
      />

      <Routes>
        

        // GLOBAL
        <Route path="/" element={<Home/>}/>


        // REGISTER
        <Route path="/verify" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<AccountScreen />} />


        // PURCHASE
        <Route path='/purchase' element={<Purchase/>}/>
        <Route path='/purchase/details' element={<ProductDetails/>}/>
        <Route path='/purchase/upload' element={<UploadPurchaseScreen/>}/>


        // FOUND
        <Route path='/found' element={<Found/>}/>
        <Route path='/found/details' element={<FoundDetails/>}/>
        <Route path='/found/upload' element={<UploadFoundScreen/>}/>


        
      </Routes>
    </BrowserRouter>
  )
}

export default App
