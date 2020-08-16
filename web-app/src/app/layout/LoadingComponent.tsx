import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'



export function LoadingComponent({inverted = true, content}: {inverted?:boolean, content?:string} ){
    return (
        <Dimmer active inverted={inverted}>
            <Loader content={content}/>
        </Dimmer>
    )
}
