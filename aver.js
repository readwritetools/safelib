/* Copyright (c) 2022 Read Write Tools. */
import terminal from './terminal.js';

export default function aver(e, n) {
    if (n = n || '', void 0 === e) terminal.aver(`Expected boolean, but got 'undefined' (${n})\n`); else if (null === e) terminal.aver(`Expected boolean, but got 'null' (${n})\n`); else if ('Boolean' != e.constructor.name) terminal.aver(`Expected boolean, but got '${e.constructor.name}' (${n})\n`); else if (!1 === e) terminal.aver(`Unable to aver (${n})\n`); else if (!0 === e) return !0;
    return !1;
}