export interface UserService {
    login: (username: string, password: string) => Promise<LoginResponse>
    logout: () => Promise<void>
    register: (username: string, password: string, email: string) => Promise<void>
	token: string
}

export type LoginResponse = {
	token: string,
	refreshToken: string
}

const login = async (username: string, password: string) : Promise<LoginResponse> => {
	throw new Error;
};

const logout = async () : Promise<void> => {

};

const register = async (username: string, password: string, email: string) : Promise<void> => {
    
};

const token = '';

export const userService : UserService = {
	login,
	logout,
	register,
	token
};