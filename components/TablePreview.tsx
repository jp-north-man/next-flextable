// components/TablePreview.tsx
import React from 'react';

interface TablePreviewProps {
  columns: any[];
}

const TablePreview: React.FC<TablePreviewProps> = ({ columns }) => {
  return (
    <div>
      <h2 className="my-5">プレビュー</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{ minWidth: `${column.width}px` }}
              >
                {column.name || `Column ${index}`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            {columns.map((column, index) => (
              <td key={index} className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {column.type === 'text' && 'Sample text'}
                  {column.type === 'button' && (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Button
                    </button>
                  )}
                  {column.type === 'date' && '2023-03-28'}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablePreview;
