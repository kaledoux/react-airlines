import React from 'react';

const Select = ({ options = [], valueKey = '', titleKey = '', allTitle = 'all', value = 'all', onSelect }) => {
	return (
		<select onClick={(e) => onSelect(e)}>
			<option key="all" value="all">
				{allTitle}
			</option>
			{options.map((airline) => (
				<option key={airline[valueKey]} value={airline[valueKey]}>
					{airline[titleKey]}
				</option>
			))}
		</select>
	);
};

export default Select;
