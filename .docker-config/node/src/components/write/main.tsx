import { useState, useEffect } from 'react';
import { Section } from './section';

export const Main = (props) => {

    const { title, description1, description2, sections,
        setTitle, setDescription1, setDescription2, setSections,
        edit
    } = props;

    const headingText = edit ? 'Edit tutorial' : 'Create a new tutorial post';

    const addToSections = () => {
        setSections([...sections, { tempKey: Date.now(), title: '', content: '', collapsed: false }]);
    };

    const removeSection = (index) => {

        // Check if the section to remove has an assigned id -- which means it's in the database
        const section = sections[index];
        let updatedSections = [ ... sections];

        // Mark for deletion if it has an id
        if (section.id) {  updatedSections[index]['isDeleted'] = true;  }

        // Otherwise, it's not in the database so we can just remove it
        else { updatedSections = updatedSections.filter((el, elIndex) => elIndex !== index);  }

        setSections([...updatedSections]);
    };

    return (
        < div className="write__main" >
            <h1>{headingText}</h1>

            {/** Title input */}
            <div className="form-field">
                <label className="form-field__label">Title</label>
                <input
                    className="form-field__input form-field--blue slim"
                    type="text" value={title}
                    onChange={(e) => setTitle(e.target.value)} />
            </div>

            {/** Description input */}
            <div className="description-block block outline">
                <label className="form-field__label">Description</label>

                <div className="description__lines">
                    {/** Description 1 */}
                    <div className="form-field">
                        <label className="form-field__label">First Line</label>
                        <input
                            className="form-field__input form-field--blue slim"
                            placeholder="Describe the topic of your tutorial here"
                            type="text" value={description1}
                            onChange={(e) => setDescription1(e.target.value)}
                        />
                    </div>

                    {/** Description 2 */}
                    <div className="form-field">
                        <label className="form-field__label">Second Line</label>
                        <input
                            className="form-field__input form-field--blue slim"
                            placeholder="Motivate others to follow along!"
                            type="text"
                            value={description2}
                            onChange={(e) => setDescription2(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/** Sections */}
            <div className="form-field">
                <label className="form-field__label">Content</label>
                {sections
                .filter((sectionElement) => !sectionElement.isDeleted)
                .map((sectionElement, index) => {

                    if (!sectionElement.isDeleted) {
                        const { tempKey, title, content, id, collapsed } = sectionElement;

                        return <Section
                            key={(id) ? id : tempKey}
                            tempKey={tempKey}
                            id={id}
                            index={index}
                            title={title}
                            content={content}
                            removeSection={removeSection}
                            collapsed={collapsed}
                        />
                    }
                }
                )}
            </div>


            {/** Add Content Block */}
            <div>
                <button
                    className="btn btn--secondary btn--slim"
                    onClick={() => addToSections()}>
                    Add Section
                </button>
            </div>
        </div >
    )
};