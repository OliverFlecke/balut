interface DefaultProps {
	children?: any;
	className?: string;
}

export const Button = (
	props: React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> & { variant?: 'primary' | 'disabled' },
) => (
	<button
		className={`bg-blue-500 rounded p-2 pr-3 pl-3 m-1 text-xl ${props.className}`}
	>
		{props.children}
	</button>
);

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
