import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './login.css'
import './register.css'
import Forget from './forget.jsx'
import './forget.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './login.jsx';
import Register from './register.jsx';
import NotFound from './notfound.jsx';
import LandingPage from './landing.jsx'
import Profile from './profile.jsx'
import './profile.css'
import Dashboard from './dashboard.jsx'
import './dashboard.css'
import MyMarks from './mymarks.jsx'
import './mymarks.css'
import Courses from './course.jsx'
import './course.css'
import './fees.css'
import ProtectedRoute from './ProtectedRoute.jsx'
import Fees from './fees.jsx'
const router = createBrowserRouter([
  {
    path : '/',
    element : <LandingPage/> ,
    errorElement : <NotFound/>
  },
  {
    path : '/login',
    element : <Login/>
  },
  {
    path : '/register',
    element : <Register/>
  },
  {
    path : '/forget',
    element : <Forget/>
  },
   {
    path : '/profile',
    element : <Profile/>
  },
  {
    path : '/dashboard',
    element : <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
  },
   {
    path : '/mymarks',
    element : <MyMarks/>
  },
  {
    path : '/courses',
    element : <Courses/>
  },
  {
    path : '/fees',
    element : <Fees/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <RouterProvider router={router}/>
    
  </StrictMode>,
)
