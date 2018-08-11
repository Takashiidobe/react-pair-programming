//our imports
import React, { Component } from "react";
import io from "socket.io-client";
import "./css/main.css";
//the uncontrolled component allows us to type inside of it
import { UnControlled as CodeMirror } from "react-codemirror2";

//our css imports to allow our code editors to look nifty
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

class App extends Component {
  //class with state (skip constructor/super because we have no other components)
  state = {
    js: "",
    html: "",
    css: "",
    typing: []
  };

  componentDidMount() {
    socket.on("append value", value => {
      this.setState({
        html: this.state.html.concat(`\n + ${value.html}`),
        css: this.state.css.concat(`\n + ${value.css}`),
        js: this.state.js.concat(`\n + ${value.js}`)
      });
    });

    socket.on("render html", value => {
      this.setState({
        html: value.html
      });
    });

    //allows for ctrl||cmd + shift + s to save and override
    //allows for ctrl||cmd + shift + a to append to the end of friends' text
    //allows for ctrl||cmd + shift + c to clear the text
    window.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
        switch (String.fromCharCode(e.which).toLowerCase()) {
          case "s":
            e.preventDefault();
            socket.emit("submit", {
              html: this.state.html,
              css: this.state.css,
              js: this.state.js
            });
            break;
          case "a":
            e.preventDefault();
            socket.emit("append", {
              html: this.state.html,
              css: this.state.css,
              js: this.state.js
            });
            break;
          case "c":
            e.preventDefault();
            this.setState({
              html: "",
              css: "",
              js: ""
            });
            break;
          default:
            break;
        }
      }
    });
  }
  componentWillUpdate() {}

  componentDidUpdate() {
    let output = document.getElementById("output");
    output.srcdoc = `${this.state.html}<style>
    ${this.state.css}</style><script>${this.state.js}</script>`;
    console.log(output);
  }

  render() {
    return (
      <div className="App">
        <div className="editors">
          <div id="html">
            <CodeMirror
              className="code-mirror"
              value=""
              options={{
                mode: "html",
                theme: "material",
                lineNumbers: true
              }}
              onChange={(editor, data, value) => {
                console.log(value);
                socket.emit("change html", {
                  html: value
                });
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
        <div id="typing">{this.state.typing}</div>
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
