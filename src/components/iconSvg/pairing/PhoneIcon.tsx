import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlNormal = `
<svg width="52" height="102" viewBox="0 0 52 102" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="51" height="100.488" rx="5.11235" stroke="#191919"/>
<rect x="2.25879" y="8.79004" width="47.4831" height="82.1497" rx="3.51932" stroke="#191919"/>
<circle cx="26.1258" cy="96.4637" r="2.51449" fill="#191919" stroke="#191919"/>
<circle cx="18.2865" cy="4.46961" r="0.701544" fill="#191919"/>
<rect x="23.6096" y="4.11884" width="10.5232" height="0.701544" rx="0.350772" stroke="#191919" stroke-width="0.701544"/>
</svg>

`;

export default () => <SvgXml xml={xmlNormal} />;
