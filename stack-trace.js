/* Copyright (c) 2022 Read Write Tools. */
export default class StackTrace {
    constructor() {
        Object.seal(this);
    }
    static getFunctionName(e) {
        var t = (new Error).stack.split('\n')[e], a = /at (.*) ?\(/, r = a.exec(t);
        null == r && (r = (a = /(.*)@/).exec(t));
        var l = '';
        return null == r ? t : (r.length > 1 && (l += r[1].trim()), `{${l = l.padStart(30, ' ')}}`);
    }
    static getSitus(e) {
        var t = (new Error).stack.split('\n')[e], a = /at .*\((.*)\)/, r = a.exec(t);
        null == r && (r = (a = /.*@(.*)/).exec(t));
        var l = '';
        return r.length > 1 && (l += r[1].trim()), l;
    }
    static getInfo(e) {
        var t = {
            classname: '',
            member: '',
            path: '',
            filename: '',
            line: '',
            column: ''
        }, a = (new Error).stack.split('\n')[e], r = /at (.*) ?\(/, l = r.exec(a);
        null == l && (l = (r = /(.*)@/).exec(a));
        var n = '';
        l.length > 1 && (n = l[1].trim());
        var c = n.split('.');
        t.classname = c[0], c.length > 1 && (t.member = c[1], t.member = t.member.replace(' (eval at evaluate', ''));
        var s = /at .*\((.*)\)/g, i = s.exec(a);
        null == i && (i = (s = /.*@(.*)/).exec(a));
        var m = '';
        i.length > 1 && (m = i[1].trim());
        var u = '', v = m.split(':');
        4 == v.length ? (u = v[0] + v[1], t.line = v[2], t.column = v[3]) : 3 == v.length ? (u = v[0], 
        t.line = v[1], t.column = v[2]) : (u = v[0], t.line = v[1]);
        var g = u.lastIndexOf('/');
        return -1 != g ? (t.path = u.substr(0, g), t.filename = u.substr(g + 1)) : t.filename = u, 
        t;
    }
}