import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlNormal = `
<svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3071 5.32185V1.35986M13.3071 25.3599V21.3979M7.7884 7.99359L4.98685 5.19204M21.9372 22.1668L19.1356 19.3653M18.789 7.74507L21.5906 4.94352M4.64023 21.9183L7.44177 19.1167M4.97419 13.891H1.01221M24.9878 13.891H21.0258" stroke="#737373" stroke-width="2" stroke-linecap="round"/>
<path d="M13.0122 17.3599C15.2213 17.3599 17.0122 15.569 17.0122 13.3599C17.0122 11.1507 15.2213 9.35986 13.0122 9.35986C10.8031 9.35986 9.01221 11.1507 9.01221 13.3599C9.01221 15.569 10.8031 17.3599 13.0122 17.3599Z" stroke="#737373" stroke-width="2" stroke-linecap="round"/>
</svg>



`;

export default () => <SvgXml xml={xmlNormal} />;
