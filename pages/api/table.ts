import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      const { id } = req.body;
      console.log(id)
      const idAsNumber = parseInt(id, 10);
      const response = await fetch('http://localhost:8080/table', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: idAsNumber}),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const { columns, tableName } = await response.json();

      res.status(200).json({ columns, tableName });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
