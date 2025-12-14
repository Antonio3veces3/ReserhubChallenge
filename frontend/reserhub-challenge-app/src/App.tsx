import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import { SignIn } from './pages/Auth/SignIn'
import { SignUp } from './pages/Auth/SignUp'
import { Home } from './pages/Home'
import { Places } from './pages/Places'
import { City } from './pages/City'
import { Navbar } from './components/Navbar'

function AppLayout() {
  const location = useLocation()
  const isAuthPage = location.pathname.startsWith('/auth')

  return (
    <div className={isAuthPage ? '' : 'pt-16'}>
      {!isAuthPage && <Navbar />}
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />

        {/* App Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/places" element={<Places />} />
        <Route path="/city" element={<City />} />

        {/* Redirect root to sign-in */}
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
