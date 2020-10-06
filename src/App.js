import React, { useState, useEffect } from 'react';
import moment from 'moment';
import M from 'materialize-css';

import './app.css';

import api from './Services/TransactionService';
import ListAllMonth from './Utils/AllMonth';

import PreLoader from './Components/Loader/PreLoader';
import ListTransaction from './Components/Transactions/ListTransaction';
import NewTransactionModal from './Components/Modal/NewTransactionModal';
import StatsBar from './Components/Bars/StatsBar';
import SearchBar from './Components/Bars/SearchBar';

export default function App() {
	const [transactions, setTransactions] = useState();
	const [period, setPeriod] = useState(moment().format('YYYY-MM'));
	const [allMonth, setAllMonth] = useState();
	const [modalIsOpen, setIsOpen] = useState(false);
	const [messageUser, setMessageUser] = useState();
	const [filterText, setFilterText] = useState();

	useEffect(() => {
		setAllMonth(ListAllMonth);
	}, [allMonth]);

	useEffect(() => {
		const auto = async () => {
			setTransactions();
			const response = await api.get(period);

			setTransactions(response.data);
			console.log(response.data);
			M.AutoInit();
		};
		auto();
	}, [period, modalIsOpen, messageUser]);

	const changeMonth = event => {
		setPeriod(event.target.value);
	};

	const nextMonth = () => {
		console.log(allMonth.indexOf(period));
		// setPeriod()
	};

	const clickNovoLancamento = () => {
		setIsOpen(true);
	};

	const handleMessageUser = message => {
		setMessageUser(message);
	};

	const changeFilterSearch = critery => {
		console.log(critery.toLowerCase());
		const listFiltered = transactions.filter(({ description }) => {
			return new RegExp(`${critery}`, 'igu').test(
				description.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
			);
		});

		listFiltered.lenght === 0
			? setFilterText()
			: setFilterText(listFiltered);
		!critery ? setFilterText() : setFilterText(listFiltered);
	};

	const closeModal = () => {
		setIsOpen(false);
	};
	return (
		<div className="container">
			<div className="center">
				<h1>Controle de finanças pessoais</h1>
			</div>
			<div
				className="center"
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					margin: 10 + 'px',
				}}
			>
				<button className="waves-effect waves-light btn">
					{' < '}
				</button>
				<select
					className="browser-default"
					name="month"
					id="month"
					onChange={changeMonth}
					value={period}
				>
					{allMonth &&
						allMonth.map((month, idx) => {
							return (
								<option
									key={idx}
									value={month.yearMonth}
									id="month"
								>{`${month.month}/${month.year}`}</option>
							);
						})}
				</select>
				<button
					className="waves-effect waves-light btn"
					onClick={nextMonth}
				>
					{' > '}
				</button>
			</div>
			{filterText ? (
				<StatsBar transactions={filterText} /> // passar novo array e fazer ele ser contado no componente statsBar
			) : (
				transactions && <StatsBar transactions={transactions} />
			)}

			<SearchBar
				clickNovoLancamento={clickNovoLancamento}
				searchCritery={changeFilterSearch}
				visibleBar={setIsOpen}
			/>

			<div className="center">
				{!transactions ? (
					<PreLoader />
				) : !filterText ? (
					<ListTransaction
						transactions={transactions}
						handleMessageUser={handleMessageUser}
					/>
				) : (
					<ListTransaction
						transactions={filterText}
						handleMessageUser={handleMessageUser}
					/>
				)}

				<NewTransactionModal
					modalIsOpen={modalIsOpen}
					closeModal={closeModal}
					contentLabel="Example Modal"
				/>
			</div>
		</div>
	);
}
