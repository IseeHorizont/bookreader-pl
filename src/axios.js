import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8091/bookreader/api/v1'
});

export default instance;