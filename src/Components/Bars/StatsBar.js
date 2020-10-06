import React, { useState, useEffect } from 'react';

export default function StatsBar({ transactions }) {
	const [despesa, setDespesa] = useState(0);
	const [receita, setReceita] = useState(0);

	useEffect(() => {
		countDespesas(transactions);
		countReceitas(transactions);
	}, [transactions]);

	const countDespesas = response => {
		console.log(response);
		const despesa = response.reduce((acc, { value, type }) => {
			if (type === '-') {
				return acc + value;
			}
			return acc;
		}, 0);
		setDespesa(despesa);
	};
	const countReceitas = response => {
		const receita = response.reduce((acc, { value, type }) => {
			if (type === '+') {
				return acc + value;
			}
			return acc;
		}, 0);
		setReceita(receita);
	};

	return (
		<div className="stats-bar">
			<span>Lançamentos: {transactions.length}</span>
			<span>
				Receitas:{' '}
				{receita.toLocaleString('pt-br', {
					style: 'currency',
					currency: 'BRL',
					minimumFractionDigits: 2,
				})}
			</span>
			<span>
				Despesas:{' '}
				{despesa.toLocaleString('pt-br', {
					style: 'currency',
					currency: 'BRL',
					minimumFractionDigits: 2,
				})}
			</span>
			<span>
				Saldo:{' '}
				{(receita - despesa).toLocaleString('pt-br', {
					style: 'currency',
					currency: 'BRL',
					minimumFractionDigits: 2,
				})}
			</span>
		</div>
	);
}
