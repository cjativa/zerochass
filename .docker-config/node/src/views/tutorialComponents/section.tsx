import * as React from 'react';
import { Tutorial } from '../../interfaces/tutorial';
import { ProgressCheck } from './progressCheck';
import marked from 'marked';

import prismjs from 'prismjs';

// import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
// import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-tsx.min.js';



interface Props {
    content: Tutorial['tutorialContent'][0];
    id: string;
    index: number
    progressCheck: JSX.Element
}

export class Section extends React.Component<Props> {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        prismjs.highlightAll();
    }

    render() {

        const { content, id, progressCheck } = this.props;
        const { sectionTitle, sectionContent } = content;

        return (
            <section className="section line-numbers">

                {/** Section title and content */}
                <h2 id={id}>{sectionTitle}</h2>
                <div className="section__text" dangerouslySetInnerHTML={{ __html: marked(sectionContent) }} />

                {/** Section progress check icon */}
                <div className="section__progress">
                    <hr className="progress-rule" />
                    {progressCheck}
                </div>
                
            </section >
        )
    }
}