import * as SingleService from '../services/singleService';

export const getAbout = async (request, response) => {
    const about = await SingleService.getSingleContent(`about`);
    response.json(about);
}

export const getContact = async (request, response) => {
    const contact = await SingleService.getSingleContent(`contact`);
    response.json(contact);
}