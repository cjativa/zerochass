import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'

import { Layout } from '../components/Layout';

const Write = () => {

    const [title, setTitle] = useState('');
    const [description1, setDescription1] = useState('');
    const [description2, setDescription2] = useState('');

    const [sections, setSections] = useState([]);

    return (
        <Layout pageTitle={"New Tutorial"}>

            <div className="write">
                <div className="body">

                    {/** Main inputs */}
                    <div className="write__main">
                        <h1>Create a new tutorial post</h1>

                        {/** Title input */}
                        <div className="form-field">
                            <label className="form-field__label">Title</label>
                            <input className="form-field__input slim" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        {/** Description input */}
                        <div className="form-field outline">
                            <label className="form-field__label">Description</label>

                            <div className="write__block">
                                {/** Description 1 */}
                                <div className="form-field">
                                    <label className="form-field__label">First Line</label>
                                    <input className="form-field__input slim" placeholder="Describe the topic of your tutorial here" type="text" value={description1} onChange={(e) => setDescription1(e.target.value)} />
                                </div>

                                {/** Description 2 */}
                                <div className="form-field">
                                    <label className="form-field__label">Second Line</label>
                                    <input className="form-field__input slim" placeholder="Motivate others to follow along!" type="text" value={description2} onChange={(e) => setDescription2(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/** Sections */}
                        {sections.map((Section, index) =>

                            <div className="form-field outline">
                                <label className="form-field__label">Section</label>

                                <div className="write__block">
                                    <Section key={index} />
                                </div>
                            </div>
                        )}

                        {/** Add Content Block */}
                        <div className="form-field">
                            <label className="form-field__label">Content</label>
                            <button onClick={() => setSections([...sections, Section])}>Add Section</button>
                        </div>
                    </div>

                    {/** Sidebar */}
                    <div className="write__sidebar outline">

                        {/** Featured image */}
                        <div className="form-field">
                            <label className="form-field__label">Featured Image</label>
                            <i className="fas fa-image" />
                        </div>

                        {/** Color */}
                        <div className="form-field">
                            <label className="form-field__label">Color</label>
                            <select className="form-field__select" name="colors" id="colors">
                                <option value="volvo">Pink</option>
                                <option value="saab">Black</option>
                                <option value="opel">Teal</option>
                                <option value="audi">White</option>
                            </select>
                        </div>

                        {/** Tags */}
                        <div className="form-field">
                            <label className="form-field__label">Tags</label>
                            <input className="form-field__input slim" type="text" value={description2} onChange={(e) => setDescription2(e.target.value)} />
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
};

export default Write;


const Section = () => {

    const [sectionTitle, setSectionTitle] = useState('');
    const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
        ssr: false
    });

    return (
        <div className="section-block">

            {/** Section Title */}
            <div className="form-field">
                <label className="form-field__label">Title</label>
                <input className="form-field__input slim" type="text" value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} />
            </div>

            {/** Section Content */}
            <div className="form-field">
                <label className="form-field__label">Content</label>
                <MdEditor
                    value=""
                    style={{ height: "500px" }}
                    view={{ menu: true, md: true, html: false }}
                />
            </div>
        </div>
    )
};