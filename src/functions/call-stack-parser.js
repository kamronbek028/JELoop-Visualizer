import insertElement from "./insert-element";

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
      const current = callStackPlayground.children[0];

      if (line.type === "console.log" || line.type === "functionInvocation") {
        insertElement(line, editor, callStackPlayground);
      } else if (line.type === "setTimeout") {
        insertElement(line, editor, callStackPlayground);
      } else if (line.type === "remove" || line.type === "endInvocation") {
        current.classList.add("remove-content");

        setTimeout(() => {
          current.remove();
        }, interval - 120);
      }
    }, interval * index);
  });
}

export default callStackParser;
