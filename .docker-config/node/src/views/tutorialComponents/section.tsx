import * as React from 'react';
import { Tutorial } from 'interfaces/tutorial';
import { ProgressCheck } from './progressCheck';

interface Props {
    content: Tutorial['tutorialContent'][0];
}

export class Section extends React.Component<Props> {

    constructor(props) {
        super(props);
    }

    onProgressClick = () => {
        console.log(`Progress was clicked so marking this`);
    }

    render() {

        const { content } = this.props;
        const { onProgressClick } = this;
        const sectionCompleted = null;

        return (
            <section className="section">
                <div className="section-grid">
                    <div className="data">
                        <h2 id={content.sectionTitle}>{content.sectionTitle}</h2>
                        <p dangerouslySetInnerHTML={{ __html: content.sectionContent }}></p>
                        <div className="section-progress">
                            <hr className="section-rule" />
                            {/* <ProgressCheck sectionCompleted={sectionCompleted} onProgressClick={onProgressClick} /> */}
                        </div>
                    </div>
                </div>
            </section >
        )
    }
}