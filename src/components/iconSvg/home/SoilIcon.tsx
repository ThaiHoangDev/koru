import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlNormal = `
<svg width="92" height="101" viewBox="0 0 92 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_dd_912_17928)">
<path d="M46.886 39.0804C46.7172 36.7171 43.7233 35.8064 42.2671 37.6754L39.1899 41.6252C37.2462 44.1199 38.4085 47.7884 41.4341 48.7087C44.4597 49.629 47.4679 47.2292 47.2426 44.0747L46.886 39.0804Z" stroke="#F9F9F9"/>
<path d="M51.2125 50.5585C51.1118 49.1484 49.3254 48.605 48.4565 49.7202L46.9179 51.6951C45.8383 53.0808 46.4838 55.1185 48.1644 55.6297C49.8451 56.1409 51.5159 54.8078 51.3908 53.0557L51.2125 50.5585Z" stroke="#F9F9F9"/>
</g>
<defs>
<filter id="filter0_dd_912_17928" x="-4" y="-4" width="97.3101" height="104.241" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="20"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.38 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_912_17928"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="1" dy="3"/>
<feGaussianBlur stdDeviation="6"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.81625 0 0 0 0 1 0 0 0 0 0.8125 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_912_17928" result="effect2_dropShadow_912_17928"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_912_17928" result="shape"/>
</filter>
</defs>
</svg>
`;

export default () => <SvgXml xml={xmlNormal} />;
