import {
    Card,
    CardImg,
    CardBody,
    CardTitle
} from "shards-react";
import { UserSnip } from "../userSnippet/userSnippet";
import { TagItem } from "../tagItem/tagItem";
import Link from "next/link";

interface ITutorialSnippetProps {
    tutorial: any,
    userProgress?: any
};

export const TutorialSnip = ({ tutorial }: ITutorialSnippetProps) => {

    const tutorialLink = `/tutorial/${tutorial.slug}`;

    return (
        <div className="tutorial-snippet">
            <Card className="tutorial-snippet__card">
                <Link href={tutorialLink}>
                    <CardImg src={tutorial.featuredImage} />
                </Link>
                <CardBody>

                    {/** Title and short description */}
                    <div className="tutorial-snipper__top">
                        <CardTitle>
                            <Link href={tutorialLink}>
                                <a> {tutorial.title} </a>
                            </Link>
                        </CardTitle>
                        <p>{tutorial.description2}</p>
                    </div>

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