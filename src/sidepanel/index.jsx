
import { Card } from 'antd';
import React from 'react'
import {createRoot} from 'react-dom/client';

function SidePanel() {
    return <Card
    title="Hello World"
    >
    <h1>All sites sidepanel extension</h1>
    <p>This side panel is enabled on all sites</p>
    </Card>
}
const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);

root.render(<SidePanel/>)
