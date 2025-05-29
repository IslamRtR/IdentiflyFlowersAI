// components/Navbar.tsx
'use client';
import Link from 'next/link';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from './ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-[var(--nav-bg)] text-[var(--nav-text)] p-5 w-full fade-in">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-bold text-[var(--nav-text)] tracking-wide hover:text-[var(--nav-text-hover)] transition-all duration-300"
        >
          Identifly Flowers AI
        </Link>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-[var(--bg-card-hover)] transition-all duration-300"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <FaMoon className="text-[var(--nav-text)] text-xl" />
          ) : (
            <FaSun className="text-[var(--nav-text)] text-xl" />
          )}
        </button>
      </div>
    </nav>
  );
}
