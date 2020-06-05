import { useState, useEffect } from 'react';
import { Section } from './section';

export const Main = (props) => {

    const [title, setTitle] = useState('');
    const [description1, setDescription1] = useState('');
    const [description2, setDescription2] = useState('');

    const [sections, setSections] = useState([]);

    return (
        < div className="write__main" >
            <h1>Create a new tutorial post</h1>

            {/** Title input */}
            <div className="form-field">
                <label className="form-field__label">Title</label>
                <input
                    className="form-field__input slim"
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
                            className="form-field__input slim"
                            placeholder="Describe the topic of your tutorial here"
                            type="text" value={description1}
                            onChange={(e) => setDescription1(e.target.value)}
                        />
                    </div>

                    {/** Description 2 */}
                    <div className="form-field">
                        <label className="form-field__label">Second Line</label>
                        <input
                            className="form-field__input slim"
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
                {sections.map((Section, index) => <Section key={index} />)}
            </div>


            {/** Add Content Block */}
            <button onClick={() => setSections([...sections, Section])}>Add Section</button>
        </div >
    )
};