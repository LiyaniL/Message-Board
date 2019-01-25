'use strict';

const React = require('react');
const ReactDOMServer = require('react-dom/server');

require("@babel/register") ({
    presets: [ '@babel/preset-react' ]
});

const Header = React.createFactory(require('../components/Header.jsx'));
const Footer = React.createFactory(require('../components/Footer.jsx'));
const MsgBoard = React.createFactory(require('../components/MsgBoard.jsx'));

const msgs = [
    { id: 1, name: 'Bill', msg: 'Hi All!' },
    { id: 2, name: 'Ann', msg: 'ICS 221 is fun!' },
    { id: 3, name: 'John', msg: 'Howdy!' },
    { id: 4, name: 'Barb', msg: 'Hi'},
    { id: 5, name: 'Frank', msg: 'Who\'s tired?'},
    { id: 6, name: 'Sarah', msg: 'I heart React' }
];

// index handler
const index = (req, res) => {
    res.render('index', {
        title: 'ICS 221 Universal JS Msg Board',
        header: ReactDOMServer.renderToString(Header()),
        footer: ReactDOMServer.renderToString(Footer()),
        msgBoard: ReactDOMServer.renderToString(MsgBoard(
            { messages: msgs }
        )),
        props: '<script>let messages=' + JSON.stringify(msgs.reverse()) + '</script>'
    });
};

module.exports = { index };