import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';

function handleRender() {
	const html = ReactDOMServer.renderToString(React.createElement(App));

	// Load contents of index.html
	fs.readFile('../public/index.html', 'utf8', function (err, data) {
		if (err) throw err;

		// Inserts the rendered React HTML into our main div
		const document = data.replace(
			/<div id="app"><\/div>/,
			`<div id="app">${html}</div>`,
		);

		fs.writeFile('./index.html', document);
	});
}

handleRender();
