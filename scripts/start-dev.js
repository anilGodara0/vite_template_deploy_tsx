import { spawn } from 'child_process';
//  THIS FILE IS CREATED FOR FUN JUST TO SHOW WHO DEVELOPED THIS
const decodeBase64 = (encoded) => {
  return Buffer.from(encoded, 'base64').toString('utf-8');
};
const encodedSignature = '8J+RiCBDcmVhdGVkIGJ5IEFuaWwgR29kYXJh';
const encodedStartMessage = 'U3RhcnRpbmcgeW91ciBwcm9qZWN0Li4uIHjwnIEluY2luZSBwcm9qZWN0IHRpbWUu';
const encodedReadyMessage = 'UmVhZHkgdG8gUm9jayEgSGFwcHkgQ29kaW5nIHJvY2sgQ29kaW5nIF8gKD';

const cyan = '\x1b[36m';
const green = '\x1b[32m';
const magenta = '\x1b[35m';
const reset = '\x1b[0m';

const showHeader = () => {
  console.clear();
  console.log(magenta + decodeBase64(encodedSignature) + '\n' + reset);
};

const spinnerFrames = ['|', '/', '-', '\\'];
let i = 0;

showHeader();
process.stdout.write(cyan + decodeBase64(encodedStartMessage) + ' ');

const spinnerInterval = setInterval(() => {
  process.stdout.write('\r' + cyan + decodeBase64(encodedStartMessage) + ' ' + spinnerFrames[i % spinnerFrames.length] + reset);
  i++;
}, 100);

setTimeout(() => {
  clearInterval(spinnerInterval);
  setTimeout(() => {
    process.stdout.write('\r' + green + decodeBase64(encodedReadyMessage) + '\n\n' + reset);

    const vite = spawn('vite', { stdio: 'inherit', shell: true });
    vite.on('close', (code) => {
      console.log(green + `\n Thanks for Code - ${code}` + reset);
    });
  }, 100);
}, 2000);