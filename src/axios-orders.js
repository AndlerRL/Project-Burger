import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-b87c7.firebaseio.com/'
})

export default instance;