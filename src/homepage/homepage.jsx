import React from "react";

import { Controlled as CodeMirror } from "react-codemirror2";

import "../../node_modules/codemirror/lib/codemirror";
import "../../node_modules/codemirror/mode/javascript/javascript";

import "../../node_modules/codemirror/addon/edit/closebrackets";
import "../../node_modules/codemirror/addon/selection/active-line";
import "../../node_modules/codemirror/addon/lint/lint";
import "../../node_modules/codemirror/addon/lint/javascript-lint";

import { JSHINT } from "jshint";

import checkFormat from "../functions/check-format";
import parsedCode from "../functions/parsed-code";
import unsortedCode from "../functions/unsorted-code";
import sortFunction from "../functions/sort-function";
import sortCallStack from "../functions/sort-call-stack";

import "./homepage.styles.scss";

import "../../node_modules/codemirror/lib/codemirror.css";
import "../../node_modules/codemirror/theme/dracula.css";
import "../../node_modules/codemirror/addon/lint/lint.css";

window.JSHINT = JSHINT;

class HomePage extends React.Component {
  constructor() {
    super();

    this.editor = React.createRef();
    this.callStackPlayground = React.createRef();
    this.webApiPlayground = React.createRef();
    this.callbackQueuePlayground = React.createRef();

    this.state = {
      value: "",
      unsortedCallStack: [],
      unsortedFunction: [],
      isCallStack: [],
      isFunction: [],
      isWebApi: [],
      isCallbackQueue: [],
    };
  }

  componentDidMount() {
    const markup = `function three() {
setTimeout(function () {
  console.log("last three");
}, 1000);
console.log("three");
}

setTimeout(function () {
  console.log("yes, setTimeout");
  one();
}, 1000);
        
function two() {
  console.log("two");
  three();
}
          
function one() {
  console.log("one");
  two();
}
          
console.log(multiply(4, 20));
          
one();`;

    this.setState({ value: markup });
  }

  onClick = () => {
    // STATE VARIABLES
    let {
      value,
      unsortedCallStack,
      unsortedFunction,
      isCallStack,
      isFunction,
      isWebApi,
      isCallbackQueue,
    } = this.state;

    // REF VARIABLES
    const editor = this.editor.current.editor;
    let callStackPlayground = this.callStackPlayground.current;
    let webApiPlayground = this.webApiPlayground.current;
    let callbackQueuePlayground = this.callbackQueuePlayground.current;

    // CLEAR STATE
    const clearState = function () {
      unsortedCallStack = [];
      unsortedFunction = [];
      isCallStack = [];
      isFunction = [];
      isWebApi = [];
      isCallbackQueue = [];

      callbackQueuePlayground.innerHTML = "";
      webApiPlayground.innerHTML = "";
      callbackQueuePlayground.innerHTML = "";
    };

    clearState();

    // CHECK FORMAT SPELLING
    const success = checkFormat(JSHINT, value);

    // IF NO FORMAT ERROR
    if (success) {
      // PARSING CODE TREE
      const parsedCodeTree = parsedCode(value);

      // UNSORTING CODE
      unsortedCode(parsedCodeTree, unsortedCallStack, unsortedFunction);

      // SORTING FUNCTION
      sortFunction(unsortedFunction, isFunction);

      // SORTING CALL STACK
      sortCallStack(unsortedCallStack, isCallStack, isFunction);

      console.log(isFunction);
      console.log(isCallStack);
    }
  };

  render() {
    return (
      <div className="homepage">
        <div className="navbar">
          <button onClick={this.onClick}>visualize</button>
        </div>
        <div className="main">
          <div className="main__left">
            <CodeMirror
              ref={this.editor}
              className="playground"
              value={this.state.value}
              options={{
                lineNumbers: true,
                firstLineNumber: 1,
                lineWrapping: true,
                mode: "javascript",
                theme: "dracula",
                styleActiveLine: true,
                autoCloseBrackets: true,
                tabSize: 2,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-lint-markers"],
                lint: true,
              }}
              onBeforeChange={(editor, data, value) => {
                this.setState({ value });
              }}
              onChange={(editor, data, value) => {}}
            />
          </div>
          <div className="main__right">
            <div className="call-stack event">
              <div className="event__title">Call Stack</div>

              <div className="event__border">
                <div
                  ref={this.callStackPlayground}
                  className="call-stack__content event__content"
                ></div>
              </div>
            </div>

            <div className="web-api event">
              <div className="event__title">Web Api</div>

              <div className="event__border">
                <div
                  ref={this.webApiPlayground}
                  className="web-api__content event__content"
                ></div>
              </div>
            </div>

            <div className="callback-queue event">
              <div className="event__title">Callback Queue</div>

              <div className="event__border">
                <div
                  ref={this.callbackQueuePlayground}
                  className="callback-queue__content event__content"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
