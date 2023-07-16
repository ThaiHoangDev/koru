import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlNormal = `
<svg width="93" height="99" viewBox="0 0 93 99" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_dd_1319_160)">
<path d="M46.7348 38.1873L47.0914 43.1815C47.2417 45.2864 45.2345 46.8877 43.2156 46.2736C41.1967 45.6595 40.4212 43.2117 41.7181 41.5471L44.7953 37.5973C45.4068 36.8125 46.6639 37.1949 46.7348 38.1873Z" stroke="#737373" stroke-width="2"/>
<path d="M51.0613 49.6654L51.2396 52.1625C51.2898 52.8651 50.6198 53.3996 49.9459 53.1946C49.2721 52.9896 49.0132 52.1726 49.4461 51.617L50.9847 49.6421C50.9943 49.6297 51.0002 49.6258 51.0007 49.6255C51.0014 49.6251 51.0015 49.625 51.0017 49.625C51.0017 49.625 51.0018 49.625 51.0018 49.6249C51.0036 49.6244 51.0144 49.6224 51.031 49.6274C51.0476 49.6325 51.0554 49.6402 51.0566 49.6416C51.0567 49.6416 51.0567 49.6417 51.0567 49.6417C51.0569 49.6419 51.0569 49.642 51.0572 49.6427C51.0575 49.6433 51.0602 49.6497 51.0613 49.6654Z" stroke="#737373" stroke-width="2"/>
</g>
<defs>
<filter id="filter0_dd_1319_160" x="-2.65503" y="-5" width="97.3101" height="104" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="20"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.38 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1319_160"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="1" dy="3"/>
<feGaussianBlur stdDeviation="6"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.81625 0 0 0 0 1 0 0 0 0 0.8125 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_1319_160" result="effect2_dropShadow_1319_160"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1319_160" result="shape"/>
</filter>
</defs>
</svg>
`;

export default () => <SvgXml xml={xmlNormal} />;
