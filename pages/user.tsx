import { NextPage } from 'next';
import UserDetails from '../components/user-details';
import { Layout } from '../layout/layout';


const User : NextPage = () => {
	return(
		<Layout>
			<UserDetails/>
		</Layout>
	);
};

export default User;