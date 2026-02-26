function AttendanceList({ attendanceRecords, loading }) {
  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Attendance Records</h3>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Employee ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={styles.messageCell}>
                  Loading attendance...
                </td>
              </tr>
            ) : attendanceRecords.length === 0 ? (
              <tr>
                <td colSpan="5" style={styles.messageCell}>
                  No attendance records found.
                </td>
              </tr>
            ) : (
              attendanceRecords.map((record) => (
                <tr key={record.id} style={styles.tr}>
                  <td style={styles.td}>{record.id}</td>
                  <td style={styles.td}>{record.employee_id}</td>
                  <td style={{ ...styles.td, fontWeight: "600" }}>
                    {record.employee_name}
                  </td>
                  <td style={styles.td}>{record.date}</td>
                  <td style={styles.td}>
                    <span
                      style={
                        record.status === "Present"
                          ? styles.presentBadge
                          : styles.absentBadge
                      }
                    >
                      {record.status}
                    </span>
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
  presentBadge: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
  },
  absentBadge: {
    backgroundColor: "#ffebee",
    color: "#c62828",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
  },
  messageCell: {
    textAlign: "center",
    padding: "20px",
    color: "#777",
    fontSize: "15px",
  },
};

export default AttendanceList;