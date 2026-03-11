import { useState } from "react";
import API from "../api";

function EmployeeForm({ refreshEmployees }) {
  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("employees/", formData);
      setFormData({
        employee_id: "",
        full_name: "",
        email: "",
        department: ""
      });
      refreshEmployees();
    } catch (err) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;

        if (errorData.employee_id) {
          setError(errorData.employee_id[0]);
        } else if (errorData.email) {
          setError(errorData.email[0]);
        } else if (errorData.full_name) {
          setError(errorData.full_name[0]);
        } else {
          setError("Error adding employee.");
        }
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#EEF2FF"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#FFFFFF",
          padding: "30px 40px",
          borderRadius: "10px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          width: "350px",
          border: "1px solid #E5E7EB"
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#1F2937"
          }}
        >
          Add Employee
        </h3>

        {error && (
          <p
            style={{
              color: "#DC2626",
              textAlign: "center",
              fontSize: "14px"
            }}
          >
            {error}
          </p>
        )}

        <input
          type="text"
          name="employee_id"
          placeholder="Employee ID"
          value={formData.employee_id}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#6366F1",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "10px",
            fontWeight: "500"
          }}
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "9px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #D1D5DB",
  outline: "none"
};

export default EmployeeForm;