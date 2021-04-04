interface DefaultProps {
	children?: any;
	className?: string;
}

type ButtonVariant = 'primary' | 'disabled';

export const Button = (
	props: React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> & { variant?: ButtonVariant },
) => (
	<button
		{...props}
		className={`rounded p-2 pr-3 pl-3 m-1 text-xl ${buttonColor(
			props.variant,
		)} ${props.className}`}
	/>
);

function buttonColor(variant?: ButtonVariant) {
	switch (variant) {
		case 'disabled':
			return 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed';

		default:
			return 'bg-blue-400';
	}
}

export const Ul = (props: DefaultProps) => (
	<ul className={`inline p-0 m-0 list-none ${props.className}`}>
		{props.children}
	</ul>
);
export const Li = (props: DefaultProps) => (
	<li className={`flex justify-between ${props.className}`}>
		{props.children}
	</li>
);

export const H3 = (props: DefaultProps) => (
	<h3 className="p-0 m-0 mb-2 text-center">{props.children}</h3>
);

export const Form = (
	props: React.DetailedHTMLProps<
		React.FormHTMLAttributes<HTMLFormElement>,
		HTMLFormElement
	>,
) => <form {...props} className="w-full flex flex-col" />;

export const Input = (
	props: React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>,
) => <input {...props} className="border rounded p-2 my-2" />;

export const Line = () => <hr className="w-full" />;
