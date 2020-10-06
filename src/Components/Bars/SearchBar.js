import React from 'react';

export default function SearchBar({
	clickNovoLancamento,
	searchCritery,
	visibleBar,
}) {
	const searchTransaction = event => {
		searchCritery(event.target.value);
	};

	return (
		<div className="search-bar">
			<button
				className="waves-effect waves-light btn"
				onClick={clickNovoLancamento}
				visible
			>
				+ Novo lançamento
			</button>
			<div className="input-field search">
				<input
					type="text"
					placeholder="Filtro"
					onKeyUp={searchTransaction}
				/>
			</div>
		</div>
	);
}
