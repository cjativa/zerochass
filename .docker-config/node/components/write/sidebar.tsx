import { useState, useEffect } from 'react';

export const Sidebar = (props) => {

    const [tag, setTag] = useState('');
    const { tags, setTags, color, setColor, onSave } = props;

    const onTagsKeyDown = (e) => {
        if (e.key === 'Enter') {
            setTags([...tags, tag]);
            setTag('');
        }
    };

    const onColorSelect = (e) => {
        setColor(e.target.value);
    };

    return (

        < div className="write__sidebar" >

            <div className="write__sidebar write__sidebar-bottom">
                {/** Action buttons */}
                <div className="write__actions">
                    <button className="btn btn--secondary btn--slim">Preview</button>
                    <button onClick={() => onSave()} className="btn btn--primary btn--slim">Save</button>
                </div>

                {/** Enablement switch */}
                <div className="write__enable">
                    <span>Enabled</span>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

            <div className="write__sidebar write__sidebar--top outline block">
                {/** Featured image */}
                <div className="form-field">
                    <label className="form-field__label">Featured Image</label>
                    <i className="fas fa-image upload" />
                </div>

                {/** Color */}
                <div className="form-field">
                    <label className="form-field__label">Color</label>
                    <select onChange={onColorSelect} className="form-field__select slim" name="colors" id="colors">
                        <option value="pink">Pink</option>
                        <option value="black">Black</option>
                        <option value="teal">Teal</option>
                        <option value="white">White</option>
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
                    <div className="write__taglist">
                        {tags.map((tag, index) => <span className="tag-item" key={index}>{tag}</span>)}
                    </div>
                </div>
            </div>

        </div >

    )
};