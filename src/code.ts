if (figma.command === 'openMeet') {
    let name = figma.currentPage.selection[0].getPluginData('meetingName');
    figma.showUI(__html__, {width: 300, height: 300})
    figma.ui.postMessage(name);
} else {
    const node = figma.currentPage.findOne(node => node.type === "TEXT" && node.characters.indexOf('Open the plugin to join the meeting!') !== -1)
    let name = node ? node.parent.getPluginData('meetingName') : undefined;
    if (name && name !== '') {
        figma.showUI(__html__, {width: 300, height: 300})
        figma.ui.postMessage(name);
    } else {
        figma.showUI(__html__, {width: 300, height: 300})
    }
}

figma.ui.onmessage = async msg => {
    if (msg.type === 'create-meeting') {
        await figma.loadFontAsync({family: 'Monaco', style: 'Regular'})
        const nodes = []
        const rect = figma.createNodeFromSvg(msg.img);
        let node = figma.group(rect.children, rect);
        rect.appendChild(node);
        rect.resize(1200, 600);
        (rect as BaseNode).setRelaunchData(({openMeet: msg.meetingName}));
        (rect as BaseNode).setPluginData('meetingName', msg.meetingName);
        figma.currentPage.appendChild(rect)
        nodes.push(rect)
        figma.currentPage.selection = nodes
        figma.viewport.scrollAndZoomIntoView(nodes)
    }

    figma.closePlugin()
}
