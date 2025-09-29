import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-black/80 backdrop-blur sticky top-0 z-50">
      {/* App Logo / Title */}
      <Link to="/" className="text-2xl font-bold text-red-500 tracking-wide">
        MovieSearchApp
      </Link>

      {/* Navigation Menu */}
      <nav className="flex gap-6 text-gray-300">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-red-400 font-semibold" : "hover:text-red-400"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? "text-red-400 font-semibold" : "hover:text-red-400"
          }
        >
          Favorites
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
