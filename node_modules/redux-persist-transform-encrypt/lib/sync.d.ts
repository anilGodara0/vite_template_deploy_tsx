/// <reference types="redux-persist/types/types.js" />
/// <reference types="redux-persist" />
import type { TransformConfig } from 'redux-persist/lib/createTransform';
export interface EncryptTransformConfig {
    secretKey: string;
    onError?: (err: Error) => void;
}
export declare const encryptTransform: <HSS, S = any, RS = any>(config: EncryptTransformConfig, transformConfig?: TransformConfig) => import("redux-persist").Transform<HSS, string, S, RS>;
