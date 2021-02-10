export const TutorialHeader = (props) => {
    const { title, tags, featuredImage, color, authorHeading, authorImage, authorName } = props;

    return (
        <header className={`tutorial-header ${color.toLowerCase()}`}>

            {/** Display information about the author */}
            <div className="tutorial-header__author">
                <img src={authorImage} className="tutorial-header__author-image" />
                <span>{authorName}</span>
            </div>

            {/** Display the tutorial featured image */}
            <div className="tutorial-header__image">
                {featuredImage.length > 0 &&
                    <img className="featured-image" src={featuredImage} />}
            </div>

            {/** Display the available tags */}
            <ul className="tutorial-header__tags">
                {tags && tags.map((tag, index) =>
                    <li className="tutorial-header__tag" key={index} >
                        {`#${tag.tag}`}
                    </li>
                )}
            </ul>

            <h1 className="tutorial-header__title">{title}</h1>
        </header>
    )
};