import React, { useState } from 'react';

import { Teclado } from './Teclado/Teclado';
import { Menu } from './Menu/Menu';
import { Lista } from './Lista/Lista';

function App() {
	const [busca, setBusca] = useState('');
	const [foco, setFoco] = useState('menu');

	return (
		<div>
			<Menu
				foco={foco === 'menu'}
				direita={() => {
					setFoco('teclado');
				}}
			/>
			<Teclado
				busca={busca}
				foco={foco === 'teclado'}
				setBusca={setBusca}
				esquerda={() => {
					setFoco('menu');
				}}
				direita={() => {
					setFoco('lista');
				}}
			/>
			<Lista
				busca={busca}
				expandido={foco !== 'menu'}
				esquerda={() => {
					setFoco('teclado');
				}}
				foco={foco === 'lista'}
			/>
		</div>
	);
}

export default App;
