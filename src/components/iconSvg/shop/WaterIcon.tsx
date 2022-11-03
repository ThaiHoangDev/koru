import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlNormal = `
<svg width="23" height="32" viewBox="0 0 23 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6308 12.5942L15.0959 5.10283C14.8264 1.32933 10.046 -0.124805 7.72093 2.8595L3.10508 8.78411C0.0818374 12.6646 1.88969 18.3707 6.59592 19.8022C11.3022 21.2338 15.9812 17.5009 15.6308 12.5942Z" stroke="#CBCBCB" stroke-width="2"/>
<path d="M21.853 26.0662L21.5855 22.3205C21.4181 19.9767 18.449 19.0736 17.0049 20.9271L14.6969 23.8895C12.9698 26.1064 14.0026 29.3663 16.6913 30.1842C19.38 31.002 22.0531 28.8694 21.853 26.0662Z" stroke="#CBCBCB" stroke-width="2"/>
</svg>

`;

export default () => <SvgXml xml={xmlNormal} />;
