export const Table = (
	props: React.DetailedHTMLProps<
		React.TableHTMLAttributes<HTMLTableElement>,
		HTMLTableElement
	>,
) => <table {...props} className="border-collapse w-full max-w-3xl"></table>;

export const Tr = (
	props: React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLTableRowElement>,
		HTMLTableRowElement
	>,
) => <tr {...props} />;

export const Th = (
	props: React.DetailedHTMLProps<
		React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
		HTMLTableHeaderCellElement
	>,
) => <th {...props} className={`text-left border p-1 ${props.className}`} />;

export const Td = (
	props: React.DetailedHTMLProps<
		React.TdHTMLAttributes<HTMLTableDataCellElement>,
		HTMLTableDataCellElement
	>,
) => (
	<td
		{...props}
		style={{ minWidth: '2.5rem' }}
		className={`border p-1 text-center ${props.className}`}
	/>
);
