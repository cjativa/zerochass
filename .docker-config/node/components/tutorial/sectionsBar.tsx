export const SectionsBar = (props) => {
    const { sectionInformation } = props;

    return (
        <div className="tutorial-content-bar">
            <div className="content-box">
                <span>Tutorial Content</span>
                <ul>
                    {sectionInformation.map((section, index) => {
                        return (<li key={index}><a href={`#${section.slug}`}>{section.title}</a></li>)
                    })}
                </ul>
            </div>
        </div>
    )
};