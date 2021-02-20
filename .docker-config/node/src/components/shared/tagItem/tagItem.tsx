
interface ITagItemProps {
    tagId: number | string,
    tagName: string,
    useMargin?: boolean,
};

export const TagItem = ({ tagId, tagName, useMargin }: ITagItemProps) => {

    let className = "tag-item";

    // If the tag should provide its own margin 
    // around itself
    if (useMargin) {
        className = className.concat(' tag-item--margin');
    }

    return (
        <div className={className}>
            {`#${tagName}`}
        </div>
    );
};