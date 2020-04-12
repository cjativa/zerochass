import axios from 'axios';

export const getContentForSingle = async (type: 'about' | 'contact') => {
    try {
        const response = (await axios.get(`/api/${type}`)).data;
        return response
    }

    catch (error) { console.log(`An error occurred fetching from /api/${type}`); }
}