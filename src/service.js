import axios from 'axios';

const url = 'http://localhost:3000/api';

class Service {
    static sendData(data) {
        return axios.post(url, data);
    }
}

export default Service;