import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Table, Spinner, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import api from "../../api";

export default function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/api/customers/${id}`)
      .then(res => {
        setCustomer(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch customer details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner animation="border" className="m-4" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!customer) return <Alert variant="warning">No customer found</Alert>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container my-4"
    >
      <Card className="shadow-lg border-0 rounded-4 p-3">
        <Card.Body>
          <h2 className="text-center mb-4 text-primary fw-bold">
            Customer Details
          </h2>

          <Table striped bordered hover responsive>
            <tbody>
              <tr>
                <th>User ID</th>
                <td>{customer.userId}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{customer.name}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{customer.phone}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{customer.email || "N/A"}</td>
              </tr>
              <tr>
                <th>Amount</th>
                <td>₹{customer.amount}</td>
              </tr>
              <tr>
                <th>Interest / Month</th>
                <td>{customer.interestPerMonth}%</td>
              </tr>
              <tr>
                <th>Duration</th>
                <td>{customer.duration} months</td>
              </tr>
              <tr>
                <th>Total Amount</th>
                <td>₹{customer.totalAmount}</td>
              </tr>
              <tr>
                <th>Balance Amount</th>
                <td className="fw-bold text-danger">₹{customer.balanceAmount}</td>
              </tr>
            </tbody>
          </Table>

          <h4 className="mt-4 mb-3 text-success">Transactions</h4>
          {customer.transactions && customer.transactions.length > 0 ? (
            <Table bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Amount</th>
                  <th>Payment Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {customer.transactions.map((t, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <td>{index + 1}</td>
                    <td>₹{t.amount}</td>
                    <td>{t.paymentType}</td>
                    <td>{new Date(t.createdAt).toLocaleString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="info">No transactions found</Alert>
          )}
        </Card.Body>
      </Card>
    </motion.div>
  );
}
