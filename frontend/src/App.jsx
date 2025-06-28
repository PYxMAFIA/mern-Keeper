import { Route, Routes, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import NoteDetainPage from './pages/NoteDetailPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import useAuth from './store/useAuth.js'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'

const App = () => {
  const { authUser, checkAuth,isCheckAuth } = useAuth()
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log("App render - authUser:", authUser, "isCheckAuth:", isCheckAuth)

  if(isCheckAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size=10 animate-spin' />
    </div>
  )

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signUp" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/create" element={authUser ? <CreatePage /> : <Navigate to="/login" />} />
        <Route path="/note/:id" element={authUser ? <NoteDetainPage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App;
