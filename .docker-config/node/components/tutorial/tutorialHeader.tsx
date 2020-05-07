export const TutorialHeader = (props) => {
    const { title, tags, featuredImage, color } = props;
    const style = { backgroundImage: `url(${featuredImage})` };

    return (
        <header className={`tutorial-header ${color.toLowerCase()}`} style={style}>
            <div className="tutorial-header__image">
                {featuredImage.length > 0 &&
                    <img className="featured-image" src={featuredImage[0].url} />}
            </div>
            <ul className="tutorial-header__tags">
                {tags && tags.map((tag, index) => {
                    return (<li key={index}>{`${tag.title} |`}</li>)
                })}
            </ul>
            <h1 className="tutorial-header__title">{title}</h1>
        </header>
    )
};