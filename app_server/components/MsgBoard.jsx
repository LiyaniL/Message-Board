const React = require('react');
const MsgList = require('./MsgList.jsx');
const NewMsg = require('./NewMsg.jsx');
const Login = require('./Login.jsx');

class MsgBoard extends React.Component{
    constructor(props) {
        super(props);
        this.addMessage = this.addMessage.bind(this);
            this.state = {
                messages: this.props.messages,
                loginForm: true,
                loginAttempts: 3,
                loginFail: false

            };
    }

    handleHTTPErrors(response) {
        if(!response.ok) throw Error(response.status + 
        ': ' + response.statusText);
        return response;
    }

    addMessage(message) {
        let msgs = this.state.messages;

        // add id attribute
        message.id = msgs.length;

        // append to array
        msgs.push(message);

        //update state var
        this.setState({
            messages: msgs
        });

        // update back-end data
        fetch(`${process.env.API_URL}/msgs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })
        .then(response=> this.handleHTTPErrors(response))
        .catch(error=> {
            console.log(error);
        })
    }

    componentDidMount() {
        fetch(`${process.env.API_URL}/msgs`)
        .then(response=> this.handleHTTPErrors(response))
        .then(response=> response.json())
        .then(result=> {
            this.setState({
                messages: result
            });
        })
        .catch(error=> {
            console.log(error);
        });
    }


    render() {
        let form;

        if (this.state.loginForm) {
            form = <Login registerCallback={this.register}
            loginCallback={this.login}
            loginFail={this.state.loginFail}
            loginAttempts={this.state.loginAttempts}/>
        }
        else {
            form = <NewMsg addMessageCallback={this.addMessage}/>
        }
        
        return (
            <div>
                {form}
                <MsgList messages={this.state.messages}/>
            </div>
        );
    }



}

module.exports = MsgBoard;