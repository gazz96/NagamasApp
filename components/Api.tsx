import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://buatpc.com/nagamas/api',
    timeout: 10000,
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

export default Api;