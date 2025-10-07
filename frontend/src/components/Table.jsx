function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
      <table className="w-full text-sm text-left">
        <thead className="bg-blue-600 text-white">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-2 font-semibold">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center p-4 text-gray-500">
                Tidak ada data
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 border-t border-gray-100">
                    {col.accessor === 'actions'
                      ? col.render(row)
                      : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;