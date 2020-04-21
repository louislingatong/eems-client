import React from 'react';

const Page = props => {
    return (
        <React.Fragment>
            <h1>Hello { props.auth.me ? props.auth.me.name : ''}</h1>
        </React.Fragment>
    );
};

export default Page;