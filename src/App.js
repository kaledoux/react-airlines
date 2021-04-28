import React from 'react';
import Table from './components/Table';
import './App.css';
import data from './data';

const App = () => {
	const columns = [
		{ name: 'Airline', property: 'airline' },
		{ name: 'Source Airport', property: 'src' },
		{ name: 'Destination Airport', property: 'dest' }
	];

	const formatValue = (_, value) => value;

	return (
		<div className="app">
			<header className="header">
				<h1 className="title">Airline Routes</h1>
			</header>
			<section>
				<Table className="routes-table" columns={columns} rows={data.routes} format={formatValue} pageLimit={10} />
			</section>
		</div>
	);
};

export default App;
