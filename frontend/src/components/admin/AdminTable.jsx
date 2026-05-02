const AdminTable = ({ columns, rows, actions }) => (
  <div className="admin-table-wrap">
    <table className="admin-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
          {actions ? <th>Actions</th> : null}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row._id}>
            {columns.map((column) => (
              <td key={`${row._id}-${column.key}`}>{column.render ? column.render(row) : row[column.key]}</td>
            ))}
            {actions ? <td>{actions(row)}</td> : null}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminTable;
