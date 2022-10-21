import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlNormal = `
<svg width="38" height="34" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 7.62842C10.0501 -1.42171 26.3402 -1.42171 37.2003 7.62842" stroke="#191919" stroke-linecap="round"/>
<path d="M4.62012 13.7373C11.8602 5.59214 26.3403 5.59215 33.5804 13.7373" stroke="#191919" stroke-linecap="round"/>
<path d="M8.24023 19.1675C13.6703 11.9272 24.5304 11.9272 29.9604 19.1675" stroke="#191919" stroke-linecap="round"/>
<circle cx="19.1007" cy="27.3126" r="5.83505" stroke="#191919"/>
</svg>
`;

export default () => <SvgXml xml={xmlNormal} />;
