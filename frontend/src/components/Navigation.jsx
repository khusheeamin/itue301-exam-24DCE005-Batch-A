import { NavLink } from 'react-router-dom';

export default function Navigation() {
    return (
        <header className="site-header">
            <NavLink className="brand" to="/">
                <span className="brand-mark">C</span>
                <span>Charotar Library</span>
            </NavLink>
            <nav className="main-nav" aria-label="Main navigation">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/books">Books</NavLink>
                <NavLink className="nav-action" to="/borrow">Borrow a book</NavLink>
            </nav>
        </header>
    );
}
