import shortid from 'shortid';

import { TutorialRequest, Tutorial } from '../interfaces/tutorial';
import { TutorialDatabaseService } from '../database/classes/tutorialDatabaseService';

import { S3 } from '../aws';
import { Config } from '../config';

class TutorialService {

    /** Creates a tutorial in the database */
    public static createTutorial = async (tutorialRequest: TutorialRequest, userId: number) => {

        const tutorial = { ...tutorialRequest, featuredImage: '' } as Tutorial;

        // If we have a featured image, we need to upload it to S3 prior to inserting the URL into our database
        if (tutorialRequest.featuredImage) {
            tutorial['featuredImage'] = await TutorialService.uploadFeaturedImage(tutorialRequest.featuredImage);
        }

        // Get the id for the created tutorial
        const ts = new TutorialDatabaseService(tutorial, userId);
        const id = await ts.createTutorial();

        if (id) {
            const { sections, tags } = tutorialRequest;
            await ts.addSections();
        }

        return id;
    };

    /** Updates an existing tutorial */
    public static updateTutorial = async (tutorialRequest: TutorialRequest, userId: number) => {

        const tutorial = { ...tutorialRequest, id: tutorialRequest.id } as any;

        // If we have a featured image and it's an object
        // We need to upload it to S3 prior to inserting the URL into our database
        if (typeof tutorialRequest.featuredImage === 'object') {
            tutorial['featuredImage'] = await TutorialService.uploadFeaturedImage(tutorialRequest.featuredImage);
        }

        const ts = new TutorialDatabaseService(tutorial, userId);
        const id = await ts.updateTutorial();

        // If we successfully updated the tutorial, tutorial id is returned
        if (id) {
            const { sections, tags } = tutorial;
            await ts.addSections();
        }

        return id;
    }

    /** Retrieves existing tutorials for a user id */
    public static retrieveTutorials = async (userId: number) => {

        const ts = new TutorialDatabaseService(null, userId);
        return await ts.retrieveTutorials();
    };

    /** Retrieves a specific tutorial belonging to a specific user id*/
    public static retrieveTutorial = async (tutorialId: number, userId: number) => {

        const ts = new TutorialDatabaseService(null, userId);
        const tutorial = await ts.retrieveTutorial(tutorialId);

        if (tutorial) {
            tutorial['sections'] = await ts.retrieveSectionsForTutorial(tutorialId);
        }

        return tutorial;
    };

    /** Uploads a featured image for the tutorial */
    private static uploadFeaturedImage = async (featuredImage: TutorialRequest['featuredImage']): Promise<string> => {

        const dataUrl = featuredImage.dataUrl;
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
}

export default TutorialService;