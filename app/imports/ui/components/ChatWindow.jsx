import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import { Menu, Dropdown, Comment, Popup, Icon, Form, Button, Header } from 'semantic-ui-react';
import { Chats } from '../../api/Chats';

class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { input: '' }
        this.postMessage = this.postMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
    }

    openChat(connection) {
    }

    handleChange(event) {
        this.setState({ input: event.target.value });
    }


    postMessage() {
        this.setState({ input: '' });
        Chats.collection.update(this.props.chat._id, { 
            $push: { 
                messages: { 
                    _id: new Meteor.Collection.ObjectID(),
                    message: this.state.input, 
                    time: new Date(), 
                    userId: this.props.user._id, 
                    email: this.props.user.emails[0].address
                }
            }
        });
    }

    render() {
        const chatWindowStyle = {
            maxHeight: '200px',
            overflow: 'scroll'
        }
        let user = this.props.user;
        let chat = this.props.chat;
        let newMessage = '';
        console.log("chat window", chat);
        return (
            <Comment.Group>
                <Header as='h3' dividing>
                    Chat
                </Header>
                <div style={chatWindowStyle}>
                {chat.messages.map((message, index) => {
                    return(
                    <Comment key={index}>
                        <Comment.Content>
                            <Comment.Author as='a'>{message.email}</Comment.Author>
                            <Comment.Metadata>
                                <div>{message.time.toLocaleString()}</div>
                            </Comment.Metadata>
                            <Comment.Text>{message.message}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                    )
                })}
                </div>
                <Form reply>
                    <Form.Input value={this.state.input} onChange={this.handleChange} />
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={() => this.postMessage()} />
                </Form>
            </Comment.Group>
        );
    }
}

export default ChatWindow;
