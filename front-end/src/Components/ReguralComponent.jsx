import React from 'react'

function ReguralComponent() {
    const htmlContent = '<p>This is some HTML content.</p>';
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
    )
}

export default ReguralComponent
