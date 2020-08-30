const ncp = require('ncp').ncp;
const rimraf = require('rimraf');

const directory = '../balut-backend/wwwroot/';
rimraf.sync(directory);
ncp('build', directory, (err) => {
	if (err) {
		return console.error(err);
	}
	console.log('Finished');
});
