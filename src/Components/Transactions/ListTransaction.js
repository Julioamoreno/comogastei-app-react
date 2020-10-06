import React from 'react';

import Transaction from './Transaction';

export default function ListTransaction({
	transactions,
	handleMessageUser,
}) {
	return (
		transactions &&
		transactions.map((transaction, idx) => {
			return (
				<Transaction
					key={idx}
					idTransaction={transaction._id}
					day={transaction.day.toLocaleString('pt-br', {
						minimumIntegerDigits: 2,
					})}
					category={transaction.category}
					description={transaction.description}
					value={transaction.value}
					type={transaction.type}
					yearMonthDay={transaction.yearMonthDay}
					color={
						transaction.type === '+'
							? 'rgb(161, 240, 220)'
							: 'rgb(240, 161, 168)'
					}
					messageUserFeedback={handleMessageUser}
				/>
			);
		})
	);
}
