import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">

      <Link to="/">HOME</Link>

      <Link to="/case">CASE</Link>

      <Link to="/suspects">SUSPECTS</Link>

      <Link to="/evidence">EVIDENCE</Link>

      <Link to="/investigation">
        INVESTIGATION
      </Link>

    </nav>
  );
}

export default Navigation;