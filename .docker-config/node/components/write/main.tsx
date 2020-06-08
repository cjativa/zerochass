import { useState, useEffect } from 'react';
import { Section } from './section';

export const Main = (props) => {

    const { title, description1, description2, sections,
        setTitle, setDescription1, setDescription2, setSections
    } = props;

    const addToSections = () => {
        setSections([...sections, { id: Date.now(), component: Section }]);
    };

    const removeSection = (id) => {
        const updatedSections = sections.filter((el) => el.id !== id);
        setSections([...updatedSections]);
    };

    return (
        < div className="write__main" >
            <h1>Create a new tutorial post</h1>

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
                {sections.map((sectionElement, index) => {

                    const { id, component: SectionComponent } = sectionElement;

                    return <SectionComponent
                        key={id}
                        id={id}
                        removeSection={removeSection} />
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