import { AxiosResponse } from 'axios';
import React from 'react';
import { Message } from 'semantic-ui-react';

interface IProps {
    error: AxiosResponse,
    text?: string
}

function ErrorMessage({error, text}: IProps){

    return(
        <Message error>
            <Message.Header>{error.statusText}</Message.Header>
            {error.data && Object.keys(error.data).length > 0 && (
                <Message.List>
                    {Object.values(error.data.errors).flat().map((err:any, i) => (
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
            {text && <Message.Content content={text}/>}
        </Message>
    )
}

export default ErrorMessage;