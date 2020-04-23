import { environment } from './config';
import axios from 'axios';

const { apiUrl, hitsPerPage } = environment;
const buildQueryParams = (request) => {
    let query = '';
    if (request.query) {
        query = `${query === '' ? '?' : '&'}query=${request.query}`;
    }
    if (request.page) {
        query = `${query === '' ? '?' : '&'}page=${request.page}`;
    }
    if (request.tags) {
        query += `${query === '' ? '?' : '&'}tags=${request.tags}`;
    }
    return query ? query + `&hitsPerPage=${hitsPerPage}` : query + `?hitsPerPage=${hitsPerPage}`;
}

export default {
    news() {
        return {
            getAll: (request?) => {
                const params = buildQueryParams(request);
                return axios.get(`${apiUrl}search_by_date${params}`);
            }
        }
    }
}