import React, { useState, useEffect } from "react";
import AppLayout from "../../components/AppLayout";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import api from "../../api";

const AddCollection = () => {
  const [customers, setCustomers] = useState([]);
  const [collection, setCollection] = useState({
    customerId: "",
    amount: "",
    paymentType: "Cash",
    createdAt: new Date().toISOString()
  });

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

  const handleChange = (e) => {
    setCollection({ ...collection, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/collections", collection);
      alert("Collection added successfully!");
      setCollection({
        customerId: "",
        amount: "",
        paymentType: "Cash",
        createdAt: new Date().toISOString()
      });
      fetchCustomers();
    } catch (err) {
      console.error(err);
      alert("Error saving collection");
    }
  };

  return (
    <AppLayout>
      <div className="d-flex justify-content-center mt-4">
        <Card style={{ width: "600px", padding: "20px", animation: "fadeIn 1s ease-in-out" }}>
          <h3 className="text-center mb-3">Add Collection</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select Customer</Form.Label>
              <Form.Select
                name="customerId"
                value={collection.customerId}
                onChange={handleChange}
                required
              >
                <option value="">Select Customer</option>
                {customers.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name} ({c.phone})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={collection.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Payment Type</Form.Label>
              <Form.Select
                name="paymentType"
                value={collection.paymentType}
                onChange={handleChange}
              >
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" variant="success" className="w-100">
              Save Collection
            </Button>
          </Form>
        </Card>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {opacity:0; transform: translateY(-20px);}
          to {opacity:1; transform: translateY(0);}
        }
      `}</style>
    </AppLayout>
  );
};

export default AddCollection;
