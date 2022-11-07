import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlNormal = `
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.32512 3.75013C6.82341 5.02482 4.8237 7.10464 3.64822 9.65446C2.47273 12.2043 2.18993 15.0756 2.84539 17.8058C3.50084 20.5359 5.05637 22.9659 7.26133 24.7042C9.46629 26.4424 12.1923 27.3877 15 27.3877C17.8077 27.3877 20.5337 26.4424 22.7387 24.7042C24.9436 22.9659 26.4992 20.5359 27.1546 17.8058C27.8101 15.0756 27.5273 12.2043 26.3518 9.65446C25.1763 7.10463 23.1766 5.02481 20.6749 3.75013" stroke="#8BD242" stroke-width="2.5" stroke-linecap="round"/>
<path d="M15 1.25C15 9.71154 15 13.109 15 13.75" stroke="#8BD242" stroke-width="2.5" stroke-linecap="round"/>
</svg>
`;

export default () => <SvgXml xml={xmlNormal} />;
