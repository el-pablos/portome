import React from 'react';
const NumberFlow = ({ value, format, transformTiming, willChange, ...props }) => React.createElement('span', props, String(value));
export default NumberFlow;
