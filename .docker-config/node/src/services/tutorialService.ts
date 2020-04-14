import { Tutorial } from '../interfaces/tutorial';
import axios from 'axios';

export class TutorialService {

    async getTutorials(): Promise<Tutorial[]> {
        return await this.executeRequest('/api/tutorials') as Tutorial[];
    }

    async getTutorial(slug: string): Promise<Tutorial> {
        return await this.executeRequest(`/api/tutorial/${slug}`) as Tutorial;
    }

    private async executeRequest(url: string): Promise<any> {

        try { 
            const response = await axios.get(url);
            return response.data;
        }

        catch (error) {
            console.log(`An error occurred fetching from ${url}`, error);
        }
    }
}