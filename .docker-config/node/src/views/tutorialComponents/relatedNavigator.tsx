import * as React from 'react';

interface RelatedTutorial {
    title: string,
    link: string
}

interface Props {
    nextTutorial?: RelatedTutorial,
    previousTutorial?: RelatedTutorial
}

export const RelatedNavigator = (props: Props) => {

    const NextTutorial = () => {

        const { nextTutorial: tutorial } = props;

        return (
            <div className="next-entry">
                <span>Next</span>
                <a href={`${tutorial.link}`}>{tutorial.title}</a>
            </div>
        )
    }

    const PreviousTutorial = () => {

        const { previousTutorial: tutorial } = props;

        return (
            <div className="previous-entry">
                <span>Previous</span>
                <a href={`${tutorial.link}`}>{tutorial.title}</a>
            </div>
        )
    }

    return (
        <div className="related-navigator">
            {props.nextTutorial && <NextTutorial />}
            {props.previousTutorial && <PreviousTutorial />}>
        </div>
    )
}