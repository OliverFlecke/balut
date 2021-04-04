import { Link } from 'react-router-dom';
import { Li, Ul } from '../styles/elements';

interface NavigationProps {
	shouldShowMultiplayer: boolean;
	showMultiplayer: () => void;
}

const linkClasses = 'text-lg mx-2 pointer no-underline text-blue-400';

export const Navigation = ({
	shouldShowMultiplayer,
	showMultiplayer,
}: NavigationProps) => (
	<nav>
		<Ul className="flex flex-row">
			<Li>
				<Link to="/" className={linkClasses}>
					Game
				</Link>
			</Li>
			<Li>
				<Link to="/rules" className={linkClasses}>
					Rules
				</Link>
			</Li>
			{shouldShowMultiplayer && (
				<Li>
					<a onClick={showMultiplayer} className={linkClasses}>
						Multiplayer
					</a>
				</Li>
			)}
		</Ul>
	</nav>
);
