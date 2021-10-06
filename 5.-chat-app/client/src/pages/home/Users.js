import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Col, Image } from 'react-bootstrap';
import classNames from 'classnames';

import { useMessageDispatch, useMessageState } from '../../context/message';

const GET_USERS = gql`
    query getUsers {
        getUsers{
            username
            imageUrl
            createdAt
            latestMessage{
                uuid
                from
                to
                content
                createdAt
            }
        }
    }
`;

const Users = () => {
    //const { loading, data, error } = useQuery(GET_USERS);
    const dispatch = useMessageDispatch();
    const { users } = useMessageState();
    const selectedUser = users?.find(u => u.selected === true )?.username;

    const { loading } = useQuery(GET_USERS, {
        onCompleted: data => dispatch({ type: 'SET_USERS', payload: data.getUsers }),
        onError: err => console.log(err)
    });

    let usersMarkup;
    if(!users || loading){
        usersMarkup = <p>Loading...</p>
    } else if(users.length === 0){
        usersMarkup = <p>No users have joined yet</p>
    } else if(users.length > 0){
        usersMarkup = users.map(user => {
            const selected = selectedUser === user.username
            return(
                <div 
                    role="button"
                    className={classNames("user-div d-flex justify-content-center justify-content-md-start p-3", {'bg-white': selected})} 
                    key={user.username} 
                    onClick={() => dispatch({ type: 'SET_SELECTED_USER', payload: user.username })}
                >
                    <Image 
                        src={user.imageUrl || 'https://www.centromedicomapfre.es/images/icons/default-avatar.png'}
                        className="user-image"
                    />
                    <div className="d-none d-md-block ms-2">
                        <p className="text-success">{user.username}</p>
                        <p className="font-weight-light">
                            {user.latestMessage? user.latestMessage.content : 'You are now connected!!'}
                        </p>
                    </div>
                </div>
            )
        })
    }

    return (
        <Col xs={2} md={4} className="p-0" style={{backgroundColor: 'rgba(245, 245, 245)'}}>
            {usersMarkup}
        </Col>
    )
}

export default Users;