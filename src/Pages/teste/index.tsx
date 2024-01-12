import React from 'react'



function Test(props) {
    return (
        <div>
            <p>Hello {props.name}</p>
            <p>{props.children}</p>
        </div>
    )
}

export default function Tess() {
    return (
        <Test name="Candidate"  children="Frontend">
            <p>Hellow to hackakakka</p>
        </Test>
    )
}