import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { WatchlistContext } from '../context/WatchlistContext';

const Navbar = () => {
  const { watchlist } = useContext(WatchlistContext);

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/" className="navbar__title">
          MovieLand
        </Link>
        <span className="navbar__tag">Discover · Save · Stream</span>
      </div>

      <nav className="navbar__nav">
        <NavLink to="/" className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}>
          Discover
        </NavLink>
        <NavLink to="/watchlist" className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}>
          Watchlist
          {watchlist.length > 0 && <span className="navbar__badge">{watchlist.length}</span>}
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
