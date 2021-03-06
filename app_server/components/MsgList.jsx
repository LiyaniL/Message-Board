const React = require('react');
const Message = require('./Message.jsx');

const MsgList = (props) => {
    return (
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col" className="w-25">#</th>
                    <th scope="col" className="w-25">Name</th>
                    <th scope="col" className="w-50">Message</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.messages.reverse().map( (message, index) =>
                <Message currentuser={props.currentuser} key={message.id} message={message} index={index} deleteSingleMsgCallback={props.deleteSingleMsgCallback} editSingleMsgCallback={props.editSingleMsgCallback}/>
                    // <tr key={message.id}>
                    //     <td>{index+1}</td>
                    //     <td>{message.name}</td>
                    //     <td>{message.msg}</td>
                    // </tr>
                )}
            </tbody>
        </table>
    )
}

module.exports = MsgList;