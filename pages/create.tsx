import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout'

const Create: NextPage = () => {

  const [columns, setColumns] = useState([{ name: "", type: "text" }]);
  const handleAddColumn = () => {
    setColumns([...columns, { name: "", type: "text" }]);
  };
  const handleRemoveColumn = (index: number) => {
    setColumns([...columns.slice(0, index), ...columns.slice(index + 1)]);
  };
  const handleColumnNameChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newColumns = [...columns];
    newColumns[index].name = event.target.value;
    setColumns(newColumns);
  };
  const handleColumnTypeChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newColumns = [...columns];
    newColumns[index].type = event.target.value;
    setColumns(newColumns);
  };

  return (
    <Layout
      title='テーブル作成'
      description='新しいテーブルを作成するページです。'
    >
      <div className='flex justify-center items-center flex-col'>
        <h1 className='m-8'>新規テーブル作成</h1>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Column Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Column Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">remove</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">

                  {columns.map((data, key) => (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <input type="text" name="column_name" id="column_name" placeholder="Enter column name" className="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <select name="column_type" id="column_type" className="block w-full shadow-sm sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md">
                            <option value="text">Text</option>
                            <option value="button">Button</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="date">Date</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleRemoveColumn(key)}
                          >
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>

                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleAddColumn()}
        >
          +
        </button>
      </div>
    </Layout>
  )
}

export default Create
