import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <Link to="/">Home</Link>
            <Link to="/favorites">Favorites</Link>
        </nav>
    );
};

export default Navbar;
