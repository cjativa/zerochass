import { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';

import { WriteSaveContext } from './write';
const MdEditor = dynamic(() => import('react-markdown-editor-lite').then((mod) => mod.default), { ssr: false }) as any;

export const Section = (props) => {

    const { index, removeSection, id, title, content, tempKey } = props;

    const [sectionTitle, setSectionTitle] = useState('');
    const [sectionContent, setSectionContent] = useState('');
    const [collapsed, setCollapsed] = useState(true);


    const { saveOccurred, sectionUpdate } = useContext(WriteSaveContext);

    const handleEditorChange = ({ html, text }) => {

        if (id) sectionUpdate(index, id, sectionTitle, text);

        else sectionUpdate(index, id, sectionTitle, text, tempKey);
    };

    const handleImageUpload = (file: File): Promise<string> => {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = data => {
                // @ts-ignore
                resolve(data.target.result);
            };
            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        if (title && content) {
            setSectionTitle(title);
            setSectionContent(content);
        }
    }, []);


    return (
        <div className="section outline">
            <span
                className="section__title"
                onClick={(e) => setCollapsed(!collapsed)}>Section{(sectionTitle.length > 0) ? ': ' : ''}
                {sectionTitle}
                <span className="x-btn-cont">
                    <i
                        onClick={() => removeSection(index)}
                        className="x-btn fas fa-times" />
                </span>
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
                            onImageUpload={handleImageUpload}
                        />
                    </div>
                </div>
            }
        </div>
    )
};