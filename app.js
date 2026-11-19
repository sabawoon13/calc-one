const main = document.querySelector("#main");
const topics = window.course;
const get = (id) => document.getElementById(id);
const pageTitle = (title, subtitle) => '<header class="page-title"><h1>' + title + "</h1><p class='muted'>" + subtitle + "</p></header>";
const button = (id, label, type = "secondary") => '<button type="button" class="button ' + type + '" id="' + id + '">' + label + "</button>";
const sectionOptions = () => topics.map(({ id, title }) => '<option value="' + id + '">' + id + " · " + escapeHTML(title) + "</option>").join("");

function shuffle(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const groups = [
  "Limits", "Derivatives", "Applications of derivatives",
  "Exponential, log, and inverse trig", "Indeterminate limits", "Integration"
];

function showTopics() {
  main.innerHTML = pageTitle("Course topics", "Find a section by its number or title.");
  groups.forEach((name, index) => {
    const rows = topics.filter((topic) => topic.id.startsWith(String(index + 1)));
    main.insertAdjacentHTML("beforeend", '<section class="topic-group"><h2>' + name +
      '</h2><div class="topic-list">' + rows.map((topic) => '<a class="topic-link" href="#topic/' + topic.id +
      '"><span>' + topic.id + "</span>" + escapeHTML(topic.title) + "</a>").join("") + "</div></section>");
  });
}

function showLesson(id) {
  const topic = topics.find((item) => item.id === id);
  if (!topic) return showTopics();
  main.innerHTML = '<div class="narrow"><p><a href="#topics">All topics</a></p>' +
    pageTitle(escapeHTML(topic.title), "Section " + topic.id) +
    '<section class="panel"><h2>How it works</h2><p>' + richText(topic.idea) + "</p><h3>Key rule</h3><p>" +
    richText(topic.rule) + '</p></section><section class="panel"><h2>Worked example</h2><p>' +
    richText(topic.example) + '</p><div class="actions"><a class="button primary" href="#practice/' + id +
    '">Practice this section</a><a class="button secondary" href="#cards/' + id + '">Study these cards</a></div></section></div>';
}

const missedKey = "calc-one-missed-cards";
function readMissed() {
  try {
    const value = JSON.parse(localStorage.getItem(missedKey) || "[]");
    return new Set(Array.isArray(value) ? value : []);
  } catch {
    return new Set();
  }
}

const missed = readMissed();
function updateMissed() {
  try {
    localStorage.setItem(missedKey, JSON.stringify([...missed]));
  } catch {
    // In restricted browsers the review list remains available for this visit.
  }
}

// Match existing cards to the course sections by their stable positions in deck.js.
const cardRanges = [
  [1, 1, "2.1"], [2, 3, "1.3"], [4, 5, "1.2"], [6, 9, "2.2"],
  [10, 13, "2.3"], [14, 21, "2.2"], [22, 23, "4.2"], [24, 25, "4.3"],
  [26, 31, "4.4"], [32, 34, "2.4"], [35, 35, "4.3"], [36, 49, "3.1"],
  [50, 51, "3.3"], [52, 56, "3.5"], [57, 57, "3.4"], [58, 59, "3.6"],
  [64, 78, "6.1"], [79, 83, "6.2"], [84, 102, "6.3"]
];
const cards = window.originalDeck.map(([topic, question, answer], index) => ({
  id: "original-" + (index + 1), section: cardRanges.find(([first, last]) => index + 1 >= first && index + 1 <= last)?.[2],
  topic, question, answer
}));
topics.forEach((topic) => cards.push({
  id: "key-rule-" + topic.id, section: topic.id, topic: topic.title,
  question: "What is a key rule in " + escapeHTML(topic.title.toLowerCase()) + "?",
  answer: richText(topic.rule)
}));
cards.push({
  id: "substitution-bounds", section: "6.4", topic: "Integration by substitution",
  question: "If you change from x to u in a definite integral, what happens to the bounds?",
  answer: "Evaluate the substitution at both original x-bounds to get the new u-bounds."
});

function showCards(section) {
  main.innerHTML = '<div class="narrow">' + pageTitle("Flashcards", "Say or write the answer before you flip the card.") +
    '<div class="toolbar"><label>Section<select id="card-section"><option value="">All sections</option>' + sectionOptions() +
    '</select></label>' + button("shuffle-cards", "Shuffle") + button("review-cards", "Review missed") +
    '</div><p id="card-count" class="muted" aria-live="polite"></p><div id="card-area"><button type="button" id="flip-card" class="card-face"><small id="card-label"></small><span id="card-body" class="card-body"></span><small id="card-hint"></small></button>' +
    '<div class="actions card-tools">' + button("previous-card", "Previous") + button("next-card", "Next", "primary") +
    button("mark-card", "Mark missed") + '</div></div><p id="empty-cards" hidden>No missed cards here yet. Mark a card missed to review it later.</p></div>';

  const selector = get("card-section");
  selector.value = topics.some((topic) => topic.id === section) ? section : "";
  let active = [];
  let index = 0;
  let flipped = false;
  let reviewing = false;

  function paint() {
    const card = active[index];
    get("card-area").hidden = !card;
    get("empty-cards").hidden = Boolean(card);
    get("card-count").textContent = card ? (index + 1) + " of " + active.length : "0 cards";
    get("review-cards").textContent = reviewing ? "Show all cards" : "Review missed (" + missed.size + ")";
    get("shuffle-cards").disabled = active.length < 2;
    if (!card) return;
    get("card-label").textContent = flipped ? "Answer" : card.topic;
    get("card-body").innerHTML = flipped ? card.answer : card.question;
    get("flip-card").dataset.answer = String(flipped);
    get("card-hint").textContent = flipped ? "Show question" : "Reveal answer";
    get("mark-card").textContent = missed.has(card.id) ? "Remove from missed" : "Mark missed";
    get("mark-card").setAttribute("aria-pressed", String(missed.has(card.id)));
  }

  function filter() {
    active = cards.filter((card) => (!selector.value || card.section === selector.value) && (!reviewing || missed.has(card.id)));
    index = 0;
    flipped = false;
    paint();
  }

  function move(step) {
    index = (index + step + active.length) % active.length;
    flipped = false;
    paint();
  }

  selector.onchange = filter;
  get("review-cards").onclick = () => { reviewing = !reviewing; filter(); };
  get("shuffle-cards").onclick = () => { active = shuffle(active); index = 0; flipped = false; paint(); };
  get("flip-card").onclick = () => { flipped = !flipped; paint(); };
  get("next-card").onclick = () => move(1);
  get("previous-card").onclick = () => move(-1);
  get("mark-card").onclick = () => {
    const { id } = active[index];
    if (missed.has(id)) missed.delete(id);
    else missed.add(id);
    updateMissed();
    if (reviewing) {
      active = active.filter((card) => card.id !== id);
      index = Math.max(0, Math.min(index, active.length - 1));
      flipped = false;
      if (!active.length) get("review-cards").focus();
    }
    paint();
  };
  filter();
}

const problems = topics.flatMap((topic) => topic.practice.map(([prompt, answers, hint, explanation]) => ({
  topic, prompt, answers, hint, explanation
})));

// Method prompts are distinct from practice questions, with plausible alternative strategies.
const methodPrompts = [
  ["1.2", "A graph has a hole and a filled point at the same x-value. How can you decide whether the two-sided limit exists?", ["Factor and cancel", "Compare critical values and endpoints", "Set up a Riemann sum"]],
  ["1.3", "Substituting x = 3 gives zero over zero. Which algebra technique simplifies ~frac{pow{x}{2}−9}{x−3}~?", ["Use a conjugate", "Apply the quotient law directly", "Take logarithms"]],
  ["2.1", "The exercise asks you to find the derivative from its limit definition. What should you set up?", ["Chain rule", "A second-derivative sign chart", "A Riemann sum"]],
  ["2.3", "Your outer function is sine and its input is a polynomial. What rule links their derivatives?", ["Product rule", "Quotient rule", "Compare one-sided limits"]],
  ["2.4", "You need a tangent slope on ~pow{x}{2}+pow{y}{3}=5~ without first isolating y. What do you do?", ["Check the second derivative on both sides", "Differentiate an equation with respect to time", "Compare critical values and endpoints"]],
  ["3.1", "A balloon grows, and you know how fast its radius changes. How do you find the rate its volume changes?", ["Set up a Riemann sum", "Build a first-derivative sign chart", "Compare one-sided limits"]],
  ["3.3", "The problem asks for a point whose instantaneous slope equals the average slope over the interval. What equation should you set up?", ["Set the tangent slope equal to zero", "Set the function value equal to zero", "Set the second derivative equal to the average slope"]],
  ["3.5", "You need the absolute maximum and minimum of a continuous function on a closed interval. What should you compare?", ["Only the endpoint values", "Only the interior critical values", "Only the slopes at the endpoints"]],
  ["3.6", "You found a point with zero second derivative. How do you decide whether it is an inflection point?", ["Compare critical values and endpoints", "Check whether f′ is positive at the point", "Check whether f itself equals zero"]],
  ["4.3", "Both the base and exponent depend on x in ~pow{x}{2x}~. What technique brings down the exponent before you differentiate?", ["Use the constant-exponent power rule", "Use the constant-base exponential rule", "Set up a Riemann sum"]],
  ["5.2", "A quotient of differentiable functions yields zero over zero. Which approach uses L’Hôpital’s rule?", ["Apply the quotient rule to the original quotient", "Substitute zero into the numerator alone", "Differentiate only the denominator"]],
  ["6.1", "You are asked to approximate the area under a curve using four sampled rectangle heights. What method fits?", ["Find a tangent line", "Compare one-sided limits", "Check the second derivative on both sides"]],
  ["6.2", "The problem asks for the derivative of an integral whose upper bound is x squared. What method fits?", ["Set up a Riemann sum", "Find a horizontal asymptote", "Compare critical values and endpoints"]],
  ["6.3", "An indefinite integral contains a sum of a polynomial and sine. What is the simplest starting point?", ["Set the tangent slope equal to the secant slope", "Check the second derivative on both sides", "Apply the quotient rule"]],
  ["6.4", "The integrand contains ~cos(pow{x}{2})~ times ~2x~. What makes the integral simpler?", ["Build a first-derivative sign chart", "Compare one-sided limits", "Use the derivative product rule"]]
];
const methods = methodPrompts.map(([id, prompt, alternatives]) => {
  const topic = topics.find((section) => section.id === id);
  return { topic, prompt, answers: [topic.method, ...alternatives], explanation: topic.idea };
});

function showPractice(mode, section) {
  const titles = {
    practice: ["Practice problems", "Try each problem on paper before you check your answer."],
    method: ["Pick the method", "Identify the technique before you do the algebra."],
    exam: ["Exam review", "Try ten mixed questions and see which sections to revisit."]
  };
  const [title, description] = titles[mode];
  main.innerHTML = '<div class="narrow">' + pageTitle(title, description) +
    (mode === "practice" ? '<div class="toolbar"><label>Section<select id="practice-section"><option value="">All sections</option>' +
      sectionOptions() + '</select></label></div>' : "") + '<section class="panel" id="exercise"></section></div>';

  const selector = get("practice-section");
  if (selector) selector.value = topics.some((topic) => topic.id === section) ? section : "";
  const exercise = get("exercise");
  let current = [];
  let index = 0;
  let results = [];

  function finish() {
    const correct = results.filter((result) => result.correct).length;
    const errors = results.filter((result) => !result.correct);
    exercise.innerHTML = '<h2>You got ' + correct + " of " + current.length + " correct</h2>" +
      (errors.length ? "<h3>Review these questions</h3>" + errors.map(({ item, picked }) =>
        '<details><summary>Section ' + item.topic.id + " · " + escapeHTML(item.topic.title) + "</summary><p>" +
        richText(item.prompt) + "</p><p>Your answer was " + richText(picked) + ".</p><p>" +
        richText(item.explanation) + '</p><p><a href="#topic/' + item.topic.id + '">Open topic guide</a></p></details>').join("")
        : "<p>You answered every question correctly.</p>") +
      button("restart", mode === "exam" ? "Start another review" : "Start again", "primary");
    get("restart").onclick = start;
    exercise.querySelector("h2").setAttribute("tabindex", "-1");
    exercise.querySelector("h2").focus();
  }

  function paint(focus = false) {
    const item = current[index];
    const order = shuffle(item.answers);
    exercise.innerHTML = '<p class="eyebrow">Question ' + (index + 1) + " of " + current.length +
      (mode === "practice" ? " · Section " + item.topic.id : "") +
      '</p><h2 tabindex="-1">' + richText(item.prompt) + '</h2><div class="choice-list">' +
      order.map((answer, i) => '<button class="choice" type="button" data-choice="' + i + '">' +
        richText(answer) + "</button>").join("") + "</div>" +
      (mode === "practice" ? "<details><summary>Show hint</summary><p>" + richText(item.hint) + "</p></details>" : "") +
      '<div id="answer-feedback" aria-live="polite"></div><div id="advance" hidden>' +
      button("next-question", index + 1 === current.length ? "See results" : "Next question", "primary") + "</div>";
    const choices = [...exercise.querySelectorAll(".choice")];
    choices.forEach((choice, i) => {
      choice.onclick = () => {
        const picked = order[i];
        const correct = picked === item.answers[0];
        results.push({ item, picked, correct });
        choices.forEach((candidate, j) => {
          candidate.disabled = true;
          if (order[j] === item.answers[0] && (mode !== "exam" || j === i)) candidate.dataset.result = "correct";
          else if (j === i && mode !== "exam") candidate.dataset.result = "wrong";
        });
        get("answer-feedback").innerHTML = mode === "exam" ? "<p>Answer recorded.</p>" :
          "<p><strong>" + (correct ? "Correct." : "The correct answer is " + richText(item.answers[0]) + ".") +
          "</strong> " + richText(item.explanation) + "</p>";
        get("advance").hidden = false;
        get("next-question").focus();
      };
    });
    get("next-question").onclick = () => {
      index++;
      if (index === current.length) finish();
      else paint(true);
    };
    if (focus) exercise.querySelector("h2").focus();
  }

  function start() {
    if (mode === "method") current = shuffle(methods).slice(0, 10);
    else if (mode === "exam") current = shuffle(topics).slice(0, 10).map((topic) =>
      shuffle(problems.filter((problem) => problem.topic.id === topic.id))[0]);
    else current = shuffle(problems.filter((problem) => !selector.value || problem.topic.id === selector.value));
    index = 0;
    results = [];
    paint();
  }

  if (selector) selector.onchange = start;
  start();
}

function showGraphs() {
  main.innerHTML = '<div class="narrow">' + pageTitle("Interactive graphs", "Move the slider and watch what changes.") +
    '<section class="panel"><label class="field">Choose a graph<select id="graph-mode">' +
    '<option value="riemann">Riemann rectangles</option><option value="tangent">Tangent slopes</option>' +
    '<option value="concavity">Concavity</option></select></label><p id="graph-equation"></p>' +
    '<div class="graph-frame"><canvas id="lab-graph" width="700" height="340" role="img"></canvas></div>' +
    '<label class="field" for="graph-parameter"><span id="graph-label"></span>' +
    '<input type="range" id="graph-parameter"></label><label class="field" id="sample-control">Sample point' +
    '<select id="graph-sample"><option value="left">Left endpoint</option><option value="middle">Midpoint</option><option value="right" selected>Right endpoint</option></select></label>' +
    '<p id="graph-readout" aria-live="polite"></p><p id="graph-note" class="muted"></p></section></div>';
  const mode = get("graph-mode");
  const slider = get("graph-parameter");
  const canvas = get("lab-graph");
  const sample = get("graph-sample");

  function update() {
    const value = Number(slider.value);
    const approximation = drawGraph(canvas, mode.value, value, sample.value);
    let summary;
    if (mode.value === "riemann") {
      summary = value + " rectangles · Approximate area " + approximation.toFixed(3);
      get("graph-equation").innerHTML = richText("~f(x)=frac{pow{x}{2}}{4}, 0≤x≤4~");
      get("graph-note").innerHTML = richText("The exact area is ~frac{16}{3}~. Compare all three sampling methods as the rectangles get narrower.");
    } else if (mode.value === "tangent") {
      summary = "x = " + value.toFixed(2) + " · Tangent slope " + value.toFixed(2);
      get("graph-equation").innerHTML = richText("~f(x)=frac{pow{x}{2}}{2}, f′(x)=x~");
      get("graph-note").textContent = "At zero the tangent is horizontal. On each side, the sign of the slope matches the direction of the curve.";
    } else {
      const concavity = value > 0 ? "concave up" : value < 0 ? "concave down" : "inflection point";
      summary = "x = " + value.toFixed(2) + " · " + concavity;
      get("graph-equation").innerHTML = richText("~f(x)=frac{pow{x}{3}}{4}−x, f″(x)=frac{3x}{2}~");
      get("graph-note").textContent = "The second derivative changes sign at zero, where the curve switches from concave down to concave up.";
    }
    get("graph-readout").textContent = summary;
    canvas.setAttribute("aria-label", summary);
  }

  function reset() {
    const riemann = mode.value === "riemann";
    slider.min = riemann ? 1 : -2.75;
    slider.max = riemann ? 32 : 2.75;
    slider.step = riemann ? 1 : .25;
    slider.value = riemann ? 6 : 0;
    get("graph-label").textContent = riemann ? "Number of rectangles" : "x-coordinate";
    get("sample-control").hidden = !riemann;
    update();
  }

  mode.onchange = reset;
  slider.oninput = update;
  sample.onchange = update;
  reset();
}


function route(focus = false) {
  const [requested, section] = location.hash.slice(1).split("/");
  const page = requested || "home";
  if (page === "main") return;
  document.querySelectorAll("nav a").forEach((link) => {
    const current = link.hash === "#" + page || (page === "topic" && link.hash === "#topics");
    if (current) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  switch (page) {
    case "topics": showTopics(); break;
    case "topic": showLesson(section); break;
    case "cards": showCards(section); break;
    case "practice": case "method": case "exam": showPractice(page, section); break;
    case "graphs": showGraphs(); break;
    default:
      main.replaceChildren(get("home").content.cloneNode(true));
      drawGraph(get("hero-graph"), "riemann", 8);
  }
  if (focus) {
    main.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
}

window.addEventListener("hashchange", () => route(true));
route();
