import React, { useState, useEffect } from 'react';

import { Main } from './main';
import { Sidebar } from './sidebar';

export const WriteSaveContext = React.createContext({
    saveOccurred: null,
    sectionUpdate: null
});

export const Write = () => {

    const [title, setTitle] = useState('');
    const [description1, setDescription1] = useState('');
    const [description2, setDescription2] = useState('');
    const [sections, setSections] = useState([]);

    const [tags, setTags] = useState([]);
    const [color, setColor] = useState('');
    const [enabled, setEnabled] = useState(null);

    const [saveOccurred, setSaveOccurred] = useState(false);

    const sectionUpdate = (id: number, title: string, content: string) => {
        sections[id] = { title, content };
        setSections(sections);
    };

    const onSave = () => {
        setSaveOccurred(true);
        const tutorial = {
            title,
            description1, description2,
            sections,
            tags,
            color,
            enabled
        };

        console.log(tutorial);
    };



    useEffect(() => {
        if (saveOccurred == true) {
            setSaveOccurred(false);
        }
    }, [saveOccurred]);

    return (
        <div className="write">
            <div className="body">

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
                    onSave={onSave}
                />

            </div>
        </div>
    )
};