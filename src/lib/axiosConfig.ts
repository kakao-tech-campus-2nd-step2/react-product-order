import axios from 'axios';

const init = () => {
    const baseURL = 'https://react-gift-mock-api-self.vercel.app/api/v1';
    axios.defaults.baseURL = baseURL;
}

export default init