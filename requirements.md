# Requirements — Tip Calculator

## What to build
A single-page web app that calculates a restaurant tip and total.

## Features
- Input field for the bill amount (numeric, accepts decimals)
- Buttons for tip percentage: 10%, 15%, 18%, 20%, custom
- Input field for number of people splitting the bill
- Display: tip amount, total amount, per-person amount
- Recalculates live as inputs change
- "Reset" button that clears all inputs

## Tech
- Plain HTML, CSS, JavaScript — no framework
- Single file: `index.html`
- No build step — must work by opening the file in Chrome

## File structure
- `index.html` — the app
- `app.test.js` — unit tests using Jest for the calculation functions
- `package.json` — Jest config

## Acceptance criteria
- Entering bill 100 and selecting 18% shows tip of 18.00
- Changing number of people updates per-person amount correctly
- Custom tip input accepts a number and uses it
- Reset clears all fields and resets display to 0.00
- No console errors on load or interaction
- Layout usable at 375px width

## Out of scope
- No backend, no localStorage, no auth, no theming
