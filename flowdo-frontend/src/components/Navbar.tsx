import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">FlowDo</h1>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
