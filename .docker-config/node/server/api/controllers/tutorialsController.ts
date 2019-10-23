
import { CraftGraphService } from "../services/craftGraphService";

export class TutorialsController {

    cs: CraftGraphService;

    constructor() {
        this.cs = new CraftGraphService();
    }

    getTutorials = async (request, response) => {
        let tutorials = await this.cs.getTutorials();

        response.status(200).json(tutorials);
    }

    getTutorial = async (request, response) => {
        let { slug } = request.params;
        let tutorial = await this.cs.getTutorial(slug);

        response.status(200).json(tutorial);
    }
}