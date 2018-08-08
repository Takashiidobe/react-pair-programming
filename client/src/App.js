//our imports
import React, { Component } from "react";
import io from "socket.io-client";
import "./css/main.css";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

//allows usage of languages
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/htmlmixed/htmlmixed");
require("codemirror/mode/css/css");

//allows us to polyfill the srcdoc attribute for internet explorer
require("srcdoc-polyfill");

//our backend server that we're connecting to
const socket = io("http://localhost:4001");
//class with state (skip constructor/super because we have no other components)

//metaLeft = 91
//metaRight = 93
//Enter = 13

class App extends Component {
  state = {
    js: "",
    html: "",
    css: ""
  };

  componentDidMount() {
    console.log(this.state);

    socket.on("value", value => {
      this.setState({
        html: value.html,
        css: value.css,
        js: value.js
      });
    });

    //overrides the default ctrl and command key to allow for saving.
    window.addEventListener("keydown", e => {
      if (e.ctrlKey || e.metaKey) {
        switch (String.fromCharCode(e.which).toLowerCase()) {
          case "s":
            e.preventDefault();
            socket.emit("submit", {
              html: this.state.html,
              css: this.state.css,
              js: this.state.js
            });
            break;
        }
      }
    });
  }

  componentDidUpdate() {
    let output = document.getElementById("output");
    output.srcdoc = `${this.state.html}<style>
    ${this.state.css}</style><script>${this.state.js}</script>`;
  }

  onHandleSubmit = () => {
    socket.emit("submit", {
      html: this.state.html,
      css: this.state.css,
      js: this.state.js
    });
  };

  render() {
    return (
      <div className="App">
        <div className="editors">
          <div id="html">
            <CodeMirror
              className="code-mirror"
              value={this.state.html}
              options={{
                mode: "html",
                theme: "material",
                lineNumbers: true
              }}
              onChange={(editor, data, value) => {
                this.setState({
                  html: value
                });
              }}
            />
          </div>
          <div id="css">
            <CodeMirror
              className="code-mirror"
              value={this.state.css}
              options={{
                mode: "css",
                theme: "material",
                lineNumbers: true
              }}
              onChange={(editor, data, value) => {
                this.setState({
                  css: value
                });
              }}
            />
            <button onClick={this.onHandleSubmit}>Submit</button>
          </div>
          <div id="js">
            <CodeMirror
              id="js"
              className="code-mirror"
              value={this.state.js}
              options={{
                mode: "js",
                theme: "material",
                lineNumbers: true
              }}
              onChange={(editor, data, value) => {
                this.setState({
                  js: value
                });
              }}
            />
          </div>
        </div>
        <div className="compiled">
          <iframe
            id="output"
            name="output"
            kwframeid="1"
            title="output"
            srcDoc=""
          />
        </div>
      </div>
    );
  }
}

export default App;
