import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'

export const Section = (props) => {
    const [sectionTitle, setSectionTitle] = useState('');
    const [collapsed, setCollapsed] = useState(false);
    const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
        ssr: false
    });



    return (
        <div className="section outline">

            <span className="section__title" onClick={(e) => setCollapsed(!collapsed)}>Section{(sectionTitle.length > 0) ? ':' : ''} {sectionTitle}</span>

            {!collapsed &&
                <div className="section__body block">

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
            }
        </div>
    )
};