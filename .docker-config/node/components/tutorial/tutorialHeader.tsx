export const TutorialHeader = (props) => {
    const { title, tags, featuredImage, color } = props;
    console.log(`The tags`, tags);
    return (
        <header className={`tutorial-header ${color.toLowerCase()}`}>
            <div className="tutorial-header__image">
                {featuredImage.length > 0 &&
                    <img className="featured-image" src={featuredImage} />}
            </div>
            <ul className="tutorial-header__tags">
                {tags && tags.map((tag, index) => {
                    return (<li key={index}>{`${tag.tag}`}</li>)
                })}
            </ul>
            <h1 className="tutorial-header__title">{title}</h1>
        </header>
    )
};