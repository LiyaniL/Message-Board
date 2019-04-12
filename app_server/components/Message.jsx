const React = require("react");

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteSingleMessage = this.handleDeleteSingleMessage.bind(this);
    this.handleEditSingleMessage = this.handleEditSingleMessage.bind(this);
    this.handleSaveMessage = this.handleSaveMessage.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.state = {
      name: "",
      msg: "",
      newmsg: "",
      edit: false,
      currentuser: this.props.currentuser._id
    };
  }

  handleDeleteSingleMessage(event) {
      this.props.deleteSingleMsgCallback(this.props.message)

  }
  handleEditSingleMessage(event) {
    this.setState({
        edit: !this.state.edit
    });

}
handleSaveMessage(event) {
    let newMsg = Object.assign(this.props.message);
    newMsg.msg = this.state.newmsg;
    this.props.editSingleMsgCallback(newMsg);
    this.setState({
        edit: !this.state.edit
    });

}

handleEditChange(event) {
    this.setState({
        newmsg: event.target.value
    });

}

  render() {
    if (this.props.message.name == this.props.currentuser.username && !this.state.edit) {
      return (
        <tr>
          <td>{this.props.index + 1}</td>
          <td>{this.props.message.name}</td>
          <td>{this.props.message.msg}</td>
          <td>
            <button className="btn btn-danger" onClick={this.handleDeleteSingleMessage}>
              Delete
            </button>
            <button className="btn btn-primary mt-2" onClick={this.handleEditSingleMessage}>
              Edit
            </button>
          </td>
        </tr>
      );
    }
if (this.state.edit) {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>{this.props.message.name}</td>
        <td><input type="text" onChange={this.handleEditChange}></input></td>
        <td>
        <button className="btn btn-success mt-2" onClick={this.handleSaveMessage}>
              Save
            </button>
            <button className="btn btn-primary mt-2" onClick={this.handleEditSingleMessage}>
              Cancel
            </button>
            </td>
        <td />
      </tr>
    );

  }
  return (
    <tr>
      <td>{this.props.index + 1}</td>
      <td>{this.props.message.name}</td>
      <td>{this.props.message.msg}</td>
      <td/>
          </tr>
  )};
}

module.exports = Message;
