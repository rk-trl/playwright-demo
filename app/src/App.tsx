import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { AboutPage } from './pages/About'
import { ContactPage } from './pages/Contact'
import { DashboardPage } from './pages/Dashboard'
import { HomePage } from './pages/Home'
import { ServicesPage } from './pages/Services'

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
