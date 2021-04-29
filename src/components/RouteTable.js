import React, { useState, useEffect } from 'react';
import { getAirlineById, getAirportByCode } from '../data';
import { Table, ButtonGroup, Button } from 'react-bootstrap';

const RouteTable = ({ columns, rows, pageLimit = 25 }) => {
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
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>{columns.map((column) => <th key={column.name}>{column.name}</th>)}</tr>
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
			</Table>
			<ButtonGroup size="lg" className="mb-2">
				<Button
					style={prevButtonDisabled ? { pointerEvents: 'none' } : {}}
					id="prev_page"
					onClick={() => handlePreviousButton()}
				>
					Previous Page
				</Button>
				<Button
					style={nextButtonDisabled ? { pointerEvents: 'none' } : {}}
					id="next_page"
					onClick={() => handleNextButton()}
				>
					Next Page
				</Button>
			</ButtonGroup>
		</div>
	);
};

export default RouteTable;
