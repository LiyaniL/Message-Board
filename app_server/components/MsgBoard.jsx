const React = require('react');
const MsgList = require('./MsgList');
const NewMsg = require('./NewMsg.jsx');

class MsgBoard extends React.Component{
    constructor(props) {
        super(props);
        this.addMessage = this.addMessage.bind(this);
            this.state = {
                messages: this.props.messages

            };
    }

    addMessage() {
        // TODO: Make API Call to store a new message and update state var message
    }


    render() {
        
        return (
            <div>
                <NewMsg addMsgCallback={this.addMessage}/>
                <MsgList messages={this.state.messages}/>
            </div>
        );
    }



}

module.exports = MsgBoard;