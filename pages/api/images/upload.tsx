import { IncomingMessage } from 'http';
import multer from 'multer';
import nextConnect from 'next-connect';

type IncomingFileMessage = IncomingMessage & {
    file: Express.Multer.File
}

const upload = multer({dest: 'uploads/'});

const apiRoute = nextConnect();

apiRoute.use(upload.single('upload'));

apiRoute.post((req : IncomingFileMessage, res : any) => {
	res.status(200).json({ data: 'success' , guid: req.file.filename });
});

export default apiRoute;

export const config = {
	api: {
		bodyParser: false,
		sizeLimit: '1mb'
	},
};