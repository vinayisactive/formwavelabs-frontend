const TableHeader = ({ headers }: { headers: string[] }) => (
    <thead className="bg-gray-50 border-gray-300">
      <tr>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border border-gray-300">
          No.
        </th>
        {headers.map((header) => (
          <th
            key={header}
            className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border border-gray-300 whitespace-nowrap"
          >
            {header}
          </th>
        ))}
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border border-gray-300 whitespace-nowrap">
          Submitted At
        </th>
      </tr>
    </thead>
  );


  export default TableHeader; 