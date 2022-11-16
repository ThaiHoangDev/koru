import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlNormal = `
<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.27686 7.70293H0V6.29707H6.27686V0H7.72314V6.29707H14V7.70293H7.72314V14H6.27686V7.70293Z" fill="#8BD242"/>
</svg>
`;

export default () => <SvgXml xml={xmlNormal} />;
