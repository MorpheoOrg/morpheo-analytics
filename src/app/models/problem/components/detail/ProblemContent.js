import React from 'react';
import {onlyUpdateForKeys} from 'recompose';
import {css} from 'react-emotion';
import ReactMarkdown from 'react-markdown';
import {shell} from 'electron';

import description from './description.md';


class RouterLink extends React.Component {
    handleOnClick = () => {
        shell.openExternal(this.props.href);
    }

    style = css`
        color: -webkit-link;
        text-decoration: underline;
        cursor: pointer;
    `

    render() {
        return (
            <a
                css={this.style}
                onClick={this.handleOnClick}
            >
                {this.props.children}
            </a>
        );
    }
}


const ProblemContent = () => (
    <ReactMarkdown
        source={description}
        renderers={{Link: RouterLink}}
    />
);


export default onlyUpdateForKeys([

])(ProblemContent);
