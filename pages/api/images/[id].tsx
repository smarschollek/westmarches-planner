import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const {id} = req.query;
		if(!id) { 
			throw new Error('id is undefined');
		} 

		const filePath = path.resolve('uploads/' + id);
		const imageBuffer = fs.readFileSync(filePath);
		res.send(imageBuffer);
	} catch (error) {
		res.status(500).send('');    
	}
};

export default handler;