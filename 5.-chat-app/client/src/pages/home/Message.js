import React from 'react';
import classNames from 'classnames';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';

import { useAuthState } from '../../context/auth';

const Message = ({ message }) => {
    const { user } = useAuthState();
    const sent = message.from === user.username;
    const received = !sent;

    return (
        <OverlayTrigger
            placement={sent? 'right' : 'left'}
            overlay={
                <Tooltip>
                    { moment(message.createdAt).format('MMMM DD, YYYY @ h:mm a')}
                </Tooltip>
            }
            transition={false}
        >
            <div className={classNames('d-flex my-3', {
            'ms-auto': sent,
            'me-auto': received
            })}>
                <div className={classNames('py-2 px-3 rounded-pill', {
                    'bg-primary': sent,
                    'bg-secondary-2': received
                })}>
                    <p className={classNames({ "text-white": sent})}>
                        {message.content}
                    </p>
                </div>
            </div>
        </OverlayTrigger>
    )
}

export default Message;