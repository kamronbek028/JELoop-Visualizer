import insertElement from "./insert-element";
import highlightText from "./highlight-text";
import unhighlightText from "./unhighlight-text";

function callStackParser(
  editor,
  interval,
  isCallStack,
  isFunction,
  isWebApi,
  isCallbackQueue,
  callStackPlayground,
  webApiPlayground,
  callbackQueuePlayground
) {
  isCallStack.forEach((line, index) => {
    setTimeout(() => {
      const currentCallStack = callStackPlayground.children[0];
      const prevStack = isCallStack[index - 1];

      //  CONSOLE.LOG || FUNCTION INVOCATION
      if (line.type === "console.log" || line.type === "functionInvocation") {
        insertElement(line, editor, callStackPlayground);
        highlightText(line, editor);
      }

      // SETTIMEOUT
      else if (line.type === "setTimeout") {
        insertElement(line, editor, callStackPlayground);
        highlightText(line, editor);
      }

      // REMOVE
      else if (line.type === "remove") {
        currentCallStack.classList.add("remove-content");

        setTimeout(() => {
          unhighlightText(prevStack, editor);
          currentCallStack.remove();

          // IF PREV STACK WAS SETTIMEOUT
          if (prevStack.type === "setTimeout") {
            // INSERT INTO WEB API PLAYGROUND
            insertElement(prevStack, editor, webApiPlayground);

            // REMOVE ANIMATION FROM WEB API PLAYGROUND
            setTimeout(() => {
              webApiPlayground.children[0].classList.add("remove-content");

              // REMOVE ELEMENT
              setTimeout(() => {
                webApiPlayground.children[0].remove();

                // INSERT INTO CALLBACK QUEUE PLAYGROUND
                insertElement(prevStack, editor, callbackQueuePlayground);

                // PUSHING STACK INTO WEB API
                isWebApi.push(prevStack);

                console.log(isWebApi);
              }, interval - 120);
            }, prevStack.value + interval - 100);
          }
        }, interval - 120);
      }

      // END INVOCATION
      else if (line.type === "endInvocation") {
        currentCallStack.classList.add("remove-content");

        setTimeout(() => {
          unhighlightText(isCallStack[index], editor);
          currentCallStack.remove();
        }, interval - 120);
      }
    }, interval * index);
  });
}

export default callStackParser;
