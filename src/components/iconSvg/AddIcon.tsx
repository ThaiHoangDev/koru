import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlNormal = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.2769 12.7029H5V11.2971H11.2769V5H12.7231V11.2971H19V12.7029H12.7231V19H11.2769V12.7029Z" fill="#8BD242"/>
<rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#8BD242"/>
</svg>
`;

export default () => <SvgXml xml={xmlNormal} width={32} height={32}/>;
