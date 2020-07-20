import * as signalR from '@microsoft/signalr';

export function initConnection() {
	const connection = new signalR.HubConnectionBuilder()
		.withUrl('https://localhost:5001/play')
		.build();

	try {
		connection.start();
	} catch (error) {
		console.error('Unable to connect to server');
		console.error(error);
	}

	return connection;
}
