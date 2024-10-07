import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const getUserToken = async () => {
    return await AsyncStorage.getItem('userToken');
}

const Api = axios.create({
    baseURL: 'https://buatpc.com/nagamas/api',
    timeout: 10000,
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

export default Api;