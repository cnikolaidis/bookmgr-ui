# Book Manager - UI

This is the front-end solution for the 'Book Manager' application. It is a React JS web application allowing book / author entity management.

## Creation of application

Use [npm](https://nodejs.org/en/download) package manager create & configure React JS application.

```bash
// Create our 'bookmgr-ui' application
npx create-react-app bookmgr-ui

// Install React Router package
npm install react-router-dom

// Install rest of application packages
npm i
```

## Running the application

Inside 'package.json' file, we have a scripting section that looks like the below

```json
"scripts": {
	"start": "react-scripts start",
	"build": "react-scripts build",
	"test": "react-scripts test",
	"eject": "react-scripts eject"
}
```

We can run any script by using the script's name like below

```bash
// Start React JS application (usually localhost:3000)
npm run start

// Build application (final deployment files)
npm run build
```
