import { useState, useEffect } from 'react';

export const Sidebar = () => {

    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);

    const onTagsKeyDown = (e) => {
        if (e.key === 'Enter') {
            setTags([...tags, tag]);
            setTag('');
        }
    };
    
    return (

        < div className="write__sidebar" >

            <div className="write__sidebar write__sidebar--top outline block">
                {/** Featured image */}
                <div className="form-field">
                    <label className="form-field__label">Featured Image</label>
                    <i className="fas fa-image upload" />
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
                <div className="write__tags">
                    <div className="form-field">
                        <label className="form-field__label">Tags</label>
                        <input className="form-field__input slim"
                            type="text"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            onKeyDown={(e) => onTagsKeyDown(e)}
                        />
                    </div>
                    {tags.map((tag, index) => <span key={index}>{tag}</span>)}
                </div>
            </div>

            <div className="write__sidebar write__sidebar-bottom">

                {/** Enablement switch */}
                <div className="write__enable">
                    <span>Enabled</span>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>

                {/** Action buttons */}
                <div className="write__actions">
                    <button>Preview</button>
                    <button>Save</button>
                </div>
            </div>

        </div >

    )
};