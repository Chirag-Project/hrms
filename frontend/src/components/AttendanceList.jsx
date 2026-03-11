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

  presentBadge: {
    backgroundColor: "#DCFCE7",
    color: "#166534",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
  },

  absentBadge: {
    backgroundColor: "#FEE2E2",
    color: "#991B1B",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
  },

  messageCell: {
    textAlign: "center",
    padding: "20px",
    color: "#6B7280",
    fontSize: "15px",
  },
};

export default AttendanceList;