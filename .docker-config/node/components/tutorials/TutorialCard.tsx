import Link from 'next/link';

interface TutorialCardProps {
    tutorial: any,
    large?: boolean
}

export const TutorialCard = (props: TutorialCardProps) => {

    const { featuredImage, title, color, description2, slug,
        profileImage: authorImage, name: authorName } = props.tutorial;

    let titleClass = 'tl-card__title';
    let subtitleClass = 'tl-card__subtitle';

    if (props.large) {
        titleClass += ' large';
        subtitleClass += ' large';
    }

    return (
        <Link href={`/tutorial/${slug}`}>
            <a className="tl-card" >

                {/** Display featured image */}
                <div className={`tl-card__top ${color}`}  >
                    <img className="tl-card__image" src={featuredImage} />
                    <div className="tl-card__layer" />
                </div>

                {/** Display bottom of card */}
                <div className={`tl-card__bottom`}>
                    <h1 className={titleClass}>{title}</h1>
                    
                    <div className="tl-card__author">
                        <img src={authorImage} className="tl-card__author-image" />
                        <span>{authorName}</span>
                    </div>
                    <p className={subtitleClass}>{description2}</p>
                </div>
            </a>
        </Link>
    )
};