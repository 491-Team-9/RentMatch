import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import { Menu, Dropdown, Comment, Popup, Icon, Form, Button, Header } from 'semantic-ui-react';
import { Chats } from '../../api/Chats';
import ChatWindow from './ChatWindow';

class ChatBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }


    render() {
        if (this.props.ready) {
            return this.renderPage();
        }
        else {
            return "loading...";
        }
    }

    openChat(connection) {
        let foundChat = this.props.chats.find(chat => chat.users.find(c => c.userId == connection.userId))
        if (foundChat) {
            console.log(foundChat);
        } else {
            let newChat = Chats.collection.insert({ messages: [], users: [connection, { userId: this.props.user._id, email: this.props.user.emails[0].address }] },
                (error) => {
                    if (error) {
                        swal('Error', error.message, 'error');
                    } else {
                        swal('Success', 'Item added successfully', 'success');
                    }
                });
        }
    }

    renderPage() {
        let user = this.props.user;
        let chats = this.props.chats;
        console.log("chatbar", chats);
        const divStyle = {
            width: '100%',
            background: 'grey',
            position: 'fixed',
            bottom: '0'

        };
        return (
            <div style={divStyle}>
                <Menu attached="bottom" borderless inverted>
                    {chats.length ? chats.map(chat => {

                        return (
                            <Popup key={chat._id} on="click" pinned trigger={<Menu.Item key={chat._id}>
                                {chat.users[0].email}
                            </Menu.Item>}>
                                <ChatWindow key={chat._id} chat={chat} user={user}/>
                            </Popup>
                        );
                    }) : ''}
                    <Menu.Item position="right">
                        <Dropdown id="chat-menu" text="Chat " pointing="top right" icon={'chat'}>
                            <Dropdown.Menu position="top">
                                {user ? user.connections?.map(connection => {
                                    return (<Dropdown.Item key={connection.userId} id={connection.userId} onClick={() => this.openChat(connection)} icon="user" text={connection.email} />);
                                }) : <Dropdown.Item direction="up" icon="user" text="You're not connected with any users yet!" />
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe("userData");
    const user = Meteor.user();
    const subscription = Meteor.subscribe(Chats.userChatsPublicationName);
    // Determine if the subscription is ready
    const ready = subscription.ready();
    // Get the Stuff documents
    const chats = Chats.collection.find({}).fetch();

    return {
        user,
        ready,
        chats
    }
})(ChatBar);
