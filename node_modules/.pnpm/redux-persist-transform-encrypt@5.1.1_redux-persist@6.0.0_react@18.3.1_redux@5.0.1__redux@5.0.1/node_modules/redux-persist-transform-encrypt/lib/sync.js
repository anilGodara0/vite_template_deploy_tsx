import Aes from 'crypto-js/aes.js';
import CryptoJsCore from 'crypto-js/core.js';
import stringify from 'json-stringify-safe';
import { createTransform } from 'redux-persist';
const makeError = (message) => new Error(`redux-persist-transform-encrypt: ${message}`);
export const encryptTransform = (config, transformConfig) => {
    if (typeof config === 'undefined') {
        throw makeError('No configuration provided.');
    }
    const { secretKey } = config;
    if (!secretKey) {
        throw makeError('No secret key provided.');
    }
    const onError = typeof config.onError === 'function' ? config.onError : console.warn;
    return createTransform((inboundState, _key) => Aes.encrypt(stringify(inboundState), secretKey).toString(), (outboundState, _key) => {
        if (typeof outboundState !== 'string') {
            return onError(makeError('Expected outbound state to be a string.'));
        }
        try {
            const decryptedString = Aes.decrypt(outboundState, secretKey).toString(CryptoJsCore.enc.Utf8);
            if (!decryptedString) {
                throw new Error('Decrypted string is empty.');
            }
            try {
                return JSON.parse(decryptedString);
            }
            catch {
                return onError(makeError('Failed to parse state as JSON.'));
            }
        }
        catch {
            return onError(makeError('Could not decrypt state. Please verify that you are using the correct secret key.'));
        }
    }, transformConfig);
};
