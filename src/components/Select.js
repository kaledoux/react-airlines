import React from 'react';

const Select = ({
	options = [],
	valueKey = '',
	titleKey = '',
	allTitle = 'all',
	enableKey = undefined,
	value = 'all',
	onSelect
}) => {
	return (
		<select value={value} onChange={(e) => onSelect(e)}>
			<option key="all" value="all">
				{allTitle}
			</option>
			{options.map((option) => {
				const enabled = enableKey === undefined || !!option[enableKey];
				return (
					<option disabled={!enabled} key={option[valueKey]} value={option[valueKey]}>
						{option[titleKey]}
					</option>
				);
			})}
		</select>
	);
};

export default Select;
