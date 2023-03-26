import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout'

const Create: NextPage = () => {

  const [columns, setColumns] = useState([
    {uid: Date.now(), id: 0, name: "", width: "", type: "text" },
    {uid: Date.now() + 1, id: 1, name: "", width: "", type: "text" }
  ]);
  const [tableName, setTableName] = useState("")
  
  const handleAddColumn = () => {
    const newId = columns.length;
    const uId = Date.now();
    setColumns([...columns, {uid: uId, id: newId, name: '', width: '', type: 'text' }]);
    console.log(columns)
  };

  const handleRemoveColumn = (index: number) => {
    const newColumns = columns.filter((_, idx) => idx !== index);
    setColumns(newColumns.map((column, idx) => ({ ...column, id: idx })));
  };
  
  const handleColumnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number, key: "name" | "width"| "type" ) => {
    const { value } = event.target;
    setColumns(prevColumns => {
      const newColumns = [...prevColumns];
      newColumns[index][key] = value;
      return newColumns;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ columns, tableName }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      // Success message or redirect to another page
    } catch (error) {
      console.error(error);
      // Error message
    }
  };

  return (
    <Layout
      title='テーブル作成'
      description='新しいテーブルを作成するページです。'
    >
      <div className='flex justify-center items-center flex-col'>
        <h1 className='m-5'>新規テーブル作成</h1>
        <div className="mb-6">
          <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">テーブル名を入力してください。</label>
          <input
            type="text"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setTableName(e.target.value)}
          />
        </div>
        <p className='mb-5 text-gray-500 text-xs'>テーブルカラムの設定ができます。カラム名、カラムタイプ、カラムサイズを選択してください。</p>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-2 lg:px-4">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                    <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Column Name</th>
                    <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Column Type</th>
                    <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Column Size</th>
                    <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">remove</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">

                  {columns.map((data, index) => (
                    <tr key={data.uid}>
                      <td className="whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex justify-center">
                          {index}
                        </div>
                      </td>

                      <td className="whitespace-nowrap">
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
                            <option value="date">Date</option>
                          </select>
                        </div>
                      </td>

                      <td className="whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex justify-center">
                          <input type="number" min="30" max="900" name="column_width" id="column_width" placeholder="width" className="px-2 block w-full sm:text-sm border-none outline-none"
                            onChange={(event) => handleColumnChange(event, index, "width")}
                          />px
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
          className="my-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleAddColumn()}
        >
          +
        </button>

        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            テーブルを作成
          </button>  
        </form>
      </div>
    </Layout>
  )
}

export default Create
