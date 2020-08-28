import * as signalR from '@microsoft/signalr';

export function initConnection(url: string): Promise<signalR.HubConnection> {
	const connection = new signalR.HubConnectionBuilder().withUrl(url).build();

	// connection.on('connected', () => {
	// 	console.log('connected');
	// });

	return new Promise((resolve, reject) => {
		connection
			.start()
			.then(() => {
				resolve(connection);
			})
			.catch((err) => {
				console.error('Unable to connect to server');
				reject(err);
			});
	});
}
