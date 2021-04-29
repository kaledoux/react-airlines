import React, { useState, useEffect } from 'react';
import { getAirlineById, getAirportByCode } from '../data';

const Table = ({ columns, rows, pageLimit = 25 }) => {
	const perPage = pageLimit;
	const [ pageIndex, setPageIndex ] = useState(0);
	const [ nextButtonDisabled, setNextButton ] = useState(false);
	const [ prevButtonDisabled, setPrevButton ] = useState(false);

	useEffect(
		() => {
			setNextButton(pageIndex + perPage > rows.length);
			setPrevButton(pageIndex - perPage < 0);
		},
		[ pageIndex, perPage, rows.length ]
	);

	const generateId = (route) => {
		return String(route.airline) + route.src + route.dest;
	};

	const handleNextButton = () => {
		setPageIndex(pageIndex + perPage);
	};
	const handlePreviousButton = () => {
		setPageIndex(pageIndex - perPage);
	};
	return (
		<div>
			<table>
				<thead>
					<tr>{columns.map((column) => <td key={column.name}>{column.name}</td>)}</tr>
				</thead>
				<tbody>
					{rows.slice(pageIndex, pageIndex + perPage).map((route, ind) => {
						return (
							<tr key={generateId(route)}>
								<td>{getAirlineById(route.airline)}</td>
								<td>{getAirportByCode(route.src)}</td>
								<td>{getAirportByCode(route.dest)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<button
				style={prevButtonDisabled ? { pointerEvents: 'none' } : {}}
				id="prev_page"
				onClick={() => handlePreviousButton()}
			>
				Previous Page
			</button>
			<button
				style={nextButtonDisabled ? { pointerEvents: 'none' } : {}}
				id="next_page"
				onClick={() => handleNextButton()}
			>
				Next Page
			</button>
		</div>
	);
};

export default Table;

// tbody
// map out routes from n to n + 25
//   if at starting index, disable prev button
//   if collection is less than 25, disable next button
