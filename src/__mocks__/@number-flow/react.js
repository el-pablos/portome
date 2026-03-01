import React from 'react';
const NumberFlow = ({ value, ...props }) => React.createElement('span', props, String(value));
export default NumberFlow;
