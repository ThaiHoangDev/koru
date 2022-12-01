import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlNormal = `
<svg width="42" height="73" viewBox="0 0 42 73" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 65.5485C13 69.1384 10.0899 72.0485 6.5 72.0485C2.91015 72.0485 0 69.1384 0 65.5485C0 61.9587 2.91015 61.5485 6.5 61.5485C10.0899 61.5485 13 61.9587 13 65.5485Z" fill="#A5D3CC"/>
<path d="M28.8184 40.0486C28.8184 43.6384 25.9082 46.5486 22.3184 46.5486C18.7285 46.5486 14.3184 43.6384 14.3184 40.0486C14.3184 36.4587 18.7285 32.0486 22.3184 32.0486C25.9082 32.0486 28.8184 36.4587 28.8184 40.0486Z" fill="#A5D3CC"/>
<path d="M40.3184 13.0483C38 17.5 32.4082 19.5483 28.8184 19.5483C25.2285 19.5483 20.8184 16.6382 20.8184 13.0483C20.8184 9.45849 25.2285 0.0483398 28.8184 0.0483398C32.4082 0.0483398 46.3231 1.51823 40.3184 13.0483Z" fill="#A5D3CC"/>
</svg>

`;

export default () => <SvgXml xml={xmlNormal} />;
