// src/components/Table.jsx
export default function Table({ columns, data = [], emptyText = "Tidak ada data" }) {
  // pastikan selalu array
  const rowsSafe = Array.isArray(data) ? data : [];

  //hidden tidak tampil dimobile
  const isHiddenOnMobile = (col) =>
    (col.className || "").split(/\s+/).includes("hidden");

  return (
    <div className="rounded-lg border border-gray-200 shadow overflow-x-auto">
      {/* ===== Desktop / Tablet ===== */}
      <div className="hidden md:block rounded-lg">
        <table className="w-full text-sm text-left table-auto">
          <thead className="bg-gray-600 text-white">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`px-4 py-2 font-semibold text-left ${
                    col.header === "No." ? "w-[60px]" :
                    col.header === "Aksi" ? "w-[120px] text-center" : "w-auto"
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rowsSafe.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-4 text-gray-500 text-center">
                  {emptyText}
                </td>
              </tr>
            ) : (
              rowsSafe.map((row, rIdx) => (
                <tr key={rIdx} className="odd:bg-white even:bg-gray-50">
                  {columns.map((col, cIdx) => {
                    const isActions = col.accessor === "actions";
                    return (
                      <td
                        key={cIdx}
                        className={`px-4 py-2 border-t border-gray-100 align-middle ${
                          isActions ? "text-center w-[180px]" : "text-left"
                        } ${col.className || ""}`}
                      >
                        {col.render
                          ? col.render(row, rIdx)
                          : col.accessor
                          ? row[col.accessor]
                          : null}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile (Card) ===== */}
      <div className="md:hidden divide-y">
        {rowsSafe.length === 0 ? (
          <div className="p-4 text-center text-gray-500">{emptyText}</div>
        ) : (
          rowsSafe.map((row, idx) => (
            <div key={idx} className="p-4 bg-white">
              <div className="grid grid-cols-1 gap-3">
                {columns
                  .filter((c) => c.accessor !== "actions" && !isHiddenOnMobile(c))
                  .map((col, i) => (
                    <div key={i} className="flex justify-between gap-3">
                      <span className="text-xs text-slate-500">{col.header}</span>
                      <span className="text-sm font-medium">
                        {col.render ? col.render(row, idx) : row[col.accessor]}
                      </span>
                    </div>
                  ))}
              </div>

              {columns.some((c) => c.accessor === "actions") && (
                <div className="mt-3 flex items-center justify-center gap-2">
                  {columns.find((c) => c.accessor === "actions")?.render?.(row, idx)}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
