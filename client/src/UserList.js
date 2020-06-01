import React, { Component } from 'react';
import axios from 'axios';
import App from './App';

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }


    componentDidMount() {
        fetch("/users/allusers")
            .then(res => res.json())
            .then(newusers => {
                console.log(newusers);
                this.setState({ ...this.state, users: newusers });
            })
    }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     let registration = {
    //         'username': this.state.username,
    //         'password': this.state.password,
    //         'email': this.state.email
    //     };
    //     axios.post('http://localhost:3001/users/reg', registration)
    //         .then(() => console.log("Submitted: " + JSON.stringify(registration)))
    //         .catch(err => {
    //             console.error(err);
    //         })


    //     // event.preventDefault();
    // }


    render() {
        return (
            <table class="table">
                <thead>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                </thead>
                <tbody>
                    {this.state.users === null && <p>Loading users...</p>}
                    {
                        this.state.users && this.state.users.map(user => (
                            <tr>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
                // <h1>Users</h1>
                // <div className="row">
                //     {this.state.users.map(user =>
                //         <div key={user.id}>{user.username}</div>
                //     )}
                // </div>
            // </div>
        );
    }
}
export default UserList;
