import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { WriteTutorial } from '../../util/interfaces/writeTutorial';
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
    tutorial: WriteTutorial,
    id?: number
}

export const Write = (props: Props) => {

    const { edit, tutorial } = props;

    // State variables and controls for Main component
    const [title, setTitle] = useState(tutorial.title || '');
    const [description1, setDescription1] = useState(tutorial.description1 || '');
    const [description2, setDescription2] = useState(tutorial.description2 || '');
    const [sections, setSections] = useState(tutorial.sections || []);

    // State variables and controls for Sidebar component
    const [tags, setTags] = useState([]);
    const [color, setColor] = useState(tutorial.color || 'pink');
    const [enabled, setEnabled] = useState(tutorial.enabled || false);
    const [featuredImage, setFeaturedImage] = useState(null);

    const [saveOccurred, setSaveOccurred] = useState(null);

    /** Handles updating the list of sections */
    const sectionUpdate = (index: number, id: number, title: string, content: string) => {
        sections[index] = { id, title, content };
        setSections(sections);
    };

    /** When a save occurs */
    const onSave = async () => {

        let fiObject = { name: null, dataUrl: null };

        // If there's a featured image, convert it to data url
        if (featuredImage) {
            await new Promise((resolve) => {
                const reader = new FileReader();

                reader.addEventListener('load', (event) => {
                    fiObject.name = featuredImage.name;
                    fiObject.dataUrl = event.target.result;
                    resolve();
                });

                reader.readAsDataURL(featuredImage);
            });
        }

        // Set up the payload
        const writeTutorialPayload: WriteTutorial = {
            title,
            description1, description2,
            sections,
            tags,
            color,
            featuredImage: fiObject,
            enabled,
            id: tutorial.id
        };

        console.log(writeTutorialPayload);

        await axios('/api/write', { data: writeTutorialPayload, method: 'post' });

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
                />

            </div>
        </div>
    )
};