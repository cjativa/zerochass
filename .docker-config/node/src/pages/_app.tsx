import { AppProps } from 'next/app';


import '../styles/styles.scss';
import 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-typescript.js';

import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-tsx.min.js';
import 'prismjs/components/prism-scss.min.js';

import '@fortawesome/fontawesome-free/css/all.css';
import 'react-markdown-editor-lite/lib/index.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}


export default MyApp;