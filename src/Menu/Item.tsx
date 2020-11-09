import React from 'react';

interface Props {
	foco: boolean;
	icone: JSX.Element;
	text: string;
}

export const Item: React.FC<Props> = ({ foco, icone, text }) => {
	return (
		<div
			style={{
				float: 'left',
				padding: '10px',
				fontSize: 30,
				color: foco ? '#000' : '#fff',
				background: foco ? 'transparent' : '#000',
				overflow: 'hidden',
				width: '100%',
				transitionDuration: '0.5s',
			}}>
			<div
				style={{
					float: 'left',
					border: '1px solid #000',
					margin: '5px',
					width: '30px',
					padding: '10px 10px 0px 10px',
					fontSize: 30,
					color: foco ? '#fff' : '#000',
					background: foco ? '#000' : '#fff',
					transitionDuration: '0.5s',
				}}>
				{icone}
			</div>
			<div style={{ paddingTop: '10px' }}>{text}</div>
		</div>
	);
};
