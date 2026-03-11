import { useEffect, useState } from "react";
import API from "../api";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchName, setSearchName] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");

  const fetchEmployees = async () => {
    try {
      const response = await API.get("employees/");
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    let filtered = employees;

    if (searchName) {
      filtered = filtered.filter((emp) =>
        emp.full_name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (filterDepartment) {
      filtered = filtered.filter(
        (emp) => emp.department === filterDepartment
      );
    }

    setFilteredEmployees(filtered);
  }, [searchName, filterDepartment, employees]);

  const departments = [...new Set(employees.map((emp) => emp.department))];

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Employee Management</h1>

      {/* Add Employee */}
      <div style={styles.card}>
        <EmployeeForm refreshEmployees={fetchEmployees} />
      </div>

      {/* Filter + List */}
      <div style={styles.card}>
        <div style={styles.filterRow}>
          <input
            type="text"
            placeholder="🔍 Search employee..."
            value={searchName}
            style={styles.input}
            onChange={(e) => setSearchName(e.target.value)}
          />

          <select
            value={filterDepartment}
            style={styles.input}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <EmployeeList
          employees={filteredEmployees}
          refreshEmployees={fetchEmployees}
          loading={loading}
        />
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#F1F5F9",
    minHeight: "100vh",
  },

  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "25px",
    color: "#0F172A",
  },

  card: {
    background: "#FFFFFF",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    marginBottom: "25px",
  },

  filterRow: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    justifyContent: "space-between",
  },

  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #CBD5E1",
    fontSize: "14px",
    minWidth: "220px",
    outline: "none",
  },
};

export default Employees;