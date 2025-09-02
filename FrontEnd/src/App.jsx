import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Customers from "./pages/Customers/Customers";
import Agents from "./pages/Agents/Agents";
import Collections from "./pages/Collections/Collection";
import CustomerDetails from "./pages/Customers/CustomerDetails";

export default function App() {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Sidebar (flex child, not fixed) */}
        <Sidebar />

        {/* Right side content */}
        <div
          style={{
            flex: 1,
            padding: "20px", // keep padding for spacing INSIDE content
            background: "#f8fafc",
            overflowY: "auto",
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/customers" />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/collection" element={<Collections />} />
             <Route path="/customer/:id" element={<CustomerDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
