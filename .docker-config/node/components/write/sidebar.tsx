import { useState, useEffect } from 'react';
import ReactSwitch from "react-switch";

export const Sidebar = (props) => {

    const [tag, setTag] = useState('');
    const { tags, setTags,
        color, setColor,
        enabled, setEnabled,
        onSave } = props;

    const onEnabledChange = (checked, event, id) => {
        setEnabled(checked);
    };

    const onTagsKeyDown = (e) => {
        if (e.key === 'Enter') {
            setTags([...tags, tag]);
            setTag('');
        }
    };

    const onTagRemove = (index) => {
        tags.splice(index, 1);
        setTags([...tags]);
    };

    const onColorSelect = (e) => {
        setColor(e.target.value);
    };

    return (

        < div className="write__sidebar" >

            <div className="write__sidebar write__sidebar-bottom outline block">
                {/** Action buttons */}
                <div className="write__actions">
                    <button className="btn btn--secondary btn--slim">Preview</button>
                    <button onClick={() => onSave()} className="btn btn--primary btn--slim">Save</button>
                </div>

                {/** Enablement switch */}
                <div className="write__enable">
                    <span className="enable-text">Enabled</span>
                    <ReactSwitch
                        height={24}
                        onChange={onEnabledChange}
                        onColor={'#45b914'}
                        checked={enabled}
                        checkedIcon={false}
                        uncheckedIcon={false} />
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
                        {tags.map((tag, index) =>
                            <span
                                className="tag-item"
                                key={index}>
                                {tag}
                                <i 
                                onClick={() => onTagRemove(index)}
                                className="fas fa-times" />
                            </span>)
                        }
                    </div>
                </div>
            </div>

        </div >

    )
};