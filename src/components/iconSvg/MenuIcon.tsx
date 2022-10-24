import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlNormal = `
<svg width="32" height="14" viewBox="0 0 32 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1H31" stroke="#737373" stroke-width="2" stroke-linecap="round"/>
<path d="M1 13H22" stroke="#737373" stroke-width="2" stroke-linecap="round"/>
</svg>

`;

export default () => <SvgXml xml={xmlNormal} width="24" height="21" />;
