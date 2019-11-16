import * as React from 'react';

interface RelatedTutorial {
    title: string,
    link: string
}

interface Props {
    nextEntry?: RelatedTutorial,
    previousEntry?: RelatedTutorial
}

export const RelatedNavigator = (props: Props) => {

    const NextTutorial = () => {

        const { nextEntry: tutorial } = props;

        return (
            <div className="entry next">
                <div className="link-box">
                    <span className="entry-label">Next</span>
                    <a className="entry-link" href={`${tutorial.link}`}>{tutorial.title}</a>
                </div>
                <i className="fas fa-arrow-circle-right" />
            </div>
        )
    }

    const PreviousTutorial = () => {

        const { previousEntry: tutorial } = props;

        return (
            <div className="entry previous">
                <i className="fas fa-arrow-circle-left" />
                <div className="link-box">
                    <span className="entry-label">Previous</span>
                    <a className="entry-link" href={`${tutorial.link}`}>{tutorial.title}</a>
                </div>
            </div>
        )
    }

    return (
        <div className="related-navigator">
            {(props.previousEntry) ? <PreviousTutorial /> : <div />}
            {(props.nextEntry) ? <NextTutorial /> : <div />}
        </div>
    )
}