function checkFormat(JSHINT, value) {
  let success = JSHINT(value);
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
    return success;
  }

  return success;
}

export default checkFormat;
