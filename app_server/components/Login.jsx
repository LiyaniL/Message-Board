const React = require('react');

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleText = this.handleText.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.state = {
            email: "",
            password: ""
        }
    }
    handleText (event) {
        if(event.target.id === 'email') {
            this.setState({
                email: event.target.value
            });
        }
        else {
            this.setState({
                password: event.target.value
            });
        }
    }

    register(event) {
        this.props.registerCallback()
    }

    login(event) {
        event.preventDefault();

        // pass control to MsgBoard and send
        // the email and pass the user entered
        this.props.loginCallback({
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {
        let loginFailText;

        if (this.props.loginFail) {
            loginFailText = <p className="card-text pt-1 text-danger">Failed Login Attempt.
            &nbsp; { this.props.loginAttempts } attempts remaining.</p>
        }

        if (this.props.loginAttempts == 0) {
            loginFailText = <p className="card-text pt-1 text-danger">Failed Login Attempt.
            &nbsp; { this.props.loginAttempts } attempts remaining. You have been locked out.</p>
        }

        return(
        <div className="card">
        <div className="card-body">
            <form onSubmit={this.login}>
            <div className="form-group">
                <div className="row">
                    <label htmlFor="email"
                        className="col-3 col-form-label">
                        Enter Email:
                    </label>
                    <label htmlFor="msg"
                        className="col-7 col-form-label">
                        Enter Password:    
                    </label>
                </div>
                <div className="row">
                    <div className="col-3">
                    <input id="email" type="text" className="form-control"
                    placeholder="Enter email here..." value={this.state.email}
                    onChange={this.handleText}
                />
                </div>
                <div className="col-3">
                    <input id="password" type="password" className="form-control"
                    placeholder="Enter password here..." value={this.state.password}
                    onChange={this.handleText}
                    />
                </div>
                <div className="col-2">
                    <button type="submit" className="btn btn-primary">
                    Login
                    </button>
                </div>
            </div>
        </div>
    </form>
    {loginFailText}
        <div className="row">
        <label htmlFor="not_registered"
        className="col-5">
        Not Registered? 
        </label>
        <div className="col-10">
            <button type="submit" className="btn btn-primary" onClick={this.register}>
                        Register
            </button>
        </div>
    </div>
    <br></br>
    </div>
    </div>

        )
    }

}

module.exports = Login;