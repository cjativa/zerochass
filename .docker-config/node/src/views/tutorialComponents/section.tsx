import * as React from 'react';
import { Tutorial } from 'interfaces/tutorial';
import { ProgressCheck } from './progressCheck';
import marked from 'marked';

import prismjs from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
// import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
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

        return (
            <section className="section line-numbers">
                <div className="section-grid">
                    <div className="data">
                        <h2 id={id}>{content.sectionTitle}</h2>
                        <div dangerouslySetInnerHTML={{ __html: marked(content.sectionContent) }} />
                        <div className="section-progress">
                            <hr className="section-rule" />
                            {progressCheck}
                        </div>
                    </div>
                </div>
            </section >
        )
    }
}