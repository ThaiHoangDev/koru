import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xmlNormal = `
<svg width="89" height="116" viewBox="0 0 89 116" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M53.0739 59.1704H9.81371C9.14405 59.1704 8.44259 59.755 8.46232 60.5622V83.9753C8.46232 84.649 9.07367 85.3444 9.83141 85.3444H53.0739C53.255 85.3444 53.4251 85.2998 53.5853 85.2341C54.1097 85.0233 54.443 84.4436 54.443 83.9753V60.5378C54.3438 60.3564 54.3299 59.1704 53.0739 59.1704ZM51.7225 81.7031L38.2118 74.3682L51.7225 63.3822V81.7031ZM11.1828 63.397L24.6929 74.3845L11.1828 81.7052V63.397ZM15.2126 82.6151L26.9757 76.2411L30.5839 79.1755C30.8337 79.3792 31.1383 79.4806 31.4429 79.4802C31.7476 79.4802 32.0522 79.3774 32.3019 79.1737L35.9288 76.2247L47.7016 82.6151H15.2126V82.6151ZM34.9325 73.5271C34.927 73.5317 34.9201 73.5333 34.9144 73.538L31.4429 76.3647L27.991 73.5539C27.9857 73.5495 27.9788 73.5478 27.9733 73.5435L13.6518 61.898H49.2341L34.9325 73.5271Z" fill="white"/>
<path d="M51.82 0.166519H11.066C4.98563 0.166519 0.0388184 5.10448 0.0388184 11.1742V104.306C0.0388184 110.387 4.98563 115.333 11.066 115.333H51.82C57.9004 115.333 62.8472 110.387 62.8472 104.306V54.0581C64.3243 53.3658 65.7775 52.5545 67.1705 51.5687C68.2279 51.7441 69.3172 51.8361 70.3551 51.8361C80.6366 51.8361 88.9999 43.4728 88.9999 33.1931C88.9999 22.9116 80.6366 14.5482 70.3551 14.5482C67.7515 14.5482 65.1979 15.1002 62.8472 16.1366V11.1742C62.8472 5.10448 57.9004 0.166519 51.82 0.166519ZM51.82 112.613H11.066C6.48579 112.613 2.7593 108.887 2.7593 104.306V11.1742C2.7593 6.60464 6.48579 2.887 11.066 2.887H51.82C56.4002 2.887 60.1267 6.60462 60.1267 11.1742V17.6492C54.9299 21.0874 51.7102 26.9532 51.7102 33.1931C51.7102 38.8909 54.328 44.2663 58.7735 47.821C57.1264 50.2386 54.9337 52.3073 52.3708 53.8429C51.8484 54.1564 51.5969 54.7798 51.758 55.3678C51.9192 55.9558 52.4506 56.3667 53.0616 56.3703C53.1076 56.3703 53.1537 56.3703 53.1997 56.3703C55.4712 56.3703 57.7932 55.959 60.1267 55.1735V104.306C60.1267 108.887 56.4002 112.613 51.82 112.613Z" fill="white"/>
<path d="M23.5277 10.1398H39.3689C40.1198 10.1398 40.7291 9.53056 40.7291 8.7796C40.7291 8.02864 40.1198 7.41936 39.3689 7.41936H23.5277C22.7768 7.41936 22.1675 8.02864 22.1675 8.7796C22.1675 9.53056 22.7768 10.1398 23.5277 10.1398Z" fill="white"/>
<path d="M31.4414 96.8657C28.3578 96.8657 25.8481 99.3808 25.8481 102.471C25.8481 105.562 28.3579 108.077 31.4414 108.077C34.5321 108.077 37.0471 105.562 37.0471 102.471C37.0471 99.3808 34.5321 96.8657 31.4414 96.8657ZM31.4414 105.357C29.858 105.357 28.5686 104.062 28.5686 102.471C28.5686 100.881 29.858 99.5862 31.4414 99.5862C33.0319 99.5862 34.3266 100.881 34.3266 102.471C34.3266 104.062 33.0319 105.357 31.4414 105.357Z" fill="white"/>
<path d="M69.4968 44.5865C71.8298 44.5865 73.5162 44.2961 75.4611 43.42L74.878 41.5726C73.5795 42.2218 71.7979 42.5781 70.1432 42.5781C65.3164 42.5781 61.88 39.5325 61.88 34.0853C61.88 27.8621 66.1898 24.0063 71.1805 24.0063C76.2054 24.0063 78.929 27.2472 78.929 31.4936C78.929 35.2518 77.1767 37.0359 75.7832 36.9699C74.8779 36.9382 74.651 36.0646 74.9729 34.1512L75.9468 28.1234C75.1365 27.7012 73.5162 27.3448 72.0884 27.3448C67.4223 27.3448 64.4716 30.9104 64.4716 34.8954C64.4716 37.5532 66.0289 39.1419 68.1033 39.1419C69.853 39.1419 71.2781 38.2684 72.3153 36.6479H72.3813C72.5423 38.3317 73.6455 39.1419 75.1684 39.1419C78.6677 39.1419 81.3254 36.1596 81.3254 31.396C81.3254 25.9514 77.2427 22.0296 71.5053 22.0296C64.213 22.0296 59.3835 27.7671 59.3835 34.3783C59.3835 40.7307 64.1156 44.5865 69.4968 44.5865ZM72.1227 33.114C71.8298 34.9932 70.5657 36.5159 69.3675 36.5159C68.2959 36.5159 67.7469 35.7401 67.7469 34.5076C67.7469 32.0109 69.4308 29.9048 71.5712 29.9048C71.9591 29.9048 72.3153 29.9708 72.5766 30.0342L72.1227 33.114Z" fill="black"/>
</svg>
`;

export default () => <SvgXml xml={xmlNormal} />;
