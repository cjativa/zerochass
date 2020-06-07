import { useState, useEffect } from 'react';
import ReactSwitch from "react-switch";

import { ImageUpload } from '../custom/imageUpload';

export const Sidebar = (props) => {

    const [tag, setTag] = useState('');
    const { tags, setTags,
        color, setColor,
        enabled, setEnabled,
        onSave } = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewFileUrl, setPreviewFileUrl] = useState(null);

    const fileChangedHandler = event => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreviewFileUrl(window.URL.createObjectURL(file));
    }

    const onImageRemove = () => {
        setSelectedFile(null);
        window.URL.revokeObjectURL(previewFileUrl);
        setPreviewFileUrl(null);
    };

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
                    {!selectedFile && <label className="file-container">
                        <input type="file" className="file-hide" onChange={fileChangedHandler} />
                        <i className="fas fa-image upload" />
                    </label>
                    }
                    {previewFileUrl &&
                        <div className="preview">
                            <img className="preview__file" src={previewFileUrl} />
                            <i
                                onClick={onImageRemove}
                                className="preview__remove x-btn fas fa-times" />
                        </div>}
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
                                    className="x-btn fas fa-times" />
                            </span>)
                        }
                    </div>
                </div>
            </div>

        </div >

    )
};