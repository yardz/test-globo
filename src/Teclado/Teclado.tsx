import React, { useEffect, useRef, useState } from 'react';

import { Tecla } from './Tecla';

interface Props {
	direita: () => void;
	esquerda: () => void;
	foco: boolean;
	busca: string;
	setBusca: (q: string) => void;
}

const mapKeys = [
	['A', 'B', 'C', 'D', 'E', 'F'],
	['G', 'H', 'I', 'J', 'K', 'L'],
	['M', 'N', 'O', 'P', 'Q', 'R'],
	['S', 'T', 'U', 'V', 'W', 'X'],
	['Y', 'Z', '0', '1', '2', '3'],
	['4', '5', '6', '7', '8', '9'],
	[' ', ' ', ' ', 'bkspc', 'bkspc', 'bkspc'],
];

const getKey = (l: number, c: number) => {
	return mapKeys[l - 1][c - 1];
};

export const Teclado: React.FC<Props> = ({ foco, busca, direita, esquerda, setBusca }) => {
	const [[col, lin], setItem] = useState<[number, number]>([1, 1]);
	const click = () => {
		const key = getKey(col, lin);
		if (key === 'bkspc') {
			setBusca(busca.slice(0, -1));
			return;
		}
		setBusca(busca + key);
	};
	const moverCima = () => {
		if (col > 1) {
			setItem([col - 1, lin]);
		}
	};

	const moverBaixo = () => {
		if (col < 7) {
			setItem([col + 1, lin]);
		}
	};

	const moverDireita = () => {
		if (col === 7) {
			if (lin <= 3) {
				setItem([7, 4]);
				return;
			}
			if (lin >= 4) {
				direita();
				return;
			}
		}
		if (lin < 6) {
			setItem([col, lin + 1]);
			return;
		}
		direita();
	};

	const moverEsquerda = () => {
		if (col === 7) {
			if (lin <= 3) {
				esquerda();
				return;
			}
			if (lin >= 4) {
				setItem([7, 3]);
				return;
			}
		}
		if (lin > 1) {
			setItem([col, lin - 1]);
			return;
		}
		esquerda();
	};

	// tslint:disable-next-line: no-any
	const eventBind = useRef<(event: any) => void>();
	const handleKey = (key: string) => {
		if (!foco) {
			return;
		}
		switch (key) {
			case 'ArrowRight':
				moverDireita();
				break;
			case 'ArrowUp':
				moverCima();
				break;
			case 'ArrowDown':
				moverBaixo();
				break;
			case 'ArrowLeft':
				moverEsquerda();
				break;
			case 'Enter':
				click();
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
				width: '40%',
				float: 'left',
				padding: '10px',
				border: '1px solid transparent',
				borderColor: foco ? '#000' : 'transparent',
				marginRight: '5%',
				transitionDuration: '0.5s',
			}}>
			<div
				style={{
					fontSize: '20px',
					color: '#000',
					textTransform: 'uppercase',
					padding: '5px',
					border: '1px solid #000',
					marginBottom: '10px',
				}}>
				{busca}&nbsp;
			</div>
			<div className="Teclado" style={{ width: '100%', position: 'relative', border: '1px solid #000', overflow: 'hidden' }}>
				{[1, 2, 3, 4, 5, 6].map(c =>
					[1, 2, 3, 4, 5, 6].map(l => <Tecla key={`${l}`} foco={foco && col === c && lin === l} icone={getKey(c, l)} />),
				)}

				<Tecla foco={foco && col === 7 && lin <= 3} grande icone={'Espaço'} />
				<Tecla foco={foco && col === 7 && lin >= 4} grande icone={'Apagar'} />
			</div>
		</div>
	);
};
