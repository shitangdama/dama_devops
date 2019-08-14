import axios from 'axios'

import api from '../config/api'

class ApiService {

    async apiCall(url, method = 'GET', token = false, params = null, query = null) {
        let payload = {
            url : url,
            method,
            query,
            headers: this.buildHeaders(token),
        }

        if (query) {
            payload.params = query;
        }
        if (params) {
            payload.data = params;
        }
        const res = await axios.request(payload).catch((error)=>{
            return error.response
        })

        return res;
    }

    buildHeaders(token = false) {
        let headers = {};
        headers['Content-type'] = 'application/json'
        if (token) {
            headers['Authorization'] = token
        }
        return headers;
    }

    // 测试 获取pods
    async getPods() {
        const token = null
        const url = `${api.pod}`
        const res = await this.apiCall(url, 'GET', token, null);
        console.log(res.data)
        return res.data["result"];
    }
}

export default new ApiService()