import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Filme } from './filmes.domain';

import { SlideFilme } from './SlideFilme';

import filmes from './filmes.json';

interface Props {
	esquerda: () => void;
	foco: boolean;
	expandido: boolean;
	busca: string;
}

export const Lista: React.FC<Props> = ({ esquerda, foco, expandido, busca }) => {
	const [item, setItem] = useState(1);
	// tslint:disable-next-line: no-any
	const eventBind = useRef<(event: any) => void>();

	const titulos: Filme[] = useMemo(() => (busca ? filmes.filter(filme => filme.title.match(new RegExp(busca, 'i'))) : []), [busca]);
	const diretores: Filme[] = useMemo(() => (busca ? filmes.filter(filme => filme.director.match(new RegExp(busca, 'i'))) : []), [busca]);

	const nextItem = () => {
		if (item > 1) {
			setItem(item - 1);
		}
	};
	const prevItem = () => {
		if (item < 2) {
			setItem(item + 1);
		}
	};

	// tslint:disable-next-line: no-any
	const handleKey = (key: string) => {
		if (!foco) {
			return;
		}
		switch (key) {
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
				width: expandido ? '35%' : '15%',
				float: 'left',
				padding: '10px',
				border: '1px solid transparent',
				borderColor: foco ? '#000' : '#000',
			}}>
			<h1>Titulos</h1>
			<SlideFilme filmes={titulos} esquerda={esquerda} foco={foco && item === 1} />
			<h1>Diretores</h1>
			<SlideFilme filmes={diretores} esquerda={esquerda} foco={foco && item === 2} />
		</div>
	);
};
