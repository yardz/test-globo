import React from 'react';

interface Props {
	foco: boolean;
	icone: JSX.Element | string;
	grande?: boolean;
}

export const Tecla: React.FC<Props> = ({ foco, icone, grande }) => {
	return (
		<div
			style={{
				float: 'left',
				margin: '5px 1%',
				width: grande ? '46%' : '14%',
				textAlign: 'center',
				padding: '10px 0px',
				fontSize: 30,
				color: foco ? '#000' : '#fff',
				background: foco ? 'transparent' : '#000',
			}}>
			{icone}
		</div>
	);
};
