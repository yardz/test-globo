import React, { useEffect, useRef, useState } from 'react';
import { Filme } from './filmes.domain';

interface Props {
	foco: boolean;
	filmes: Filme[];
	esquerda: () => void;
}

export const SlideFilme: React.FC<Props> = ({ foco, filmes, esquerda }) => {
	const [item, setItem] = useState(0);
	const nextItem = () => {
		if (item < filmes.length - 1) {
			setItem(item + 1);
		}
	};
	const prevItem = () => {
		if (item > 0) {
			setItem(item - 1);
		} else {
			esquerda();
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
				nextItem();
				break;
			case 'ArrowLeft':
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
				width: '100%',
				overflow: 'hidden',
				height: 230,
				position: 'relative',
			}}>
			{filmes.map((filme, index) => (
				<div
					key={filme.id}
					style={{
						width: '18%',
						padding: '0px 0.5%',
						position: 'absolute',
						float: 'left',
						overflow: 'hidden',
						height: 230,
						backgroundColor: foco && index === item ? '#000' : 'transparent',
						transitionDuration: '0.5s',
						top: 0,
						left: `${(index - item) * 19}%`,
					}}>
					<h2 style={{ fontSize: '15px', color: foco && index === item ? '#fff' : '#000' }}>{filme.title}</h2>
					<img src={filme.posterUrl} style={{ maxWidth: '100%' }} alt="" />
				</div>
			))}
		</div>
	);
};
