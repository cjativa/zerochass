import * as React from 'react';
import { Tutorial } from 'interfaces/tutorial';

interface Props {
    title: string,
    tags: Tutorial['tags'],
    featuredImage: Tutorial['featuredImage'],
    color: string;
}



export class Header extends React.Component<Props> {


    render() {

        const { title, tags, featuredImage, color } = this.props;

        const style = {
            backgroundImage: `url(${featuredImage})`,
        }

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
    }
}