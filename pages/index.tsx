import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout'

interface List {
  id: string;
  name: string;
}

const Home: NextPage = () => {

  const [data, setData] = useState<List[]>([]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((prevId) => prevId !== id));
    }
    console.log(selectedIds)
  };

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    if (checked) {
      const allIds = data.map(d => d.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
    console.log(selectedIds)

  }

  useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('/api/list', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include' // Send cookie
			});

			const data = await res.json();

			if (!res.ok) {
				return;
			}

			setData(data);
		};

		fetchData();
	}, []);

  return (
    <Layout
      title='top'
      description='top'
    >
      <div className='flex justify-center items-center flex-col'>
        <h1 className='m-8'>テーブル一覧</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input 
                      onChange={(e) => handleCheckAll(e)}
                      id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  テーブル名
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((datas, index) => (
                <tr key={datas.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                      <div className="flex items-center">
                          <input 
                            onChange={(e) => handleCheckboxChange(e, datas.id)}
                            id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                          />
                          <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                      </div>
                  </td>
                  <td className="px-6 py-4">
                    {datas.id}
                  </td>
                  <td className="px-6 py-4">
                    {datas.name}
                  </td>
                </tr>
              ))}
             
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default Home