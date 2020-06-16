import shortid from 'shortid';

import { TutorialRequest, Tutorial } from '../interfaces/tutorial';

import { S3 } from '../aws';
import { Config } from '../config';

class TutorialService {

    /** Prepares a tutorial by creating the payload that can be inserted into the database */
    public static async prepareTutorial(tutorialRequest: TutorialRequest): Promise<Tutorial> {

        // These fields require some transformation prior to being ready to be part of a tutorial
        const tutorial = { ...tutorialRequest, 
            featuredImage: '',
            tags: tutorialRequest.tags.map((tag) => tag.toLowerCase())
         } as Tutorial;

         console.log('The fi', tutorialRequest.featuredImage);

        // If we have a featured image, we need to upload it to S3 and get the upload
        // URL prior to inserting the URL to our database
        if (typeof tutorialRequest.featuredImage === 'object') {
            tutorial.featuredImage = await TutorialService.uploadFeaturedImage(tutorialRequest.featuredImage.dataUrl);
        }

        // Otherwise, if a string, let it remain
        else { tutorial.featuredImage = tutorialRequest.featuredImage; }

        return tutorial;
    }

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
}

export default TutorialService;