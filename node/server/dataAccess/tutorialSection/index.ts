import { Knex } from '../../database/knex';
import { makeTutorialSection } from '../../models/tutorialSection/index';
import { ITutorialSection } from '../../models/tutorialSection/tutorialSectionSchema';

export class TutorialSectionDAO {

    private static getSeparateSections(tutorialSections: ITutorialSection[]) {

        const sectionsToAdd: ITutorialSection[] = [];
        const sectionsToUpdate: ITutorialSection[] = [];

        tutorialSections.forEach((tutorialSection) => {

            // If there's an id then the section needs to be updated
            if (tutorialSection.hasOwnProperty('id')) {
                sectionsToUpdate.push(tutorialSection)
            }

            // Otherwise, no id means it needs to be added
            else {
                sectionsToAdd.push(tutorialSection);
            }
        });

        return {
            sectionsToAdd,
            sectionsToUpdate,
        };
    };

    /** something */
    public static async listTutorialSections(tutorialId: number): Promise<ITutorialSection[]> {
        return await Knex
            .select('*')
            .from('tutorial_sections')
            .where('tutorialId', tutorialId)
    };

    public static async addOrUpdateTutorialSection(tutorialSections: ITutorialSection[], tutorialId: string | number): Promise<ITutorialSection[]> {
        const { sectionsToAdd, sectionsToUpdate } = TutorialSectionDAO.getSeparateSections(tutorialSections);
        let addedSections: ITutorialSection[] = [];
        let updatedSections: ITutorialSection[] = [];

        const sectionsWithId = sectionsToAdd.map((section) => {
            return {
                ...section,
                tutorialId,
            };
        });

        if (sectionsToAdd.length > 0) {
            const addedSections = await Knex('tutorial_sections')
                .insert(sectionsWithId)
                .returning('*');
            addedSections.push(...addedSections);
        }

        if (sectionsToUpdate.length > 0) {
            for (let i = 0; i < sectionsToUpdate.length; i++) {
                const section = sectionsToUpdate[i];
                const updatedSection = await Knex('tutorial_sections')
                    .update(section)
                    .where({ 'id': section.id, 'tutorialId': tutorialId })
                    .returning('*');
                updatedSections.push(...updatedSection);
            }
        }

        return [...addedSections, ...updatedSections];
    };

    public static async deleteTutorialSection(id: string | number): Promise<any> {
        const response = await Knex('tutorial_sections')
            .where('id', id)
            .del();

        if (response == 1) {
            return true;
        }

        return false;
    };

    public static async listTutorialSectionIds(tutorialId: number): Promise<number[]> {
        const sectionIdsRes = await Knex
            .select('id')
            .from('tutorial_sections')
            .where('tutorialId', tutorialId);

        const sectionIds = sectionIdsRes.map((el) => el.id);
        return sectionIds;
    };
};

/**
 *
 *
 *
  /** Adds or updates the sections for a tutorial */
/*
public static async addSections(tutorialId: number, tutorialSections: TutorialInterface['sections']) {

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
/* public static async deleteSections(tutorialId: number, providedSections: TutorialInterface['sections']) {

    // Iterate through the sections we've been provided by the request
    const sectionsToDelete = providedSections.filter((providedSection) => providedSection.isDeleted);

    if (sectionsToDelete.length > 0) {
        const idsToDelete = sectionsToDelete.map((sd) => sd.id).join();

        const query = `
        DELETE FROM tutorial_sections
        WHERE "id" IN (${idsToDelete})
        AND "tutorialId" = ${tutorialId}
        `;

        await Client.executeQuery(query);
    }
};
 */