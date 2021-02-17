import {
    Card,
    CardImg,
    CardBody,
    CardTitle
} from "shards-react";
import { UserSnip } from "../userSnippet/userSnippet";
import { TagItem } from "../tagItem/tagItem";

interface ITutorialSnippetProps {
    tutorial: any,
    userProgress?: any
};

export const TutorialSnip = ({ tutorial }: ITutorialSnippetProps) => {

    return (
        <div className="tutorial-snippet">
            <Card className="tutorial-snippet__card">
                <CardImg src={tutorial.featuredImage} />
                <CardBody>

                    {/** Title and short description */}
                    <CardTitle>{tutorial.title}</CardTitle>
                    <p>{tutorial.description2}</p>

                    {/** Bottom half of the tutorial card */}
                    <div className="tutorial-snippet__bottom">

                        {/** User information snippet */}
                        <UserSnip
                            profileImageUrl={tutorial.profileImage}
                            name={tutorial.name}
                            username={"cjativa"}
                        />

                        {/** Tutorial tags */}
                        {tutorial.tags.length > 0 &&
                            <div className="tutorial-snippet__tags">
                                {tutorial.tags.map((tag) =>
                                    <TagItem
                                        tagId={tag.id}
                                        tagName={tag.tag}
                                    />
                                )}
                            </div>
                        }
                    </div>

                </CardBody>
            </Card>
        </div>
    );
};