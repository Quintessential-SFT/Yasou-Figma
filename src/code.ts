if (figma.command === 'openMeet') {
    let name = figma.currentPage.selection[0].getPluginData('meetingName');
    figma.showUI(__html__)
    figma.ui.postMessage(name);
} else {
    const node = figma.currentPage.findOne(node => node.type === "TEXT" && node.characters.indexOf('Open the plugin to join the meeting!') !== -1)
    let name = node ? node.parent.getPluginData('meetingName') : undefined;
    if (name && name !== '') {
        figma.showUI(__html__)
        figma.ui.postMessage(name);
    } else {
        figma.showUI(__html__)
    }
}

figma.ui.onmessage = async msg => {
    if (msg.type === 'create-meeting') {
        await figma.loadFontAsync({family: 'Monaco', style: 'Regular'})
        const nodes = []
        const rect = figma.createFrame()
        rect.x = 150
        const message = figma.createText();
        message.fontName = {family: 'Monaco', style: 'Regular'}
        // message.x = meeting.x;
        message.characters = "Open the plugin to join the meeting!";
        rect.appendChild(message);
        rect.resize(message.width + 100, message.height * 4);
        rect.layoutAlign = 'CENTER';
        // @ts-ignore
        (rect as BaseNode).setRelaunchData(({openMeet: msg.meetingName}));
        (rect as BaseNode).setPluginData('meetingName', msg.meetingName);
        figma.currentPage.appendChild(rect)
        nodes.push(rect)
        figma.currentPage.selection = nodes
        figma.viewport.scrollAndZoomIntoView(nodes)
    }

    figma.closePlugin()
}
