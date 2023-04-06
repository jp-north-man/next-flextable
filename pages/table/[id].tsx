import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import type { NextPage } from 'next'
import { Layout } from '../../components/Layout';

type Column = {
	name: string;
	type: 'text' | 'button' | 'date';
	width: number;
};

const Table: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [columns, setColumns] = useState<Column[]>([]);
  const [tableName, setTableName] = useState('');

	useEffect(() => {
    console.log("id: ",id)
    const fetchTable = async () => {
      try {
        if (id) {
          const response = await fetch('http://localhost:3000/api/table', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
          });
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const { columns, tableName } = await response.json();

          setColumns(columns);
          setTableName(tableName);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTable();
  }, [id]);

  return (
    <Layout
      title={`${tableName} - FlexTable`}
      description={`テーブル${tableName}を表示しています。`}
    >
      <div className="flex justify-center items-center flex-col">
        <h1 className="m-5">{tableName}</h1>
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                style={{
                  minWidth: `${column.width}px`,
                  maxWidth: `${column.width}px`,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {column.name || `Column ${index}`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
          {columns.map((column, index) => (
            <td key={index} className="px-2 py-3">
              <div
                className="text-sm text-gray-900"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {column.type === 'text' && (
                  <input
                    type="text"
                    className="border rounded p-1 sm:text-sm border-none outline-none"
                    placeholder="Sample text"
                    style={{
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  />
                )}
                {column.type === 'button' && (
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
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
    </Layout>
  );
};

export default Table;
