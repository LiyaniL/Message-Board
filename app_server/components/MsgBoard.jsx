const React = require('react');
const MsgList = require('./MsgList.jsx');
const NewMsg = require('./NewMsg.jsx');
const Login = require('./Login.jsx');
const Registration = require("../../client_side/Registration.jsx");

const adminid = "5cb104a70c69711574708796";

class MsgBoard extends React.Component{
    constructor(props) {
        super(props);
        this.addMessage = this.addMessage.bind(this);
        this.register = this.register.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
        this.deleteSingleMessage = this.deleteSingleMessage.bind(this);
        this.deleteAllMessages = this.deleteAllMessages.bind(this);
        this.editMessage = this.editMessage.bind(this);
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
            this.state = {
                messages: this.props.messages,
                loginForm: true,
                loginAttempts: 3,
                loginFail: false,
                registrationForm: false,
                registrationFail: false,

                userCredentials: {
                    email: '',
                    password: ''
                },
                currentuser: "",
                loggedInUserId: "",
                loggedInUserName: ""
            };
    }

    handleHTTPErrors(response) {
        if(!response.ok) throw Error(response.status + 
        ': ' + response.statusText);
        return response;
    }

    logout() {
        
    }

    login(userCredentials) {
        // userCredentials is passed in from Login Component
        // For basic authentication it is username:password
        // (but we're using email)
        const basicString = userCredentials.email + ':' + userCredentials.password;

        fetch(`${process.env.API_URL}/users/login`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(basicString)
            }
        })
        .then(response=> {
            // No more login attempts. throw an error
            if (this.state.loginAttempts === 0) throw 'locked out';

            // OK response, credentials accepted
            if (response.status === 200) {
                this.setState({
                    userCredentials: userCredentials,
                    loginForm: false,
                    loginFail: false
                });
                return response;
            }
            else {
                // Credentials are wrong
                this.setState((state) => {
                    return ({
                        loginFail: true,
                        loginAttempts: state.loginAttempts - 1
                    });
                });
            }

        })
        .then(result=> result.json())
        .then(result=> {
            this.setState({
                currentuser: result,
                loggedInUserId: result._id,
                loggedInUserName: result.username
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    register() {
        this.setState({
            registrationForm: true
        });
    }

    addNewUser(userDetails) {
        fetch(`${process.env.API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
        .then(response=> {
            if (response.status === 201) {
                // User successfully registered
                // disalbe the Registration Form
                this.setState({
                    registrationForm: false,
                    registrationFail: false
                });
            }
            else {
                //Some Error or User already exists
                this.setState({
                    registrationFail: true
                });
            }
        })
        .catch(error => {
            console.log(error);
        }); 
    }
    editMessage(message){
        const basicString = this.state.userCredentials.email + ':' + this.state.userCredentials.password;
        console.log(JSON.stringify(message));
        // update back-end data
        fetch(`${process.env.API_URL}/msgs/`+message._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(basicString)
            },
            body: JSON.stringify(message)
        })
        .then(response=> {
            if(response.status == 200) {
                return response;
            }

        })
        .then(result=>result.json() )
        .then(result=> {
            console.log(result)

            
        })
        
        .catch(error=> {
            console.log(error);
        });
    }
    

    addMessage(message) {
        const basicString = this.state.userCredentials.email + ':'
        + this.state.userCredentials.password;

        // update back-end data
        fetch(`${process.env.API_URL}/msgs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(basicString)
            },
            body: JSON.stringify(message)
        })
        .then(response=> this.handleHTTPErrors(response))
        .then(result => result.json() )
        .then(result => {
        let msgs = this.state.messages;
        // append to array
        msgs.push(result);

        //update state var
        this.setState({
            messages: msgs
        })
        })
        .catch(error=> {
            console.log(error);
        });

    }

    deleteAllMessages(message) {
        fetch(`${process.env.API_URL}/msgs`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                
            },
        })
        .then(response=> {
            if(response.status == 200) {
                return response;
            }

        })
        .then(result=>result.json() )
        .then(result=> {
        var newMsgArray = Object.assign(this.state.messages);
        newMsgArray.splice(0);
        this.setState({
            messages: newMsgArray
        }); 
        })
        
        .catch(error=> {
            console.log(error);
        });
      }
    

    deleteSingleMessage(message) {
        // update back-end data
        fetch(`${process.env.API_URL}/msgs/`+message._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(message)
        })
        .then(response=> {
            if(response.status == 200) {
                return response;
            }

        })
        .then(result=>result.json() )
        .then(result=> {
        console.log(result + "this should be the single message that we want to delete");
        var newMsgArray = Object.assign(this.state.messages);
        var filtered = newMsgArray.filter( message => message._id != result._id);
        console.log(filtered);
        this.setState({
            messages: filtered
        }); 
        })
        
        .catch(error=> {
            console.log(error);
        });
      }

    componentDidMount() {
        fetch(`${process.env.API_URL}/msgs`)
        .then(response=> this.handleHTTPErrors(response))
        .then(response=> response.json())
        .then(result=> {
            this.setState({
                messages: result,

            });
        })
        .catch(error=> {
            console.log(error);
        });
    }


    render() {
        let form;
        let deleteAll;
        let logout;
        logout = <button className="btn btn-primary mb-2" onClick={this.logout}>Logout</button>
        if (this.state.loggedInUserId == adminid) {
            deleteAll = <button className="btn btn-danger mb-2" onClick={this.deleteAllMessages}>Delete All</button>
        }
        if (this.state.registrationForm) {
            let failedRegistration;

            if (this.state.registrationFail) {
                failedRegistration = <p className="text-danger">User already Registered or Registration Error.</p>
            }

            return (
                <div>
                    <Registration registerNewUserCallback={this.addNewUser}/>
                    {failedRegistration}
                </div>

            )
        }
        else {
            if (this.state.loginForm) {
                form = <Login registerCallback={this.register}
                loginCallback={this.login}
                loginFail={this.state.loginFail}
                loginAttempts={this.state.loginAttempts}/>
            }
            else {
                form = <NewMsg addMessageCallback={this.addMessage} currentuser={this.state.currentuser} />
            }
            
            return (
                <div>
                    {form}
                    {deleteAll}
                    <MsgList currentuser={this.state.currentuser} messages={this.state.messages} deleteSingleMsgCallback={this.deleteSingleMessage} editSingleMsgCallback={this.editMessage}/>
                </div>
            );
        }
    }



}

module.exports = MsgBoard;