
import * as TutorialService from "../services/tutorialService";


export const getTutorials = async (request, response) => {
    let tutorials = await TutorialService.getTutorials();

    response.status(200).json(tutorials);
}

export const getTutorial = async (request, response) => {
    let { slug } = request.params;
    let tutorial = await TutorialService.getTutorial(slug);

    response.status(200).json(tutorial);
}