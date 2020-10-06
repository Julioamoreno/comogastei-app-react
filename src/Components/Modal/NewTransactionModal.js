import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import moment from 'moment';

import api from '../../Services/TransactionService';

import './NewTransactionModal.css';

export default function Controllers({ modalIsOpen, closeModal }) {
	const [transactionType, setTransactionType] = useState('-');
	const [despesa, setDespesa] = useState(true);
	const [receita, setReceita] = useState(false);
	const [categoria, setCategoria] = useState();
	const [descricao, setDescricao] = useState();
	const [valor, setValor] = useState(0);
	const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
	const [isfulfilled, setIsfulfilled] = useState(true);

	const [customStyle] = useState({
		content: {
			top: '40%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			padding: '10px 20px',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	});

	useEffect(() => {
		if (categoria && descricao) {
			setIsfulfilled(false);
		} else {
			setIsfulfilled(true);
		}
	}, [categoria, descricao]);

	const handleTipeTransaction = event => {
		if (event.target.id === 'despesaRadio') {
			setDespesa(true);
			setReceita(false);
			setTransactionType('-');
		} else if (event.target.id === 'receitaRadio') {
			setReceita(true);
			setDespesa(false);
			setTransactionType('+');
		}
	};

	const changeDescricao = event => {
		setDescricao(event.target.value);
	};

	const changeCategoria = event => {
		setCategoria(event.target.value);
	};

	const changeValor = event => {
		setValor(event.target.value);
	};

	const changeDate = event => {
		setDate(
			moment(event.target.value, 'YYYY-MM-DD').format('YYYY-MM-DD')
		);
	};

	const submitTransaction = async () => {
		const dataCompleta = date.split('-', 3); // splitar a data completa
		const { data } = await api.create({
			type: transactionType,
			description: descricao,
			category: categoria,
			value: valor,
			yearMonthDay: date,
			yearMonth: `${dataCompleta[0]}-${dataCompleta[1].toLocaleString(
				'pt-br',
				{
					minimumIntegerDigits: 2,
				}
			)}`,
			day: parseInt(dataCompleta[2]),
			month: parseInt(dataCompleta[1]),
			year: parseInt(dataCompleta[0]),
		});
		console.log(data.message);
		closeModal();
	};

	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			style={customStyle}
			contentLabel="Example Modal"
			ariaHideApp={false}
		>
			<div>
				<div className="titulo-formulario">
					<h3>Novo Lançamento</h3>
					<button
						className="waves-effect waves-light btn red darken-4"
						onClick={closeModal}
					>
						X
					</button>
				</div>
				<form>
					<div className="grade-formulario">
						<div className="input-select">
							<label className="input-despesa" htmlFor="despesaRadio">
								<input
									id="despesaRadio"
									type="radio"
									onChange={handleTipeTransaction}
									checked={despesa}
								/>
								<span>Despesa</span>
							</label>
							<label className="input-receita" htmlFor="receitaRadio">
								<input
									id="receitaRadio"
									type="radio"
									onChange={handleTipeTransaction}
									checked={receita}
								/>
								<span>Receita</span>
							</label>
						</div>
						<div className="input-field">
							<input
								id="inputDescription"
								// type="text"
								value={descricao}
								onChange={changeDescricao}
								required
							/>
							<label htmlFor="inputDescription" className="active">
								Descrição:
							</label>
						</div>
						<div className="input-field">
							<input
								id="inputCategory"
								type="text"
								value={categoria}
								onChange={changeCategoria}
								required
							/>
							<label htmlFor="inputCategory" className="active">
								Categoria:
							</label>
						</div>
						<div className="input-valor-data">
							<div className="input-field">
								<input
									id="inputValue"
									type="number"
									min="0"
									step="0.01"
									value={valor}
									onChange={changeValor}
									required
								/>
								<label htmlFor="inputValue" className="active">
									Valor:
								</label>
							</div>
							<input
								className="browser-default"
								placeholder="Data"
								type="date"
								required
								value={date}
								onChange={changeDate}
							/>
						</div>
					</div>
					<input
						type="button"
						className="waves-effect waves-light btn"
						value="enviar"
						disabled={isfulfilled}
						onClick={submitTransaction}
					/>
				</form>
			</div>
		</Modal>
	);
}
