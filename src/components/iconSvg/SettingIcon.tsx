import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlNormal = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.0866 10.9399C17.1266 10.6399 17.1466 10.3299 17.1466 9.9999C17.1466 9.6799 17.1266 9.3599 17.0766 9.0599L19.1066 7.4799C19.2866 7.3399 19.3366 7.0699 19.2266 6.8699L17.3066 3.5499C17.1866 3.3299 16.9366 3.2599 16.7166 3.3299L14.3266 4.2899C13.8266 3.9099 13.2966 3.5899 12.7066 3.3499L12.3466 0.809902C12.3066 0.569902 12.1066 0.399902 11.8666 0.399902H8.02664C7.78664 0.399902 7.59664 0.569902 7.55664 0.809902L7.19664 3.3499C6.60664 3.5899 6.06664 3.9199 5.57664 4.2899L3.18664 3.3299C2.96664 3.2499 2.71664 3.3299 2.59664 3.5499L0.686643 6.8699C0.566643 7.0799 0.606643 7.3399 0.806643 7.4799L2.83664 9.0599C2.78664 9.3599 2.74664 9.6899 2.74664 9.9999C2.74664 10.3099 2.76664 10.6399 2.81664 10.9399L0.786643 12.5199C0.606643 12.6599 0.556643 12.9299 0.666643 13.1299L2.58664 16.4499C2.70664 16.6699 2.95664 16.7399 3.17664 16.6699L5.56664 15.7099C6.06664 16.0899 6.59664 16.4099 7.18664 16.6499L7.54664 19.1899C7.59664 19.4299 7.78664 19.5999 8.02664 19.5999H11.8666C12.1066 19.5999 12.3066 19.4299 12.3366 19.1899L12.6966 16.6499C13.2866 16.4099 13.8266 16.0899 14.3166 15.7099L16.7066 16.6699C16.9266 16.7499 17.1766 16.6699 17.2966 16.4499L19.2166 13.1299C19.3366 12.9099 19.2866 12.6599 19.0966 12.5199L17.0866 10.9399ZM9.94664 13.5999C7.96664 13.5999 6.34664 11.9799 6.34664 9.9999C6.34664 8.0199 7.96664 6.3999 9.94664 6.3999C11.9266 6.3999 13.5466 8.0199 13.5466 9.9999C13.5466 11.9799 11.9266 13.5999 9.94664 13.5999Z" fill="#F9F9F9"/>
</svg>

`;

const xmlActive = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.0866 10.9399C17.1266 10.6399 17.1466 10.3299 17.1466 9.9999C17.1466 9.6799 17.1266 9.3599 17.0766 9.0599L19.1066 7.4799C19.2866 7.3399 19.3366 7.0699 19.2266 6.8699L17.3066 3.5499C17.1866 3.3299 16.9366 3.2599 16.7166 3.3299L14.3266 4.2899C13.8266 3.9099 13.2966 3.5899 12.7066 3.3499L12.3466 0.809902C12.3066 0.569902 12.1066 0.399902 11.8666 0.399902H8.02664C7.78664 0.399902 7.59664 0.569902 7.55664 0.809902L7.19664 3.3499C6.60664 3.5899 6.06664 3.9199 5.57664 4.2899L3.18664 3.3299C2.96664 3.2499 2.71664 3.3299 2.59664 3.5499L0.686643 6.8699C0.566643 7.0799 0.606643 7.3399 0.806643 7.4799L2.83664 9.0599C2.78664 9.3599 2.74664 9.6899 2.74664 9.9999C2.74664 10.3099 2.76664 10.6399 2.81664 10.9399L0.786643 12.5199C0.606643 12.6599 0.556643 12.9299 0.666643 13.1299L2.58664 16.4499C2.70664 16.6699 2.95664 16.7399 3.17664 16.6699L5.56664 15.7099C6.06664 16.0899 6.59664 16.4099 7.18664 16.6499L7.54664 19.1899C7.59664 19.4299 7.78664 19.5999 8.02664 19.5999H11.8666C12.1066 19.5999 12.3066 19.4299 12.3366 19.1899L12.6966 16.6499C13.2866 16.4099 13.8266 16.0899 14.3166 15.7099L16.7066 16.6699C16.9266 16.7499 17.1766 16.6699 17.2966 16.4499L19.2166 13.1299C19.3366 12.9099 19.2866 12.6599 19.0966 12.5199L17.0866 10.9399ZM9.94664 13.5999C7.96664 13.5999 6.34664 11.9799 6.34664 9.9999C6.34664 8.0199 7.96664 6.3999 9.94664 6.3999C11.9266 6.3999 13.5466 8.0199 13.5466 9.9999C13.5466 11.9799 11.9266 13.5999 9.94664 13.5999Z" fill="#82B779"/>
</svg>

`;

export default ({ isActive }: any) => <SvgXml xml={isActive ? xmlActive : xmlNormal} width="24" height="21" />;
