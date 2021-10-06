import React, { Fragment } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAuthDispatch } from '../../context/auth';
import Users from './Users';
import Messages from './Messages';

const Home = ({ history }) => {
    const dispatch = useAuthDispatch();

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        //history.push('/login')
        window.location.href = '/login' // eliminar el cache
    };

    //if(messagesData) console.log('Messages: ', messagesData.getMessages)

    return (
        <Fragment>
            <Row className="bg-white mb-1">
                <Col>
                    <Link to="/login">
                        <Button variant="link">Login</Button>
                    </Link>
                </Col>
                <Col>
                    <Link to="/register">
                        <Button variant="link">Register</Button>
                    </Link>
                </Col>
                <Col>
                    <Button variant="link" onClick={logout}>
                        Logout
                    </Button>
                </Col>
            </Row>
            <Row className="bg-white">
                <Users />
                <Messages />
            </Row>
        </Fragment>
    )
}

export default Home;