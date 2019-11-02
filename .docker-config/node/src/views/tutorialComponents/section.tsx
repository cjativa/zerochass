import * as React from 'react';
import { Tutorial } from 'interfaces/tutorial';
import { ProgressCheck } from './progressCheck';
import marked from 'marked';

import prismjs from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-tsx.min.js';

interface Props {
    content: Tutorial['tutorialContent'][0];
    id: string;
    index: number
    onProgressClick: (index: number) => void
}

export class Section extends React.Component<Props> {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        prismjs.highlightAll();
    }

    render() {

        const { content, id, onProgressClick, index } = this.props;
        const sectionCompleted = null;

        return (
            <section className="section line-numbers">
                <div className="section-grid">
                    <div className="data">
                        <h2 id={id}>{content.sectionTitle}</h2>
                        <p dangerouslySetInnerHTML={{ __html: marked(content.sectionContent) }}></p>
                        <div className="section-progress">
                            <hr className="section-rule" />
                            <ProgressCheck sectionCompleted={sectionCompleted} onProgressClick={onProgressClick} clickIndex={index} />
                        </div>
                    </div>
                </div>
            </section >
        )
    }
}