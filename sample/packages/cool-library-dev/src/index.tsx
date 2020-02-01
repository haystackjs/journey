import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { VERSION } from 'cool-library';

import './index.css';

ReactDOM.render(
    <p>{VERSION}</p>,
    document.getElementById('root'),
);