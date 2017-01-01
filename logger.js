import {logLevel} from './package.json';

export function trace(msg) {
  if (logLevel === 'trace') {
    console.log('[zwd51-trace]:' + msg);
  }
}
