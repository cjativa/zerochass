import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { WriteTutorial } from '../../util/interfaces/writeTutorial';
import { Main } from './main';
import { Sidebar } from './sidebar';

export const WriteSaveContext = React.createContext({
    saveOccurred: null,
    sectionUpdate: null
});

export const Write = () => {

    // State variables and controls for Main component
    const [title, setTitle] = useState('');
    const [description1, setDescription1] = useState('');
    const [description2, setDescription2] = useState('');
    const [sections, setSections] = useState([]);

    // State variables and controls for Sidebar component
    const [tags, setTags] = useState([]);
    const [color, setColor] = useState({ value: 'pink', label: 'Pink' });
    const [enabled, setEnabled] = useState(false);
    const [featuredImage, setFeaturedImage] = useState(null);

    const [saveOccurred, setSaveOccurred] = useState(null);

    /** Handles updating the list of sections */
    const sectionUpdate = (id: number, title: string, content: string) => {
        sections[id] = { title, content };
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

        const tutorial: WriteTutorial = {
            title,
            description1, description2,
            sections,
            tags,
            color,
            featuredImage: fiObject,
            enabled
        };


        await axios('/api/write', { data: tutorial, method: 'post' });

        setSaveOccurred(true);
        console.log(tutorial);
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