import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {getQuotes} from './quotes';

function App(): JSX.Element {
    return <div>Hello World</div>;
}

getQuotes(450000, 750, "SingleFamily", "Primary").then(console.log);

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
