import React from 'react'
import useSWR from 'swr'
import { getContent } from '../_content/getContent';


function GoogleDocContent ({ id }) {
    const { data, error } = useSWR(id, getContent)

    console.log('<Content', { id, data });

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return <div className="content-from-google-docs" dangerouslySetInnerHTML={{__html:data}}></div>
}


export { GoogleDocContent }