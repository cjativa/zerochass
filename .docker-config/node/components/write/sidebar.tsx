import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ReactSwitch from 'react-switch';

const ReactSelect = dynamic(() => import('react-select')
    .then((mod) => mod.default), { ssr: false }) as any;

const colorOptions = [
    { value: 'pink', label: 'Pink' },
    { value: 'black', label: 'Black' },
    { value: 'teal', label: 'Teal' },
    { value: 'white', label: 'White' }
]

export const Sidebar = (props) => {
    const [tag, setTag] = useState('');
    const { tags, setTags,
        color, setColor,
        enabled, setEnabled,
        featuredImage, setFeaturedImage,
        onSave } = props;

    const [previewFileUrl, setPreviewFileUrl] = useState(null);
    const [displayedColor, setDisplayedColor] = useState(null);

    useEffect(() => {

        console.log(featuredImage);

        // If we've got a featured image that's a string -- it's a url we can preview
        if (typeof featuredImage === 'string') {
            setPreviewFileUrl(featuredImage);
        }

    }, [])

    useEffect(() => {
        const dColor = colorOptions.find((co) => co.value === color);
        setDisplayedColor(dColor);
    }, [color]);

    const fileChangedHandler = event => {
        const file = event.target.files[0];
        setFeaturedImage(file);
        setPreviewFileUrl(window.URL.createObjectURL(file));
    }

    const onImageRemove = () => {
        setFeaturedImage(null);
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

    const onColorSelect = (selectedColor) => {
        setColor(selectedColor.value);
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
                    <label className="enable-text">Enabled</label>
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
                    {!featuredImage && <label className="file-container">
                        <input type="file" className="file-hide" onChange={fileChangedHandler} accept="jpg, .jpeg, .png" />
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
                    <ReactSelect
                        id={"react-select"}
                        value={displayedColor}
                        onChange={onColorSelect}
                        options={colorOptions}
                        className="slim"
                    />
                </div>

                {/** Tags */}
                <div className="write__tags">
                    <div className="form-field">
                        <label className="form-field__label">Tags</label>
                        <input className="form-field__input form-field--blue slim"
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