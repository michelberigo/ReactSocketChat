import React from 'react';
import socketIOClient from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT, {transports: ['websocket']});

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            room_config: {
                room_id: '',
                users_count: 0,
            }
            
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let _this = this;

        socket.on('chat message', function (author, chatAction, message) {
            let messages = _this.state.messages;

            messages.push({
                author: author,
                description: message,
                chat_action: chatAction
            });

            _this.setState({messages: messages}, () => {
                let chatDiv = document.getElementById("chat-messages");
                chatDiv.scrollTop = chatDiv.scrollHeight;
            });
        });

        socket.on('room config', function (usersCount, roomId) {
            _this.setState({
                room_config: {
                    room_id: roomId,
                    users_count: usersCount
                }
            });
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        let message = document.getElementById('chat_description').value;

        if (!message.trim()) {
            return;
        }

        socket.emit('chat message', this.state.room_config.room_id, message);

        event.target.reset();
    }

    render() {
        return (
            <div className="container-fluid h-100">
                <div className="row h-auto">
                    <div className="clearfix">
                        <div className="float-start"><h1 className="text-center mt-3">MESSAGES - { this.state.messages.length }</h1></div>
                        <div className="float-end"><h1 className="text-center mt-3">{ this.state.room_config.room_id } - { this.state.room_config.users_count } USERS</h1></div>
                    </div>
                </div>

                <div className="row h-75">
                    <div className="d-md-flex h-100">
                        <div className="overflow-auto bg-light w-100" id="chat-messages">
                            <ul className="list-group">
                                { this.state.messages.map((message, index) => {
                                    let msg = '';

                                    if (message.chat_action === 'login') {
                                        msg = <b>{ message.author } entrou!</b>;
                                    } else if (message.chat_action === 'logout') {
                                        msg = <b>{ message.author } saiu!</b>;
                                    } else if (message.chat_action === 'chat') {
                                        msg = <><b>{ message.author } disse: </b> { message.description }</>;
                                    }

                                    return (
                                        <li key={ index } className="list-group-item">
                                            { msg }
                                        </li>
                                    );
                                }) }
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row h-auto">
                    <div className="fixed-bottom mb-3">
                        <form action="" onSubmit={ this.handleSubmit } id="chat-form">
                            <div className="row">
                                <div className="col-sm-11 form-group">
                                    <input type="text" name="description" id="chat_description" className="form-control" placeholder="Message..." />
                                </div>

                                <div className="col-sm-1">
                                    <button type="submit" className="btn btn-success"><FontAwesomeIcon icon={faPaperPlane} /> Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;