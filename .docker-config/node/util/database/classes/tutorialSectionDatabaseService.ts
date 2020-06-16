import { Client } from '../client';
import { Tutorial } from '../../interfaces/tutorial';


export class TutorialSectionService {

    /** Adds or updates the sections for a tutorial */
    public static async addSections(tutorialId: number, tutorialSections: Tutorial['sections']) {

        const sectionRequests = tutorialSections.map((section) => {
            let query, values;
            const { title, content, id } = section;

            // If the section has an id, then it needs to be updated
            if (id) {
                query = `
                UPDATE tutorial_sections 
                SET 
                    "title" = ($1),
                    "content" = ($2)
                WHERE "id" = ($3) AND "tutorialId" = ($4)
                `;
                values = [title, content, id, tutorialId];
            }

            // Otherwise, no existing id means it's an insert
            else {
                query = `
                INSERT INTO tutorial_sections ("title", "content", "tutorialId")
                VALUES ($1, $2, $3)
                `;
                values = [title, content, tutorialId];
            }

            return Client.executeQuery(query, values);
        });

        await Promise.all(sectionRequests);
    };

    /** Deletes any sections that from the tutorial that exist in the database but were not sent along with an update */
    public static async deleteSections(tutorialId: number, providedSections: Tutorial['sections'] ) {

        // Retrieve the sections this tutorial has in the database
        const existingSections = await this.retrieveSectionsForTutorial(tutorialId);

        // Iterate through the sections we've been provided by the request
        const sectionsToDelete = existingSections.filter((existingSection) => {

            // An existing section should be deleted if it is no longer in the listed of provided sections
            // Does the existing section match one of the provided sections? 
            // As long as one of the existing sections matched a provided section it will not be deleted
            const sectionShouldBeDeleted = (providedSections
                .some((providedSection) => providedSection.id == existingSection.id) == false);

            return sectionShouldBeDeleted;
        });

        console.log(`The sections to delete`);
        console.log(sectionsToDelete);
    };

    /** Retrieve the sections for the tutorial */
    public static async retrieveSectionsForTutorial(tutorialId: number): Promise<Tutorial['sections']> {

        const query = `
        SELECT id, title, content
        FROM tutorial_sections 
        WHERE "tutorialId" = ($1)
        ORDER BY "id" ASC   
        `;
        const values = [tutorialId];

        const sections = (await Client.executeQuery(query, values)).rows;
        return sections;
    };
}