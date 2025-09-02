import React, { useState, useEffect } from "react";
import api from "../../api";

const ShowCollections = ({ refreshKey }) => {
  const [collections, setCollections] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await api.get("/api/collections");
        setCollections(res.data);
      } catch (err) {
        console.error("Error fetching collections:", err);
      }
    };
    fetchCollections();
  }, [refreshKey]);

  const filteredCollections = filterDate
  ? collections.filter((c) => {
      const collectionDate = new Date(c.createdAt)
        .toISOString()
        .split("T")[0]; // YYYY-MM-DD format
      return collectionDate === filterDate;
    })
  : collections;

  return (
    <div className="card shadow p-4">
      <h3 className="mb-3 text-center">All Collections</h3>

      {/* Date Filter */}
      <div className="mb-3">
        <label className="form-label">Filter by Date</label>
        <input
          type="date"
          className="form-control"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Payment Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredCollections.length > 0 ? (
            filteredCollections.map((col) => (
              <tr key={col._id}>
                <td>{col.customerId?.name}</td>
                <td>{col.customerId?.phone}</td>
                <td>{col.amount}</td>
                <td>
                  {new Date(col.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td>{col.paymentType}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No collections found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowCollections;
