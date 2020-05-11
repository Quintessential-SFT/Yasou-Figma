import * as React from 'react';
import * as ReactDOM from 'react-dom'
import './ui.css'

const generated = require("./generated.png") as string;

declare function require(path: string): any

class App extends React.Component {
    textbox: HTMLInputElement

    constructor(props) {
        super(props);
    }

    countRef = (element: HTMLInputElement) => {
        this.textbox = element
    }

    onCreate = () => {
        if (!this.textbox.value || this.textbox.value.trim() === '') {
            return;
        }
        window.open('https://meet.jit.si/yasou-' + this.textbox.value, 'MyWindow', 'width=700,height=500,left=150,top=200,toolbar=0,status=0');
        parent.postMessage({
            pluginMessage: {
                type: 'create-meeting',
                meetingName: this.textbox.value,
                img: this._base64ToArrayBuffer()
            }
        }, '*')
    }

    _base64ToArrayBuffer = () => {
        var binary_string = window.atob(generated.replace('data:image/png;base64,', ''));
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes;
    }

    onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'cancel'}}, '*')
    }

    render() {
        return <div>
            <img id='logo' src={require('./logo.png')}/>
            <h2>Create your meeting!</h2>
            <input ref={this.countRef}/>
            <br/>
            <button id="create" onClick={this.onCreate}>Create</button>
            <button onClick={this.onCancel}>Cancel</button>
        </div>
    }
}

ReactDOM.render(<App/>, document.getElementById('react-page'))
