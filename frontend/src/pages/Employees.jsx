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

  // Filtering Logic
  useEffect(() => {
    let filtered = employees;

    if (searchName) {
      filtered = filtered.filter(emp =>
        emp.full_name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (filterDepartment) {
      filtered = filtered.filter(emp =>
        emp.department === filterDepartment
      );
    }

    setFilteredEmployees(filtered);
  }, [searchName, filterDepartment, employees]);

  // Get unique departments
  const departments = [...new Set(employees.map(emp => emp.department))];

  return (
    <div className="page-container">
     

      <div className="card">
         <h1>Employee Management</h1>
        <EmployeeForm refreshEmployees={fetchEmployees} />
      </div>

     

      <div className="card">
         {/* Filter Section */}
      <div style={styles.filter}>
        <h3>Filter Employees</h3>

        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          style={styles.date_input}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <br /><br />

        <select
          value={filterDepartment}
          style={styles.date_input}
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

  filter: {
    display: "flex",
    float:"right"
  },
  date_input: {
    padding: 0,
    width: 120,
    height: 35,
    margin: "10px"
  }
}
export default Employees;
