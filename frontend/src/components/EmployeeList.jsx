import API from "../api";

function EmployeeList({ employees, refreshEmployees, loading }) {

  const handleDelete = async (id) => {
    try {
      await API.delete(`employees/${id}/`);
      refreshEmployees();
    } catch (error) {
      alert("Error deleting employee");
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Employee List</h3>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Employee ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={styles.messageCell}>
                  Loading employees...
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.messageCell}>
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id} style={styles.tr}>
                  <td style={styles.td}>{emp.id}</td>
                  <td style={styles.td}>{emp.employee_id}</td>
                  <td style={{ ...styles.td, fontWeight: "600" }}>
                    {emp.full_name}
                  </td>
                  <td style={styles.td}>{emp.email}</td>
                  <td style={styles.td}>
                    <span style={styles.badge}>{emp.department}</span>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginTop: "20px",
  },
  heading: {
    marginBottom: "20px",
    color: "#2c3e50",
    fontSize: "22px",
    fontWeight: "600",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#f4f6f9",
    padding: "12px",
    textAlign: "left",
    fontSize: "14px",
    color: "#34495e",
    borderBottom: "2px solid #e0e6ed",
  },
  tr: {
    borderBottom: "1px solid #eaeaea",
  },
  td: {
    padding: "12px",
    fontSize: "14px",
    color: "#555",
  },
  badge: {
    backgroundColor: "#e3f2fd",
    color: "#1976d2",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
  },
  deleteBtn: {
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  messageCell: {
    textAlign: "center",
    padding: "20px",
    color: "#777",
    fontSize: "15px",
  },
};

export default EmployeeList;