import React from 'react';
import { getAirlineById, getAirportByCode } from '../data';

const Table = ({ columns, rows, formatValue }) => {
	const generateId = (route) => {
		return String(route.airline) + route.src + route.dest;
	};
	return (
		<table>
			<thead>
				<tr>{columns.map((column) => <td key={column.name}>{column.name}</td>)}</tr>
			</thead>
			<tbody>
				{rows.map((route) => {
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
	);
};

export default Table;
