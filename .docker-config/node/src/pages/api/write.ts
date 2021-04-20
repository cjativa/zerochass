import type { NextApiRequest, NextApiResponse } from 'next';
import shortid from 'shortid';

import protectWithAuthentication from '../../../server/api/middleware/protectWithAuthentcation';
import { TutorialDB } from '../../../server/dataAccess/tutorials/entity';
import { TutorialRequest } from '../../../server/api/interfaces/tutorial';
import Config from '../../../server/utils/config';
import S3 from '../../../server/services/awsService';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {

    const method = request.method.toLowerCase();

    if (method === 'get') {
        return WriteService.retrieveTutorial(request, response);
    }

    if (method === 'post') {
        return WriteService.createTutorial(request, response);
    }

    if (method === 'put') {
        return WriteService.updateTutorial(request, response);
    }
};

class WriteService {

    /** Handles retrieving a tutorial for editing */
    public static async retrieveTutorial(request: any, response: NextApiResponse) {

        // Get the tutorial
        const { id } = request.query
        const { userId } = request;

        const tutorialForEditing = await TutorialDB.getTutorialForEditing(userId, id);

        response.json({
            tutorial: tutorialForEditing
        });
    };


    /** Handles creating a new tutorial in the databse */
    public static async createTutorial(request: any, response: NextApiResponse) {

        // Get the tutorial to write and the user id for it
        const tutorialRequest = request.body as TutorialRequest;
        const { userId } = request;

        const preparedTutorial = await WriteService.prepareTutorial(tutorialRequest);
        const tutorial = await TutorialDB.addTutorial(preparedTutorial, userId);

        response.json(tutorial.id);
    };

    /** Handles updating an existing tutorial in the database */
    public static async updateTutorial(request: any, response: NextApiResponse) {

        // Get the tutorial to write
        const tutorialRequest = request.body as TutorialRequest;
        const { userId } = request;

        const preparedTutorial = await WriteService.prepareTutorial(tutorialRequest);
        const updatedTutorial = await TutorialDB.updateTutorial(preparedTutorial, userId);

        response.json({ ...updatedTutorial });
    };

    /** Uploads a featured image for the tutorial */
    private static uploadFeaturedImage = async (featuredImageDataUrl: string): Promise<string> => {

        const dataUrl = featuredImageDataUrl;
        const base64 = Buffer.from(dataUrl.replace(/^data:image\/\w+;base64,/, ""), 'base64');

        const params = {
            Bucket: `${Config.awsBucket}/featured-images`,
            Key: `${shortid.generate()}.png`,
            Body: base64,
            ACL: 'public-read',
            ContentEncoding: 'base64',
            ContentType: 'image/png'
        };

        // Get the url for the uploaded image and store it in the tutorial
        const { Location } = await S3.upload(params);
        return Location;
    };

    /** Prepares a tutorial by creating the payload that can be inserted into the database */
    public static async prepareTutorial(tutorialRequest: TutorialRequest): Promise<any> {

        // These fields require some transformation prior to being ready to be part of a tutorial
        const tutorial = {
            ...tutorialRequest,
            featuredImage: '',
            tags: tutorialRequest.tags.map((tag) => tag.toLowerCase())
        };

        // If we have a featured image, we need to upload it to S3 and get the upload
        // URL prior to inserting the URL to our database
        if (typeof tutorialRequest.featuredImage === 'object') {
            tutorial.featuredImage = await WriteService.uploadFeaturedImage(tutorialRequest.featuredImage.dataUrl);
        }

        // Otherwise, if a string, let it remain
        else { tutorial.featuredImage = tutorialRequest.featuredImage; }

        return tutorial;
    }
}

export default protectWithAuthentication(handler);