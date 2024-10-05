import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const getUserToken = async() => {
    return await AsyncStorage.getItem('userToken');
}

const Api  =  axios.create({
    baseURL: 'https://buatpc.com/nagamas/api',
    timeout: 1000,
});

export default Api;