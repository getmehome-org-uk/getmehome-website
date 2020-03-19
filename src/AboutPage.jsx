import React from 'react';

import { docIds, GoogleDocContent } from './_content';

function AboutPage() {

    return (
        <GoogleDocContent id={docIds.ABOUT}/>
    );
}

export { AboutPage };