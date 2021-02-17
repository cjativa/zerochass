
interface ITagItemProps {
    tagId: number | string,
    tag: string,
};

export const TagItem = ({ tagId, tag }: ITagItemProps) => {
    return (
        <div className="tag">
            {`#${tag}`}
        </div>
    );
};