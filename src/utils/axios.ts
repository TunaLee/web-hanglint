import axios from 'axios';
import { useCookies } from 'react-cookie';

const customAxios = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
});

customAxios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 403) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

const useCustomAxios = () => {
    const [cookies] = useCookies(['token']);
    customAxios.defaults.headers.common['Authorization'] = `Token ${cookies.token}`;
    return customAxios;
};

export default useCustomAxios;
