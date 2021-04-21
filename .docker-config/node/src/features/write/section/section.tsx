import { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';

import { FormField } from '../../../components/formField/formField';
import { Input } from '../../../components/input/input';

import { WriteSaveContext } from '../write';
const MdEditor = dynamic(() => import('react-markdown-editor-lite').then((mod) => mod.default), { ssr: false }) as any;

export const Section = (props) => {

    const { index, removeSection, id, title, content, tempKey } = props;
    const initialCollapse = props.collapsed != undefined ? props.collapsed : true;

    const [sectionTitle, setSectionTitle] = useState(title);
    const [sectionContent, setSectionContent] = useState(content);
    const [collapsed, setCollapsed] = useState(initialCollapse);

    const { saveOccurred, sectionUpdate } = useContext(WriteSaveContext);

    /** When the title or content changes locally, we'll need to update
     * it in the central parent */
    useEffect(() => {
        sectionUpdate(index, id, sectionTitle, sectionContent, tempKey);

    }, [sectionTitle, sectionContent]);

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

    return (
        <div className="section outline">
            <span
                className="section__title"
                onClick={(e) => setCollapsed(!collapsed)}
            >
                Section{(sectionTitle.length > 0) ? ': ' : ''}
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
                    <FormField
                        labelText={'Title'}
                    >
                        <Input
                            type={'text'}
                            placeholder={'Describe the topic of your tutorial here'}
                            onChange={(e) => setSectionTitle(e.target.value)}
                            value={sectionTitle}
                        />
                    </FormField>

                    {/** Section Content */}
                    <div className="form-field">
                        <label className="form-field__label">Content</label>
                        <MdEditor
                            defaultValue={sectionContent}
                            style={{ height: "500px" }}
                            view={{ menu: true, md: true, html: false }}
                            onChange={({ text }) => setSectionContent(text)}
                            onImageUpload={handleImageUpload}
                        />
                    </div>
                </div>
            }
        </div>
    )
};