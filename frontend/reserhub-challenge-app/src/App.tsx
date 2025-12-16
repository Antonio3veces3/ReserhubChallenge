import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import { SignIn } from './pages/Auth/SignIn'
import { SignUp } from './pages/Auth/SignUp'
import { Home } from './pages/Home'
import { City } from './pages/City'
import { Navbar } from './components/Navbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProtectedRoute } from './components/ProtectedRoute'

function AppLayout() {
  const location = useLocation()
  const isAuthPage = location.pathname.startsWith('/auth')

  return (
    <div className={`${isAuthPage ? '' : 'pt-16'} bg-gray-100`}>
      {!isAuthPage && <Navbar />}
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />

        {/* App Routes */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/city" element={
          <ProtectedRoute>
            <City />
          </ProtectedRoute>} />

        {/* Redirect root to sign-in */}
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </div>
  )
}

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppLayout />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
