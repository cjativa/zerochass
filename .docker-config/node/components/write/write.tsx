import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Tutorial, TutorialRequest } from '../../util/interfaces/tutorial';
import { Main } from './main';
import { Sidebar } from './sidebar';

export const WriteSaveContext = React.createContext({
    saveOccurred: null,
    sectionUpdate: null
});

const colorOptions = [
    { value: 'pink', label: 'Pink' },
    { value: 'black', label: 'Black' },
    { value: 'teal', label: 'Teal' },
    { value: 'white', label: 'White' }
];

const getMatchingColor = (color: string) => colorOptions.find((co) => co.value === color);

interface Props {
    edit: boolean,
    tutorial: Tutorial,
    id?: number
}

export const Write = (props: Props) => {

    const { edit, tutorial } = props;

    // State variables and controls for Main component
    const [title, setTitle] = useState(tutorial.title || '');
    const [description1, setDescription1] = useState(tutorial.description1 || '');
    const [description2, setDescription2] = useState(tutorial.description2 || '');
    const [sections, setSections] = useState(tutorial.sections || []) as any;

    // State variables and controls for Sidebar component
    const [tags, setTags] = useState(tutorial.tags || []);
    const [color, setColor] = useState(tutorial.color || 'pink');
    const [enabled, setEnabled] = useState(tutorial.enabled || false);
    const [featuredImage, setFeaturedImage] = useState(tutorial.featuredImage || '');
    const [codeUrl, setCodeUrl] = useState(tutorial.codeUrl || '');
    const [liveUrl, setLiveUrl] = useState(tutorial.liveUrl || '');

    const [saveOccurred, setSaveOccurred] = useState(null);

    /** Handles updating the list of sections */
    const sectionUpdate = (index: number, id: number, title: string, content: string, tempKey: number) => {
        sections[index] = { id, title, content, tempKey };
        setSections(sections);
    };

    /** When a save occurs */
    const onSave = async () => {

        let featuredImagePayload = '' as any;

        // If there's a featured image, convert it to data url
        if (featuredImage && typeof featuredImage !== 'string') {
            await new Promise((resolve) => {
                const reader = new FileReader();
                reader.addEventListener('load', (event) => {
                    featuredImagePayload = { dataUrl: '' }
                    featuredImagePayload.dataUrl = event.target.result;
                    resolve();
                });

                reader.readAsDataURL(featuredImage);
            });
        }

        else { featuredImagePayload = featuredImage }

        // Set up the payload
        const writeTutorialPayload: Tutorial | TutorialRequest = {
            title,
            description1, description2,
            sections,
            tags,
            color,
            featuredImage: featuredImagePayload,
            enabled,
            id: tutorial.id
        };

        // If we have an id, this is an update, otherwise it's a create
        const method = (tutorial.id) ? 'PUT' : 'POST';
        await axios('/api/write', { data: writeTutorialPayload, method });

        setSaveOccurred(true);
    };



    useEffect(() => {
        if (saveOccurred == true) {
            setSaveOccurred(false);
        }
    }, [saveOccurred]);

    return (
        <div className="write">
            <div className="write__body">

                <WriteSaveContext.Provider value={{ saveOccurred, sectionUpdate }}>
                    <Main
                        edit={edit}
                        setTitle={setTitle} title={title}
                        setDescription1={setDescription1} description1={description1}
                        setDescription2={setDescription2} description2={description2}
                        setSections={setSections} sections={sections}
                    />
                </WriteSaveContext.Provider>


                <Sidebar
                    tags={tags} setTags={setTags}
                    color={color} setColor={setColor}
                    enabled={enabled} setEnabled={setEnabled}
                    featuredImage={featuredImage} setFeaturedImage={setFeaturedImage}
                    onSave={onSave}
                    liveUrl={liveUrl} setLiveUrl={setLiveUrl}
                    codeUrl={codeUrl} setCodeUrl={setCodeUrl}
                />

            </div>
        </div>
    )
};