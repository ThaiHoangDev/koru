import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlNormal = `
<svg width="38" height="39" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.4606 7.44298V1.5M19.4606 37.5V31.557M11.1826 11.4506L6.98029 7.24826M32.4058 32.7104L28.2035 28.5081M27.6835 11.0778L31.8859 6.87548M6.46035 32.3377L10.6627 28.1353M6.96131 20.2966H1.01833M36.9817 20.2966H31.0387" stroke="#CBCBCB" stroke-width="2" stroke-linecap="round"/>
<path d="M18.8997 26.2627C22.7001 26.2627 25.781 23.1818 25.781 19.3813C25.781 15.5809 22.7001 12.5 18.8997 12.5C15.0992 12.5 12.0183 15.5809 12.0183 19.3813C12.0183 23.1818 15.0992 26.2627 18.8997 26.2627Z" stroke="#CBCBCB" stroke-width="2" stroke-linecap="round"/>
</svg>

`;

export default () => <SvgXml xml={xmlNormal} />;
