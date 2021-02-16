
interface ITagItemProps {
    tagId: number | string,
    tagName: string,
};

export const TagItem = ({ tagId, tagName }: ITagItemProps) => {
    return (
        <div className="tag">
            {`#${tagName}`}
        </div>
    );
};