import { NextApiRequest } from 'next';

export const checkHttpMethod = (req: NextApiRequest, allowedMethod: 'GET' | 'POST' | 'PUT' | 'DELETE') : void => {
	if(req.method !== allowedMethod) {
		throw new Error('method is not allowed');
	}
};