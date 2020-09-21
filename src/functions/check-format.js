function checkFormat(JSHINT, success) {
  let output = "";

  if (!success) {
    output = "Check format error:\n\n";

    for (let i in JSHINT.errors) {
      let err = JSHINT.errors[i];

      if (null != err) {
        output += err.line + "[" + err.character + "]: " + err.reason + "\n";
      } else {
        output += "Check format unknown error:\n";
      }
    }

    alert(output);

    success = false;
    return;
  }

  success = true;
}

export default checkFormat;
