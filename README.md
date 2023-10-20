# L-system generator and visualiser web app

A web application for generating and visualising L-systems, made using React.

## Table of contents

- [About L-systems](#about-l-systems)
  - [Example of an L-system](#example-of-an-l-system)
- [App description](#about-l-systems)
- [Usage](#usage)
  - [Instructions](#instructions)
  - [GitHub Pages deployment](#github-pages-deployment)
  - [Run locally](#run-locally)
- [Dependencies](#dependencies)

## About L-systems

[Lindenmayer systems](https://en.wikipedia.org/wiki/L-system), also known as L-systems, are a type of formal grammar consisting of: an alphabet that is used to make strings, production rules expanding symbols from strings into larger strings, an initial string called an "axiom" and a mechanism for translating the generated strings into geometric structures. 
The name of these systems comes from the name of a Hungarian theoretical biologist and botanist [Aristid Lindenmayer](https://en.wikipedia.org/wiki/Aristid_Lindenmayer), who developed them in 1968. 

The rules of the L-system grammar are applied iteratively starting from the initial state. They are applied simultaneously, per iteration. The recursive nature of this process leads to self-similarity and thus allows for easy definition of many fractal-like forms.
The individual symbols in a resultative string are interpreted as directives for graphical representation. In this app, a single character is an action to take while drawing the form on a `<canvas>` element.

### Example of an L-system

Symbol meaning (specific for this example):
- `F`: move forward and draw
- `-`: rotate left by angle
- `+`: rotate right by angle

Initial string (axiom): `F-F-F-F`

Rewrite rule: `F -> F-F+F+FF-F-F+F`

Angle: `90°`

Result:

<p align="center">
  <img src="https://github.com/michalkr52/l-system-visualiser/assets/46329932/14e38675-f785-4391-9f31-d0b04ff028f1" alt="animated" />
</p>


## App description

The visualiser allows for definition of an axiom and multiple rules. You can control how each character is processed for drawing, by choosing which action is triggered by which token. 

Planned features:

- a list of recipes - sets of rules and axioms you can import with one click,
- canvas zooming (fullscreen?),
- recipe sharing,
- canvas image exporting,
- ...and many more!    <sup><sup>hopefully</sup></sup>

## Usage

### Instructions

Start by inputting the axiom and then enter the processing rules. The predecessor (the character being expanded to its successor) in every rule must consist of a single character. Finally adjust any additional parameters if using any of the tokens needing them (rotation, length multiplication/addition, etc.) and confirm the rules. You can cycle through different iterations using the arrow keys on your keyboard or the controls on the bottom-right side of the screen.

### GitHub Pages deployment

The app is deployed on GitHub Pages and can be used there. You can try it out [here](https://michalkr52.github.io/l-system-visualiser/)! Keep in mind, that I'm deploying the website manually, and it could be a couple of commits behind. That won't be the case most of the time, as I try to deploy it after making a few meaningful commits or taking a break from developing it.

### Run locally

Alternatively, you could clone the repository and run `npm install` and `npm run start` to run the application.

## Dependencies

```json
 "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-modal": "^3.16.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
```
