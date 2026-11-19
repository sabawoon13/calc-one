// A small MathML renderer for the formulas in course.js.
// Ordinary text stays escaped. Only the commands in this table produce tags.
const mathCommands = {
  frac: ["mfrac", 2], pow: ["msup", 2], sub: ["msub", 2], sqrt: ["msqrt", 1],
  lim: ["munder", 1, "<mo>lim</mo>"], int: ["msubsup", 2, "<mo>∫</mo>"],
  sum: ["munderover", 2, "<mo>∑</mo>"]
};
const mathFunctions = new Set(["sin", "cos", "tan", "sec", "csc", "cot", "ln", "log", "arcsin", "arccos", "arctan"]);
const escapeHTML = (value) => value.replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

function mathMarkup(formula) {
  const tokens = formula.match(/[a-zA-Z]+|\d+(?:\.\d+)?|./gu) || [];
  let cursor = 0;

  function readGroup(nested = false) {
    let markup = "";
    while (cursor < tokens.length) {
      const token = tokens[cursor++];
      if (token === "}" && nested) return markup;
      if (Object.hasOwn(mathCommands, token) && tokens[cursor] === "{") {
        const [tag, argumentCount, operator = ""] = mathCommands[token];
        let argumentsMarkup = operator;
        for (let i = 0; i < argumentCount; i++) {
          if (tokens[cursor++] !== "{") throw new Error("Use braces around each math argument.");
          argumentsMarkup += "<mrow>" + readGroup(true) + "</mrow>";
        }
        markup += "<" + tag + ">" + argumentsMarkup + "</" + tag + ">";
      } else if (mathFunctions.has(token)) {
        markup += '<mi mathvariant="normal">' + token + "</mi>";
      } else if (/^[a-zA-Z]+$/.test(token)) {
        markup += [...token].map((letter) => "<mi>" + letter + "</mi>").join("");
      } else if (/^\d/.test(token)) {
        markup += "<mn>" + token + "</mn>";
      } else if (/\p{L}/u.test(token)) {
        markup += "<mi>" + token + "</mi>";
      } else if (token.trim()) {
        markup += "<mo>" + escapeHTML(token) + "</mo>";
      }
    }
    if (nested) throw new Error("A math argument is missing its closing brace.");
    return markup;
  }
  return '<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow>' + readGroup() + "</mrow></math>";
}

function richText(text) {
  return text.split("~").map((part, index) => index % 2 ? mathMarkup(part) : escapeHTML(part)).join("");
}
