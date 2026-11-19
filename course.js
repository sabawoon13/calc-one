// Each section includes a lesson, an original worked example, and practice.
// Wrap formulas in ~ markers. Use frac{top}{bottom}, pow{base}{power},
// sqrt{expression}, sub{base}{index}, lim{approach}, and int{lower}{upper}.
window.course = [
 {
  id: "1.2", title: "An intuitive introduction to limits", method: "Compare one-sided limits",
  idea: "Trace the graph toward the target x-value from each side. A two-sided limit exists when both sides approach the same value, even if the point itself is missing or filled in somewhere else.",
  rule: "~lim{x→a}f(x)=L~ when both one-sided limits equal L.",
  example: "A graph approaches 4 on both sides of x = 2 and has a filled dot at (2, 7). Its limit is 4. Its function value is 7.",
  practice: [
   ["A graph approaches 3 from the left of x = 1 and 5 from the right. What is the two-sided limit?", ["Does not exist", "3", "4", "5"], "Check whether the two sides agree.", "The left and right limits differ, so there is no two-sided limit."],
   ["At x = 4 a graph has a hole at y = −2 and both sides approach that hole. What is the limit?", ["−2", "4", "0", "Does not exist"], "Follow the curve toward the hole.", "The nearby values approach −2 on both sides."]
  ]
 },
 {
  id: "1.3", title: "Arithmetic rules for limits", method: "Factor and cancel",
  idea: "Try direct substitution first. For a quotient that yields zero over zero, look for a common factor or a conjugate. Algebraic simplification can preserve the nearby behavior even if the original expression has a hole.",
  rule: "The quotient law applies when the denominator approaches a nonzero number.",
  example: "~lim{x→4}frac{pow{x}{2}−16}{x−4}=lim{x→4}(x+4)=8~. Cancel the common factor for x different from 4.",
  practice: [
   ["Evaluate ~lim{x→3}frac{pow{x}{2}−9}{x−3}~.", ["6", "0", "3", "Does not exist"], "Factor the numerator as a difference of squares.", "Cancel x − 3 to get x + 3 near x = 3, then substitute."],
   ["Evaluate ~lim{x→0}frac{sqrt{1+x}−1}{x}~.", ["~frac{1}{2}~", "1", "0", "2"], "Multiply by the conjugate.", "Rationalizing gives ~frac{1}{sqrt{1+x}+1}~ for nonzero x, which approaches one-half."]
  ]
 },
 {
  id: "2.1", title: "Definition of the derivative", method: "Difference quotient",
  idea: "Compute a secant slope over a change h, simplify it, then let h approach zero. The resulting derivative gives the tangent slope and instantaneous rate of change.",
  rule: "~f′(x)=lim{h→0}frac{f(x+h)−f(x)}{h}~",
  example: "For ~f(x)=pow{x}{2}~ the difference quotient simplifies to ~2x+h~, so ~f′(x)=2x~.",
  practice: [
   ["For ~f(x)=pow{x}{2}+x~, what is the tangent slope at x = 2?", ["5", "4", "6", "3"], "Expand f(x + h) and cancel the terms from f(x).", "The simplified quotient is ~2x+h+1~. Its limit at h = 0 is 2x + 1, which is 5 at x = 2."],
   ["Which feature makes ~f(x)=|x|~ fail to be differentiable at 0?", ["Different left and right slopes", "A missing function value", "A vertical asymptote", "A horizontal tangent"], "Compare the slope to the left and right.", "The left slope is −1 and the right slope is 1. The slopes must agree for the derivative to exist."]
  ]
 },
 {
  id: "2.2", title: "Polynomial and trigonometric derivatives", method: "Differentiate term by term",
  idea: "Differentiate each term separately. Keep constant multipliers, drop standalone constants, and memorize the trig signs.",
  rule: "~frac{d}{dx}pow{x}{n}=n pow{x}{n−1}~ and ~frac{d}{dx}cos x=−sin x~.",
  example: "~frac{d}{dx}(3pow{x}{4}−2sin x+7)=12pow{x}{3}−2cos x~.",
  practice: [
   ["Differentiate ~5pow{x}{3}+4cos x−9~.", ["~15pow{x}{2}−4sin x~", "~15pow{x}{2}+4sin x~", "~5pow{x}{2}−4sin x~", "~15pow{x}{2}−4sin x−9~"], "Apply the power rule and watch the cosine derivative's sign.", "The cubic contributes ~15pow{x}{2}~, cosine contributes ~−4sin x~, and the constant contributes zero."],
   ["Find the second derivative of ~f(x)=3sin x~.", ["~−3sin x~", "~3cos x~", "~3sin x~", "~−3cos x~"], "Differentiate twice.", "The first derivative is ~3cos x~. The second derivative is ~−3sin x~."]
  ]
 },
 {
  id: "2.3", title: "Differentiation rules", method: "Chain rule",
  idea: "Identify the outermost operation first. Products, quotients, and compositions have their own derivative rules. A single expression may require several of them.",
  rule: "~[f(g(x))]′=f′(g(x))g′(x)~. Multiply by the derivative of the inside.",
  example: "~frac{d}{dx}pow{(4x−1)}{5}=20pow{(4x−1)}{4}~.",
  practice: [
   ["Differentiate ~sin(3pow{x}{2})~.", ["~6x cos(3pow{x}{2})~", "~cos(3pow{x}{2})~", "~−6x sin(3pow{x}{2})~", "~3 cos(3pow{x}{2})~"], "Treat sine as the outside function.", "The outside derivative gives cosine. The inside derivative contributes 6x."],
   ["Differentiate ~x cos x~.", ["~cos x−x sin x~", "~−sin x~", "~−x sin x~", "~cos x+x sin x~"], "Both factors depend on x.", "Differentiate x in the first product-rule term and cosine in the second."]
  ]
 },
 {
  id: "2.4", title: "Implicit differentiation", method: "Differentiate both sides implicitly",
  idea: "Treat y as a function of x. Differentiate both sides with respect to x, keep every y′ factor, then collect and solve for y′.",
  rule: "~frac{d}{dx}pow{y}{n}=n pow{y}{n−1}y′~",
  example: "~pow{x}{2}+pow{y}{2}=25~ gives ~2x+2yy′=0~ and ~y′=−frac{x}{y}~ where y is nonzero.",
  practice: [
   ["Find y′ if ~pow{x}{2}+pow{y}{3}=10~ at points where y is nonzero.", ["~−frac{2x}{3pow{y}{2}}~", "~frac{2x}{3pow{y}{2}}~", "~−frac{2x}{3y}~", "~−2x−3pow{y}{2}~"], "The derivative of y cubed contains y′.", "You get ~2x+3pow{y}{2}y′=0~. Isolate y′."],
   ["What is the derivative of xy when y depends on x?", ["~y+xy′~", "~xy′~", "~y~", "~x+y′~"], "Use the product rule.", "The derivative of x is 1 and the derivative of y is y′."]
  ]
 },
 {
  id: "3.1", title: "Related rates", method: "Differentiate an equation with respect to time",
  idea: "Write an equation linking the changing quantities. Differentiate with respect to time before inserting the values at the instant in question. Include units and preserve the sign of each rate.",
  rule: "For ~A=πpow{r}{2}~, ~frac{dA}{dt}=2πr frac{dr}{dt}~.",
  example: "A circular puddle has radius 3 m and grows outward at 2 m/s. Its area increases at 12π square meters per second.",
  practice: [
   ["A circle's radius is 5 cm and increases by 3 cm per second. How fast is its area increasing in square centimeters per second?", ["~30π~", "~15π~", "~25π~", "~10π~"], "Differentiate the circle's area formula with respect to time.", "Evaluate ~2πr frac{dr}{dt}~ at r = 5 and radius rate 3."],
   ["The side of a cube is 2 m and grows at 4 m/s. Find the volume rate in cubic meters per second.", ["48", "32", "24", "12"], "Differentiate the cube volume with respect to time.", "The rate is ~3pow{s}{2}frac{ds}{dt}=3(4)(4)=48~."]
  ]
 },
 {
  id: "3.3", title: "Mean Value Theorem", method: "Set the tangent slope equal to the secant slope",
  idea: "Check continuity on the closed interval and differentiability in its interior. Then set the derivative equal to the average slope and solve inside the interval. Rolle’s theorem covers the case with equal endpoint heights.",
  rule: "~f′(c)=frac{f(b)−f(a)}{b−a}~ for some ~c∈(a,b)~ under the theorem’s assumptions.",
  example: "For ~f(x)=pow{x}{2}~ on [0, 4], the average slope is 4. The equation ~2c=4~ gives c = 2.",
  practice: [
   ["For ~f(x)=pow{x}{2}~ on [1, 5], find the Mean Value Theorem point c.", ["3", "2", "4", "6"], "The average slope is 6.", "Solve ~2c=6~ to get c = 3."],
   ["Does Rolle’s theorem apply to ~f(x)=|x|~ on [−1, 1]?", ["No, there is a corner inside the interval.", "Yes, because the endpoints agree.", "No, because the endpoints disagree.", "No, because the function is discontinuous."], "Check all three hypotheses.", "The function is continuous and endpoint values match, but the derivative fails at 0."]
  ]
 },
 {
  id: "3.4", title: "Intervals of increase and decrease", method: "Build a first-derivative sign chart",
  idea: "Split the domain at critical numbers and breaks in the domain. Test the sign of the first derivative in each resulting interval.",
  rule: "~f′(x)>0~ gives increase. ~f′(x)<0~ gives decrease.",
  example: "For ~f(x)=pow{x}{2}−6x~, the derivative is ~2x−6~. The graph decreases before x = 3 and increases after it.",
  practice: [
   ["Where is ~f(x)=pow{x}{3}−12x~ decreasing?", ["(−2, 2)", "(2, ∞)", "(−∞, −2)", "(−∞, ∞)"], "Factor the first derivative.", "The derivative ~3(x−2)(x+2)~ is negative between its zeros."],
   ["Where is ~f(x)=pow{x}{2}+8x~ increasing?", ["(−4, ∞)", "(−∞, −4)", "(0, ∞)", "(4, ∞)"], "Find where ~2x+8>0~.", "Solving the inequality gives x > −4."]
  ]
 },
 {
  id: "3.5", title: "Extreme values", method: "Compare critical values and endpoints",
  idea: "For absolute extrema on a closed interval, evaluate the original function at both endpoints and all interior critical numbers. A first-derivative sign change classifies local turning points.",
  rule: "Positive to negative gives a local maximum. Negative to positive gives a local minimum.",
  example: "For ~f(x)=pow{x}{2}−2x~ on [0, 3], the candidate x-values are 0, 1, and 3. Their values are 0, −1, and 3. The minimum is −1 and the maximum is 3.",
  practice: [
   ["Find the absolute maximum value of ~f(x)=4x−pow{x}{2}~ on [0, 5].", ["4", "5", "2", "0"], "Check x = 2 and both endpoints.", "The function values at 0, 2, and 5 are 0, 4, and −5."],
   ["At a critical number, f′ changes from negative to positive. What happens there?", ["Local minimum", "Local maximum", "Vertical asymptote", "Always an inflection point"], "Picture a graph going down and then up.", "The function decreases into the point and increases away from it."]
  ]
 },
 {
  id: "3.6", title: "Concavity and points of inflection", method: "Check the second derivative on both sides",
  idea: "Use the second derivative to track whether slopes increase or decrease. A zero or undefined second derivative can suggest a candidate. Verify a change in concavity at the candidate.",
  rule: "~f″(x)>0~ means concave up. ~f″(x)<0~ means concave down.",
  example: "For ~f(x)=pow{x}{3}−6pow{x}{2}~, ~f″(x)=6x−12~ changes sign at x = 2. The inflection point is (2, −16).",
  practice: [
   ["Find the x-coordinate of the inflection point of ~f(x)=pow{x}{3}+9pow{x}{2}~.", ["−3", "3", "−6", "0"], "Compute f″ and look for a sign change.", "The second derivative ~6x+18~ changes sign at x = −3."],
   ["Does ~f(x)=pow{x}{4}~ have an inflection point at x = 0?", ["No, concavity stays up.", "Yes, because f″(0) is zero.", "Yes, because f′(0) is zero.", "No, because f is undefined at zero."], "Test f″ just to the left and right.", "The second derivative ~12pow{x}{2}~ is positive on both sides of zero."]
  ]
 },
 {
  id: "3.7", title: "Curve sketching", method: "Combine domain, limits, and derivative signs",
  idea: "Start with the domain and intercepts. Use limits to find asymptotes, f′ for increasing and decreasing behavior, and f″ for concavity. Keep holes and vertical asymptotes distinct.",
  rule: "If a one-sided limit at x = a is infinite, the vertical line x = a is an asymptote.",
  example: "~f(x)=frac{2x+1}{x−3}=2+frac{7}{x−3}~ has a vertical asymptote x = 3 and a horizontal asymptote y = 2.",
  practice: [
   ["What happens at x = 2 for ~f(x)=frac{pow{x}{2}−4}{x−2}~?", ["A hole at (2, 4)", "A vertical asymptote", "An x-intercept", "A hole at (2, 0)"], "Factor first and respect the original domain.", "The function simplifies to x + 2 away from x = 2. The original denominator excludes x = 2."],
   ["Find the horizontal asymptote of ~f(x)=frac{5pow{x}{2}+1}{2pow{x}{2}+3}~.", ["~y=frac{5}{2}~", "~y=frac{1}{3}~", "y = 0", "x = 0"], "Divide by the highest power of x.", "The lower-order terms vanish as x grows in magnitude, leaving the ratio of leading coefficients."]
  ]
 },
 {
  id: "4.2", title: "The exponential function", method: "Exponential derivative and chain rule",
  idea: "An exponential function has the variable in the exponent. Its derivative repeats the exponential and multiplies by the derivative of the exponent and the natural log of the base.",
  rule: "~frac{d}{dx}pow{a}{u}=pow{a}{u} ln(a)u′~",
  example: "~frac{d}{dx}pow{e}{2pow{x}{2}}=4x pow{e}{2pow{x}{2}}~.",
  practice: [
   ["Differentiate ~pow{3}{2x}~.", ["~2ln(3)pow{3}{2x}~", "~2pow{3}{2x}~", "~ln(3)pow{3}{2x}~", "~6x~"], "Both the base and the exponent contribute factors.", "The base contributes ln(3), and the exponent's derivative contributes 2."],
   ["Which function represents exponential decay as x increases?", ["~pow{(frac{1}{3})}{x}~", "~pow{3}{x}~", "~pow{x}{3}~", "~pow{e}{x}~"], "A positive base below 1 gives decay.", "Each unit step in x multiplies the value by one-third."]
  ]
 },
 {
  id: "4.3", title: "The natural logarithm", method: "Logarithmic differentiation",
  idea: "A logarithm undoes exponentiation. Check that log inputs are positive. For variable powers, taking the log of both sides brings the exponent down as a multiplier.",
  rule: "~frac{d}{dx}ln(u)=frac{u′}{u}~ for u positive.",
  example: "For ~y=pow{x}{x}~ with x positive, ~ln y=x ln x~. Differentiate both sides and multiply by y to get ~y′=pow{x}{x}(ln x+1)~.",
  practice: [
   ["Differentiate ~ln(5+pow{x}{2})~.", ["~frac{2x}{5+pow{x}{2}}~", "~frac{1}{5+pow{x}{2}}~", "~frac{5+pow{x}{2}}{2x}~", "~frac{2x}{5}~"], "Put the derivative of the inside on top.", "The inside is ~5+pow{x}{2}~ and its derivative is 2x."],
   ["What is the domain of ~ln(x−4)~?", ["(4, ∞)", "[4, ∞)", "(−∞, 4)", "(0, ∞)"], "Require a positive input.", "Solve x − 4 > 0. The log of zero is undefined."]
  ]
 },
 {
  id: "4.4", title: "Inverse trigonometric functions", method: "Inverse trig derivative and chain rule",
  idea: "An inverse trig function returns an angle on a restricted interval. When differentiating a composite, use the inverse trig derivative with the inner expression, then multiply by the inner derivative.",
  rule: "~frac{d}{dx}arctan(u)=frac{u′}{1+pow{u}{2}}~",
  example: "~frac{d}{dx}arcsin(2x)=frac{2}{sqrt{1−4pow{x}{2}}}~ for ~|x|<frac{1}{2}~.",
  practice: [
   ["Differentiate ~arctan(5x)~.", ["~frac{5}{1+25pow{x}{2}}~", "~frac{1}{1+25pow{x}{2}}~", "~frac{5}{1+5pow{x}{2}}~", "~frac{5}{sqrt{1−25pow{x}{2}}}~"], "Square the entire inner expression.", "The inner derivative is 5 and ~pow{(5x)}{2}=25pow{x}{2}~."],
   ["Find ~arccos(0)~.", ["~frac{π}{2}~", "0", "~π~", "~−frac{π}{2}~"], "Find the angle in [0, π] whose cosine is zero.", "Cosine is zero at π/2 in that interval."]
  ]
 },
 {
  id: "5.2", title: "L’Hôpital’s rule", method: "Check the form, then differentiate numerator and denominator",
  idea: "First identify the limit form. Under the rule’s hypotheses a zero-over-zero or infinity-over-infinity quotient can be replaced by the quotient of the derivatives. Rewrite products, differences, and powers before applying it.",
  rule: "~lim{x→a}frac{f(x)}{g(x)}=lim{x→a}frac{f′(x)}{g′(x)}~ when the rule applies and the derivative quotient has a limit, possibly infinite.",
  example: "~lim{x→0}frac{pow{e}{2x}−1}{x}=lim{x→0}frac{2pow{e}{2x}}{1}=2~.",
  practice: [
   ["Evaluate ~lim{x→0}frac{sin(4x)}{x}~.", ["4", "1", "0", "Does not exist"], "Substitution produces zero over zero.", "The derivative quotient is ~frac{4cos(4x)}{1}~, which approaches 4."],
   ["For which initial form may L’Hôpital’s rule apply directly?", ["~frac{0}{0}~", "~frac{4}{0}~", "~frac{0}{5}~", "~0·∞~"], "The original expression needs to be an indeterminate quotient.", "The rule starts with zero over zero or infinity over infinity. A product needs rewriting first."]
  ]
 },
 {
  id: "6.1", title: "The definite integral", method: "Set up a Riemann sum",
  idea: "Approximate signed area by multiplying each rectangle’s sampled height by its width. A definite integral is the limit of these sums. Regions below the axis contribute negatively.",
  rule: "~Δx=frac{b−a}{n}~. For right endpoints, ~sub{x}{i}=a+iΔx~.",
  example: "For ~f(x)=x~ on [0, 2] with 2 right-endpoint rectangles, the width is 1 and heights are 1 and 2. The sum is 3.",
  practice: [
   ["Use 2 right-endpoint rectangles for ~f(x)=pow{x}{2}~ on [0, 4]. What is the sum?", ["40", "8", "20", "32"], "The width is 2 and the right endpoints are 2 and 4.", "The sum is ~2(4+16)=40~."],
   ["The region above the axis has area 7 and the region below has area 10. What is the signed integral?", ["−3", "17", "3", "−17"], "Subtract the area below the axis.", "The signed total is 7 − 10 = −3. The geometric total area would be 17."]
  ]
 },
 {
  id: "6.2", title: "Fundamental Theorem of Calculus", method: "Differentiate the accumulation function",
  idea: "Part 1 differentiates an accumulation function by evaluating the integrand at its moving bound. Apply the chain rule to a composite bound. Part 2 computes a definite integral using an antiderivative.",
  rule: "~frac{d}{dx}int{a}{g(x)} f(t)dt=f(g(x))g′(x)~ and ~int{a}{b} f(x)dx=F(b)−F(a)~.",
  example: "~frac{d}{dx}int{0}{pow{x}{2}} (t+1)dt=(pow{x}{2}+1)2x~.",
  practice: [
   ["Differentiate ~int{1}{3x} pow{t}{2}dt~.", ["~27pow{x}{2}~", "~9pow{x}{2}~", "~3pow{x}{2}~", "~27pow{x}{3}~"], "Evaluate the integrand at 3x, then multiply by 3.", "The result is ~pow{(3x)}{2}·3=27pow{x}{2}~."],
   ["Evaluate ~int{1}{3} 2x dx~.", ["8", "9", "6", "4"], "An antiderivative is x squared.", "Subtract the lower evaluation from the upper evaluation to get 9 − 1."]
  ]
 },
 {
  id: "6.3", title: "Basic integration rules", method: "Integrate term by term",
  idea: "Reverse the derivative rules. Add a constant for indefinite integrals. Use the log rule for the reciprocal of x because adding one to its exponent would give zero in the power rule’s denominator.",
  rule: "~∫pow{x}{n}dx=frac{pow{x}{n+1}}{n+1}+C~ for n different from −1. ~∫frac{1}{x}dx=ln|x|+C~.",
  example: "~∫(6pow{x}{2}−4sin x)dx=2pow{x}{3}+4cos x+C~.",
  practice: [
   ["Find ~∫(4pow{x}{3}+frac{2}{x})dx~.", ["~pow{x}{4}+2ln|x|+C~", "~16pow{x}{4}+2ln|x|+C~", "~pow{x}{4}−frac{2}{pow{x}{2}}+C~", "~12pow{x}{2}+2ln|x|+C~"], "Treat the reciprocal term separately.", "The power rule gives x to the fourth, and the log rule gives twice the natural log of the absolute value."],
   ["If ~f′(x)=6x~ and f(1) = 8, find f(x).", ["~3pow{x}{2}+5~", "~3pow{x}{2}+8~", "~6pow{x}{2}+2~", "~3pow{x}{2}~"], "Integrate and use the given point to find C.", "The antiderivative is ~3pow{x}{2}+C~. Substituting x = 1 gives C = 5."]
  ]
 },
 {
  id: "6.4", title: "Integration by substitution", method: "Choose an inside function and look for its derivative",
  idea: "Use substitution to reverse the chain rule. Choose an inside expression, compute du, and rewrite the entire integral in u. For a definite integral, convert both bounds or return to x before evaluating.",
  rule: "~u=g(x)~ gives ~du=g′(x)dx~.",
  example: "~∫2x cos(pow{x}{2})dx=∫cos(u)du=sin(pow{x}{2})+C~ with ~u=pow{x}{2}~.",
  practice: [
   ["Evaluate ~∫6x pow{(3pow{x}{2}+2)}{4}dx~.", ["~frac{pow{(3pow{x}{2}+2)}{5}}{5}+C~", "~pow{(3pow{x}{2}+2)}{5}+C~", "~6x frac{pow{(3pow{x}{2}+2)}{5}}{5}+C~", "~frac{pow{(3pow{x}{2}+2)}{4}}{4}+C~"], "The derivative of the inside is already present.", "Set ~u=3pow{x}{2}+2~ and ~du=6x dx~. Integrate u to the fourth and substitute back."],
   ["Evaluate ~int{0}{1} 2x pow{e}{pow{x}{2}} dx~.", ["~e−1~", "~e~", "~2e~", "1"], "With u equal to x squared, what are the new bounds?", "The u-bounds are 0 and 1. The antiderivative of ~pow{e}{u}~ is itself, giving e − 1."]
  ]
 }
];
