import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export const apiProtector = async (req: NextApiRequest, res: NextApiResponse, next: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
	const session = await getSession({req});
	if(!session) {
		res.status(401).json({message: 'Not authenticated!'});
		return;
	}    

	return next(req, res);
};