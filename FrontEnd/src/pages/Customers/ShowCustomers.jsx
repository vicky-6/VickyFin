import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppLayout from "../../components/AppLayout";
import api from "../../api";


const ShowCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/api/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <AppLayout>
      <h3 className="text-center my-3">Customer List</h3>
      <Table bordered hover responsive style={{ animation: "fadeIn 0.8s ease-in-out" }}>
        <thead className="table-dark">
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Balance Amount</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c._id} style={{ backgroundColor: c.balanceAmount === 0 ? "#41d664ff" : "white" }}>
              <td>
                <Link to={`/customer/${c._id}`} className="text-primary fw-bold">
                  {c.userId}
                </Link>
              </td>
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>{c.amount}</td>
              <td>{c.balanceAmount}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <style>{`
        @keyframes fadeIn {
          from {opacity:0; transform: translateY(-20px);}
          to {opacity:1; transform: translateY(0);}
        }
      `}</style>
    </AppLayout>
  );
};

export default ShowCustomers;
