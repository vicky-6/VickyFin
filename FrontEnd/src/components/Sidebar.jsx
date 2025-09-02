import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#1e293b",
        color: "white",
        height: "100vh",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>VickyFin</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "15px 0" }}>
            <Link to="/customers" style={{ color: "white", textDecoration: "none" }}>
              Customer Details
            </Link>
          </li>
          <li style={{ margin: "15px 0" }}>
            <Link to="/agents" style={{ color: "white", textDecoration: "none" }}>
              Agents Details
            </Link>
          </li>
          <li style={{ margin: "15px 0" }}>
            <Link to="/collection" style={{ color: "white", textDecoration: "none" }}>
              Today's Collection
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
