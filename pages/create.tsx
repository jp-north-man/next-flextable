import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout'

const Create: NextPage = () => {

  const [columns, setColumns] = useState([{ name: "", type: "text" },{ name: "", type: "text" }]);
  const handleAddColumn = () => {
    setColumns([...columns, { name: "", type: "text" }]);
    console.log(columns)
  };
  const handleRemoveColumn = (index: number) => {
    setColumns([...columns.slice(0, index), ...columns.slice(index + 1)]);
    console.log(columns)
  };

  const handleColumnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number, key: "name" | "type") => {
    const { value } = event.target;
    console.log("value:",value, "index:",index,"key:",key)
    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      newColumns[index][key] = value;
      return newColumns;
    });
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

                  {columns.map((data, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap">
                        {index}
                        <div className="text-sm text-gray-900 flex justify-center">
                          <input type="text" name="column_name" id="column_name" placeholder="Enter column name" className="px-2 block w-full sm:text-sm border-none outline-none"
                            onChange={(event) => handleColumnChange(event, index, "name")}
                          />
                        </div>
                      </td>
                      <td className="whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex justify-center">
                          <select name="column_type" id="column_type" className="px-2 block w-full sm:text-sm border-none bg-white outline-none"
                            onChange={(event) => handleColumnChange(event, index, "type")}
                          >
                            <option value="text">Text</option>
                            <option value="button">Button</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="date">Date</option>
                          </select>
                        </div>
                      </td>
                      <td className="whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex justify-center">
                          <button
                            type="button"
                            className="bg-white hover:bg-gray-300 font-bold py-2 px-4 rounded text-gray-900"
                            onClick={() => handleRemoveColumn(index)}
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