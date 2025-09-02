import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import api from "../../api";

export default function AddCustomer() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    amount: "",
    interestPerMonth: "",
    duration: "",
    emi: "",
    totalInterest: "",
    totalAmount: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };

    // Auto-calculate on amount/interest/duration change
    if (
      name === "amount" ||
      name === "interestPerMonth" ||
      name === "duration"
    ) {
      const amount = Number(updated.amount) || 0;
      const interestPerMonth = Number(updated.interestPerMonth) || 0;
      const duration = Number(updated.duration) || 0;

      const totalInterest = (amount * interestPerMonth * duration) / 100;
      const totalAmount = amount + totalInterest;
      const emi = duration > 0 ? totalAmount / duration : 0;

      updated.totalInterest = totalInterest.toFixed(2);
      updated.totalAmount = totalAmount.toFixed(2);
      updated.emi = emi.toFixed(2);
    }

    setForm(updated);
  };

  // Submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/customers", {
        ...form,
        amount: Number(form.amount),
        interestPerMonth: Number(form.interestPerMonth),
        duration: Number(form.duration),
        totalInterest: Number(form.totalInterest),
        totalAmount: Number(form.totalAmount),
        emi: Number(form.emi),
      });
      alert("Customer added successfully!");
      setForm({
        name: "",
        phone: "",
        email: "",
        address: "",
        amount: "",
        interestPerMonth: "",
        duration: "",
        emi: "",
        totalInterest: "",
        totalAmount: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding customer");
    }
  };

  return (
    <Card style={{ maxWidth: "600px", margin: "20px auto", padding: "20px" }}>
      <h3 className="text-center">Add New Customer</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email (Optional)</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Interest / Month (%)</Form.Label>
          <Form.Control
            type="number"
            name="interestPerMonth"
            value={form.interestPerMonth}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Duration (Months)</Form.Label>
          <Form.Control
            type="number"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Auto-calculated fields */}
        <Form.Group className="mb-3">
          <Form.Label>Total Interest</Form.Label>
          <Form.Control type="text" value={form.totalInterest} readOnly />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Total Amount</Form.Label>
          <Form.Control type="text" value={form.totalAmount} readOnly />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>EMI</Form.Label>
          <Form.Control type="text" value={form.emi} readOnly />
        </Form.Group>

        <Button type="submit" className="w-100 btn btn-primary">
          Add Customer
        </Button>
      </Form>
    </Card>
  );
}
