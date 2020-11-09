import React, { useEffect, useRef, useState } from 'react';
import { Item } from './Item';
import { FaHome, FaSearch, FaUserCircle, FaRegCircle } from 'react-icons/fa';

interface Props {
	direita: () => void;
	foco: boolean;
}

export const Menu: React.FC<Props> = ({ direita, foco }) => {
	const [item, setItem] = useState(1);

	const nextItem = () => {
		if (item > 1) {
			setItem(item - 1);
		}
	};
	const prevItem = () => {
		if (item < 4) {
			setItem(item + 1);
		}
	};

	// tslint:disable-next-line: no-any
	const eventBind = useRef<(event: any) => void>();
	const handleKey = (key: string) => {
		if (!foco) {
			return;
		}
		switch (key) {
			case 'ArrowRight':
				direita();
				break;
			case 'ArrowUp':
				nextItem();
				break;
			case 'ArrowDown':
				prevItem();
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		if (!!eventBind.current) {
			document.removeEventListener('keydown', eventBind.current);
		}
		eventBind.current = event => {
			const keyName = event.key;
			handleKey(keyName);
		};
		document.addEventListener('keydown', eventBind.current);
	});

	return (
		<div
			style={{
				width: foco ? '30%' : '10%',
				float: 'left',
				border: '1px solid transparent',
				borderColor: foco ? '#000' : 'transparent',
				marginRight: '5%',
				overflow: 'hidden',
			}}>
			<Item foco={item === 1 && foco} icone={<FaSearch />} text={foco ? 'Buscar' : ''} />
			<Item foco={item === 2 && foco} icone={<FaHome />} text={foco ? 'Home' : ''} />
			<Item foco={item === 3 && foco} icone={<FaRegCircle />} text={foco ? 'Icone' : ''} />
			<Item foco={item === 4 && foco} icone={<FaUserCircle />} text={foco ? 'Perfil' : ''} />
		</div>
	);
};
