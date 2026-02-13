import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <h3>Productivity Manager</h3>

      {token && (
        <button onClick={logoutHandler} style={styles.btn}>
          Logout
        </button>
      )}
    </div>
  );
}
const styles = {
  nav: {
    display: "flex",
    justifyContent: "center",   // ⭐ center everything
    alignItems: "center",
    padding: "18px",
    backgroundColor: "#1f2937",
    color: "white",
    position: "relative",
  },
  btn: {
    position: "absolute",      // ⭐ logout right side
    right: "30px",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};


export default Navbar;
