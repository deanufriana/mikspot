import { RouterOSAPI } from 'node-routeros'

export const conn = new RouterOSAPI({
    host: '',
    user: '',
    password: '',
    keepalive: true
});