import { useState, useEffect } from 'react';
import axios from 'axios';
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
        onSave,
        codeUrl, setCodeUrl,
        liveUrl, setLiveUrl
    } = props;

    const [matchingTags, setMatchingTags] = useState([]);
    const [previewFileUrl, setPreviewFileUrl] = useState(null);
    const [displayedColor, setDisplayedColor] = useState(null);

    useEffect(() => {
        // If we've got a featured image that's a string -- it's a url we can preview
        if (typeof featuredImage === 'string') {
            setPreviewFileUrl(featuredImage);
        }
    }, [])

    useEffect(() => {
        const dColor = colorOptions.find((co) => co.value === color);
        setDisplayedColor(dColor);
    }, [color]);

    useEffect(() => {
        const fetchMatchingTags = async () => {
            const { data } = await axios.get('/api/tags', { params: { tag } });

            const foundMatchingTags = data.reduce((acc, matchingTag) => {

                // Find if this matching tag is already used by this tutorial
                const isMatchingTagUsed = tags.some((tag) => tag === matchingTag.tag);

                // If we don't already use this tag, let's display it
                if (isMatchingTagUsed == false) acc.push(matchingTag.tag);

                return acc;
            }, []);

            setMatchingTags(foundMatchingTags);
        };

        if (tag.length > 1) fetchMatchingTags();

        if (tag.length == 0) setMatchingTags([]);

    }, [tag]);

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
            setIntoTags(tag);
        }
    };

    const onMatchingTagClick = (matchingTag: string) => {
        setIntoTags(matchingTag);
    };

    const setIntoTags = (value: string) => {

        // Find if this value is already in the tags list
        const tagToAdd = value.toLowerCase();
        const isMatchingTagUsed = tags.some((tag) => tag === tagToAdd);

        // If we don't already use this tag, let's display it
        if (isMatchingTagUsed == false) {
            setTags([...tags, tagToAdd]);
        }

        setTag('');
    };

    const onTagRemove = (index) => {
        tags.splice(index, 1);
        setTags([...tags]);
    };

    const onColorSelect = (selectedColor) => {
        setColor(selectedColor.value);
    };

    return (

        <div className="write__sidebar">

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
                    <span className="form-field__hint">Set a color for your post header</span>
                    <ReactSelect
                        id={"react-select"}
                        value={displayedColor}
                        onChange={onColorSelect}
                        options={colorOptions}
                        className="slim"
                    />
                </div>
            </div>

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

            <div className="write__sidebar write__sidebar--middle outline block">

                {/** Code Repository URL */}
                <div className="form-field">
                    <label className="form-field__label">Code Repository</label>
                    <span className="form-field__hint">Have a repo? Link it here</span>
                    <input className="form-field__input form-field--blue slim"
                        type="text"
                        value={codeUrl}
                        onChange={(e) => setCodeUrl(e.target.value)}
                    />
                </div>

                {/** Live URL */}
                <div className="form-field">
                    <label className="form-field__label">Live Site</label>
                    <span className="form-field__hint">You can link a demo site here</span>
                    <input className="form-field__input form-field--blue slim pl"
                        type="text"
                        value={liveUrl}
                        onChange={(e) => setLiveUrl(e.target.value)}
                        placeholder="CodePen, StackBlitz, etc."
                    />
                </div>

                {/** Tags */}
                <div className="write__tags">
                    <div className="form-field">
                        <label className="form-field__label">Tags</label>
                        <span className="form-field__hint">Add up to 4 tags related to your post</span>
                        <input className="form-field__input form-field--blue slim"
                            type="text"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            onKeyDown={(e) => onTagsKeyDown(e)}
                        />
                    </div>

                    {/** List of tags for this tutorial */}
                    <div className="write__taglist">
                        {tags.map((tag, index) =>
                            <span
                                className="tag-item"
                                key={index}>
                                #{tag.tag}
                                <i
                                    onClick={() => onTagRemove(index)}
                                    className="x-btn fas fa-times" />
                            </span>)
                        }
                    </div>

                    {/** List of matching tags for the entered tag term */}
                    {matchingTags.length > 0 &&
                        <div className="write__foundtags">
                            {matchingTags.map((matchingTag, index) =>
                                <div
                                    className="f-tag-item"
                                    key={index}
                                    onClick={() => onMatchingTagClick(matchingTag)} >
                                    {matchingTag}
                                </div>)
                            }
                        </div>
                    }

                </div>


            </div>

        </div >

    )
};