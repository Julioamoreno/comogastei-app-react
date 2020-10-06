import React, { useState } from 'react';

import API from '../../Services/TransactionService';
import './transaction.css';
import EditTransactionModal from '../Modal/EditTransactionModal';

export default function Components({
	idTransaction,
	day,
	category,
	description,
	value,
	type,
	yearMonthDay,
	color,
	messageUserFeedback,
}) {
	const [modalIsOpen, setIsOpen] = useState(false);

	const editTransaction = () => {
		setIsOpen(true);
	};

	const setDataTransaction = async dataTransaction => {
		console.log(dataTransaction);
		const { data, status } = await API.update(
			idTransaction,
			dataTransaction
		);
		console.log(data);
		closeModalEdit();
		const messageUser = {
			status,
			data,
		};
		changeMessageUser(messageUser);
	};

	const closeModalEdit = () => {
		setIsOpen(false);
	};

	const deleteTransaction = async () => {
		const { status, data } = await API.remove(idTransaction);
		const messageUser = {
			status,
			data,
		};
		changeMessageUser(messageUser);
	};

	const changeMessageUser = responseMessageAPI => {
		messageUserFeedback(responseMessageAPI);
	};

	return (
		<div
			className="transaction"
			style={{
				backgroundColor: color,
			}}
		>
			<span className="transaction-day">{day}</span>
			<div className="group2">
				<div className="transaction-group">
					<span className="transaction-category">{category}</span>
					<span className="transaction-description">
						{description}
					</span>
				</div>
				<span className="transaction-value">
					{value.toLocaleString('pt-br', {
						style: 'currency',
						currency: 'BRL',
						minimumFractionDigits: 2,
					})}
				</span>
			</div>
			<div className="transaction-group-button">
				<span
					className="material-icons button"
					onClick={editTransaction}
				>
					edit
				</span>
				<span
					className="material-icons button"
					onClick={deleteTransaction}
				>
					delete
				</span>
			</div>
			<EditTransactionModal
				modalIsOpen={modalIsOpen}
				closeModal={closeModalEdit}
				idTransaction={idTransaction}
				day={day}
				category={category}
				description={description}
				value={value}
				type={type}
				yearMonthDay={yearMonthDay}
				dataTransaction={setDataTransaction}
			/>
		</div>
	);
}
