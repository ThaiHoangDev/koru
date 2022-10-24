import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlNormal = `
<svg width="141" height="162" viewBox="0 0 141 162" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.9519 1.02668C7.55708 -0.414531 -2.81852 57.6401 2.33549 107.82C26.8174 119.4 119.591 118.113 138.919 107.82C142.784 62.7868 136.273 -0.487713 119.591 1.02668C77.0697 4.88676 64.1845 4.88676 22.9519 1.02668Z" stroke="#191919" stroke-width="2"/>
<path d="M138.919 115.136C137.63 123.63 132.219 146.273 120.88 152.449C109.541 158.625 84.801 160.943 73.2043 160.943C61.6076 160.943 29.3946 158.882 19.0865 152.449C8.15986 145.63 3.62421 123.63 2.33569 115.136C29.3946 126.716 114.437 125.429 138.919 115.136Z" fill="#191919" stroke="#191919" stroke-width="2"/>
</svg>
`;

export default ({ width, height }: any) => <SvgXml xml={xmlNormal} width={width} height={height} />;
