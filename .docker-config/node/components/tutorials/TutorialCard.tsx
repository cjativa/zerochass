import Link from 'next/link';

interface TutorialCardProps {
    tutorial: any,
    large?: boolean
}

export const TutorialCard = (props: TutorialCardProps) => {

    const { featuredImage, title, color, description, slug } = props.tutorial;

    const shorterDescription = description[0].secondLine;
    const imageUrl = featuredImage[0].url;

    let titleClass = 'tl-card__title';
    let subtitleClass = 'tl-card__subtitle';

    if (props.large) {
        titleClass += ' large';
        subtitleClass += ' large';
    }

    return (
        <Link href={`/tutorial/${slug}`}>
            <a className="tl-card" >
                <div className={`tl-card__top ${color}`}  >
                    <img className="tl-card__image" src={imageUrl} />
                    <div className="tl-card__layer" />
                </div>
                <div className={`tl-card__bottom`}>
                    <h1 className={titleClass}>{title}</h1>
                    <p className={subtitleClass}>{shorterDescription}</p>
                </div>
            </a>
        </Link>
    )
};