const React = require("react");

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          msg: "",
          currentuser: this.props.currentuser._id
        };
      }
    
    render() {
        
    return (
        <tr>
        <td>{this.props.index+1}</td>
        <td>{this.props.message.name}</td>
        <td>{this.props.message.msg}</td>
        </tr>
    )};
}

module.exports = Message;