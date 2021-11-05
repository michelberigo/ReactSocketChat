import React from 'react';
import _ from 'lodash';
import { Navigate } from 'react-router-dom';

class Rooms extends React.Component {
    constructor(props) {
        super(props);

        let rooms = [];
        for (var i = 1; i < 9; i++) {
            rooms.push('room' + i);
        }

        this.state = {
            rooms: rooms
        };
    }

    listRooms() {
        let roomsChunked = _.chunk(this.state.rooms, 4);

        return (
            roomsChunked.map((row, index) => {
                return (
                    <div className="row pb-3" key={ index }>
                        { row.map((room, index) => {
                            return (
                                <div className="col-sm-3" key={ index }>
                                    <Navigate to={ room }>
                                    <div class="card">
                                        <img src="/img/room.jpg" class="card-img-top" alt="..." />

                                        <div class="card-body">
                                            <h5 class="card-title text-center">Sala { room }</h5>
                                        </div>
                                    </div>
                                    </Navigate>
                                </div>
                            )
                        }) }
                    </div>
                )
            })
        );
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <h3 className="text-center my-4">ROOMS</h3>
                </div>
                
                { this.listRooms() }
            </div>
        );
    }
}

export default Rooms;