# React-pair-programming

This react app uses websockets and an iframe embedded editor to simulate
interpreted code in the browser.  
I'm looking to add a more consistent websockets experience, so if you can help
with that, it'd be much appreciated!

## Get Started

To begin participating, git clone this repo, with:
`git clone https://github.com/Takashiidobe/react-pair-programming`

then, use the package manager of your choice to install the dependencies in both
the root and client folders.

First move to the root directory at ./react-watch-together and install the
required dependencies:

with npm: `npm install`

with yarn: `yarn install`

then you can move to the client folder and install, or use the `client-install`
script provided in the root directory's package.json in order to install the
client's dependencies.

with npm: `npm client-install`

with yarn: `yarn client-install`

To work on the sass, you will need to run the script `sass` while inside of the
client folder. To do this, navigate to the client directory
(./react-watch-together/client) and then run the sass script:

with npm: `npm sass`

with yarn: `yarn sass`

And you're all set!

## To-do

#### Enhancements

- Creating rooms and room links with react-router-dom.

- A dynamically generated page that displays all of the rooms currently
  available, and hashing to create unique rooms

- Integration of chat and notifications for each respective room

- A typing notification so each user knows who else is typing

#### UI/UX Changes

- I'm all up for suggestions on UI changes! Go ahead and suggest them and make
  PRs to your own branches.

- I'd like to emulate the sort of codepen/jsfiddle style, keeping the html, css,
  js editors with the compiled code opposite of it, but let me know if you have
  any suggestions.

## Other Projects

help me out with my
[react-watch-together app](https://github.com/Takashiidobe/react-watch-together)
