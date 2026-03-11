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
    background: "#FFFFFF",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
    marginTop: "20px",
    border: "1px solid #E5E7EB",
  },

  heading: {
    marginBottom: "20px",
    color: "#1F2937",
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
    backgroundColor: "#EEF2FF",
    padding: "12px",
    textAlign: "left",
    fontSize: "14px",
    color: "#374151",
    borderBottom: "2px solid #E5E7EB",
  },

  tr: {
    borderBottom: "1px solid #F1F5F9",
  },

  td: {
    padding: "12px",
    fontSize: "14px",
    color: "#4B5563",
  },

  badge: {
    backgroundColor: "#E0E7FF",
    color: "#4338CA",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
  },

  deleteBtn: {
    backgroundColor: "#EF4444",
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
    color: "#6B7280",
    fontSize: "15px",
  },
};

export default EmployeeList;