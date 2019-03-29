import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'https://react-burger-builder-faf38.firebaseio.com/'
})

export default instance;