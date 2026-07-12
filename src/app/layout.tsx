import type { Metadata } from 'next';
import ClientLayout from './ClientLayout';
import '../tailwind.css';

export const metadata: Metadata = {
	title: 'Balut app',
	description: 'Balut game',
	icons: { icon: '/favicon.ico', apple: '/logo192.png' },
	manifest: '/manifest.json',
	other: {
		'data-api': 'https://plausible.oliverflecke.me/api/event',
		'data-domain': 'balut.app',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<script
					async
					defer
					data-api="https://plausible.oliverflecke.me/api/event"
					data-domain="balut.app"
					src="https://plausible.oliverflecke.me/js/script.js"
				/>
			</head>
			<body>
				<ClientLayout>{children}</ClientLayout>
			</body>
		</html>
	);
}
