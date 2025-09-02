import React, { useState, useEffect } from "react";
import api from "../../api"

const AgentPage = () => {
  const [agents, setAgents] = useState([]);
  const [agent, setAgent] = useState({ name: "", email: "", phone: "" });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "" });

  // Fetch agents
  const fetchAgents = async () => {
    try {
      const res = await api.get("/api/agents");
      setAgents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // Add new agent
  const handleChange = (e) => {
    setAgent({ ...agent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/agents", agent);
      alert("Agent added successfully!");
      setAgent({ name: "", email: "", phone: "" });
      fetchAgents();
    } catch (err) {
      console.error(err);
      alert("Error adding agent");
    }
  };

  // Delete agent
  const deleteAgent = async (id) => {
    try {
      await api.delete(`/api/agents/${id}`);
      fetchAgents();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit agent
  const startEdit = (agent) => {
    setEditId(agent._id);
    setEditData(agent);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const updateAgent = async () => {
    try {
      await api.put(`/api/agents/${editId}`, editData);
      setEditId(null);
      fetchAgents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4" style={{ width: "100%", maxWidth: "1200px" }}>
      {/* Add Agent Form */}
      <div className="card shadow p-4 mb-4">
        <h3 className="mb-3 text-primary">Add New Agent</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <input
                type="text"
                className="form-control"
                name="name"
                value={agent.name}
                onChange={handleChange}
                placeholder="Enter agent name"
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                value={agent.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>
            <div className="col-md-4 mb-3">
              <input
                type="text"
                className="form-control"
                name="phone"
                value={agent.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Save Agent
          </button>
        </form>
      </div>

      {/* Agents Table */}
      <div className="card shadow p-4">
        <h3 className="mb-3 text-success">Agents List</h3>
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th style={{ width: "180px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent._id}>
                {editId === agent._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleEditChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="phone"
                        value={editData.phone}
                        onChange={handleEditChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <button
                        onClick={updateAgent}
                        className="btn btn-success btn-sm me-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="btn btn-secondary btn-sm"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{agent.name}</td>
                    <td>{agent.email}</td>
                    <td>{agent.phone}</td>
                    <td>
                      <button
                        onClick={() => startEdit(agent)}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAgent(agent._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentPage;
