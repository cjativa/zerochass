import { Knex } from '../../database/knex';
import { makeTutorial } from '../../models/tutorial/index';
import { ITutorial } from '../../models/tutorial/tutorialSchema';

import { TagDB } from '../tag/entity';
import { TutorialSectionDB } from '../tutorialSection/entity';

export class TutorialDAO {

    /** something */
    public static async listTutorials(): Promise<ITutorial[]> {
        return await Knex
            .select('*')
            .from('tutorials')
            .where('enabled', true);
    };

    public static async findTutorial(prop: string, val: number | string): Promise<ITutorial> {
        const tutorials = await Knex
            .select('*')
            .from('tutorials')
            .where(prop, val);

        return tutorials.shift();
    };

    public static async addTutorial(props: ITutorial, userId: string): Promise<any> {
        // const tutorial = makeTutorial(tutorialData);

        const addedTutorial = await Knex('tutorials')
            .insert({
                title: props.title,
                color: props.color,
                description1: props.description1,
                description2: props.description2,
                enabled: props.enabled,
                featuredImage: props.featuredImage,
                codeUrl: props.codeUrl,
                liveUrl: props.liveUrl,
                slug: props.slug,
                userId: userId,
            })
            .returning('*');

        // If there's tags to associate
        if (props.tags.length > 0) {
            await TagDB.relateWithTutorial(props.tags, props.id);
        }

        return addedTutorial.shift();
    };

    public static async updateTutorial(props: ITutorial, userId: string) {

        // Update the main tutorial information
        const updatedTutorial = await Knex('tutorials')
            .where({ 'id': props.id })
            .update({
                title: props.title,
                color: props.color,
                description1: props.description1,
                description2: props.description2,
                enabled: props.enabled,
                featuredImage: props.featuredImage,
                codeUrl: props.codeUrl,
                liveUrl: props.liveUrl,
                slug: props.slug,
                userId: userId,
            })
            .returning('*');

        // If there's tags to associate
        if (props.tags.length > 0) {
            await TagDB.relateWithTutorial(props.tags, props.id);
        }

        // If there's sections to write
        if (props.sections.length > 0) {
            await TutorialSectionDB.addOrUpdateTutorialSection(props.sections, props.id);
        }

        return updatedTutorial.shift();
    };

    public static async deleteTutorial(id: string | number): Promise<any> {
        const response = await Knex('tutorials')
            .where('id', id)
            .del();

        if (response == 1) {
            return {
                id,
                status: 'success'
            }
        }
        return { status: 'fail' }
    };

    /** Returns the tags associated with a specific tutorial */
    public static async getTags(tutorialId: string | number) {
        const tags = await Knex.raw(`
            SELECT id, tag
            FROM tags
            INNER JOIN tutorial_tag_relations
            ON tags.id = tutorial_tag_relations."tagId"
            WHERE tutorial_tag_relations."tutorialId" = ${tutorialId}
            `
        );

        return tags.rows;
    };

    public static async getTutorialForEditing(userId: number, tutorialId?: number) {

        // This means only retrieve the requested tutorial
        // as the user is trying to edit it
        if (tutorialId) {
            const editableTutorial = await Knex('tutorials')
                .select(
                    'title',
                    'description1',
                    'description2',
                    'enabled',
                    'color',
                    'featuredImage',
                    'liveUrl',
                    'codeUrl',
                    'id')
                .where({
                    id: tutorialId,
                    userId: userId
                });

            return editableTutorial;
        }

        // Otherwise, all editable tutorials need to be shown, for the list page
        const editableTutorials = await Knex('tutorials')
            .select('title', 'description1', 'description2', 'enabled', 'color', 'featuredImage', 'id', 'slug')
            .where({
                userId: userId
            });

        return editableTutorials;
    };

    public static async getSiteTutorials() {
        const siteTutorials = await Knex.raw(
            `
            SELECT 
        t."title", 
        t."description1",   
        t."description2", 
        t."color", 
        t."featuredImage", 
        t."id", 
        t."slug",
        u."profileImage", 
        u."name",
        uai."username"
        FROM tutorials t
        INNER JOIN user_information u 
        ON u."id" = t."userId"
        INNER JOIN user_account_information uai
        on uai."userId" = t."userId"
        WHERE t."enabled" = true
        `
        );

        return siteTutorials.rows;
    };
};