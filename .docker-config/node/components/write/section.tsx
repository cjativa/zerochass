import { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';

import { WriteSaveContext } from './write';
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });


export const Section = (props) => {

    const [sectionTitle, setSectionTitle] = useState('');
    const [sectionContent, setSectionContent] = useState('');
    const [collapsed, setCollapsed] = useState(false);


    const { saveOccurred, sectionUpdate } = useContext(WriteSaveContext);

    const handleEditorChange = ({ html, text }) => {
        setSectionContent(text);
    };

    useEffect(() => {
        if (saveOccurred) {
            sectionUpdate(props.id, sectionTitle, sectionContent);
        }
    }, [saveOccurred]);

    return (
        <div className="section outline">
            <span
                className="section__title"
                onClick={(e) => setCollapsed(!collapsed)}>Section{(sectionTitle.length > 0) ? ': ' : ''}
                {sectionTitle}
            </span>

            {!collapsed &&
                <div className="section__body block">

                    {/** Section Title */}
                    <div className="form-field">
                        <label className="form-field__label">Title</label>
                        <input className="form-field__input slim"
                            type="text"
                            value={sectionTitle}
                            onChange={(e) => setSectionTitle(e.target.value)} />
                    </div>

                    {/** Section Content */}
                    <div className="form-field">
                        <label className="form-field__label">Content</label>
                        <MdEditor
                            value={sectionContent}
                            style={{ height: "500px" }}
                            view={{ menu: true, md: true, html: false }}
                            onChange={handleEditorChange}
                        />
                    </div>
                </div>
            }
        </div>
    )
};