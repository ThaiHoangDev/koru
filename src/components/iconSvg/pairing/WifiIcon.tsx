import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlNormal = `
<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 3.31091L1.45455 4.76545C5.06909 1.15091 10.9309 1.15091 14.5455 4.76545L16 3.31091C11.5855 -1.10364 4.42182 -1.10364 0 3.31091ZM5.81818 9.12909L8 11.3109L10.1818 9.12909C8.98182 7.92182 7.02545 7.92182 5.81818 9.12909ZM2.90909 6.22L4.36364 7.67455C6.37091 5.66727 9.62909 5.66727 11.6364 7.67455L13.0909 6.22C10.2836 3.41273 5.72364 3.41273 2.90909 6.22Z" fill="#191919"/>
</svg>
`;

export default () => <SvgXml xml={xmlNormal} />;
