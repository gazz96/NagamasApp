import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../components/Api";
import axios from "axios";

const AuthAction = {
    registerUser: async(data = {}) => {
        const response = await Api.post('/signup', data);
        return response.data;
    },
    login: async(data = {}) => {
        const response = await Api.post('/signin', data);
        return response.data;
    },
    me: async() => {
        const token = await AsyncStorage.getItem('userToken');
        const response = await Api.post('/me', {
            token: token
        });
        return response.data;
    }
}

export default AuthAction;