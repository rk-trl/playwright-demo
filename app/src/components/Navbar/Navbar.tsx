import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
  { to: '/dashboard', label: 'Dashboard' },
]

export function Navbar() {
  return (
    <header className={styles.header}>
      <nav aria-label="Main navigation" className={styles.navbar}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
            end={link.to === '/'}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
