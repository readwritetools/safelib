/* Copyright (c) 2022 Read Write Tools. */
export default class terminal {
    static log(...r) {
        terminal.stdout(r.join(''));
    }
    static stdout(r) {
        terminal.writeToConsoleOrStdout(terminal.getProcessName() + r + '\n');
    }
    static writeToConsoleOrStdout(r) {
        if (isBrowser()) console.info(r); else {
            if (!isNodejs()) throw new Error(r);
            process.stdout.write(r);
        }
    }
    static trace(...r) {
        terminal.stderr(gray('   [TRACE] '), r.join(''));
    }
    static expect(...r) {
        terminal.stderr(yellow('  [EXPECT] ') + getFunctionName(5), r.join(''));
    }
    static aver(...r) {
        terminal.stderr(yellow('    [AVER] '), getStackTraceLine(4));
    }
    static invalid(...r) {
        terminal.stderr(yellow(' [INVALID] '), r.join(''));
    }
    static warning(...r) {
        terminal.stderr(yellow(' [WARNING] '), r.join(''));
    }
    static error(...r) {
        terminal.stderr(red('   [ERROR] '), r.join(''));
    }
    static caught(...r) {
        terminal.stderr(red('  [CAUGHT] ') + getFunctionName(3), r.join(''));
    }
    static abnormal(...r) {
        terminal.stderr(red('[ABNORMAL] ') + getFunctionName(3), r.join(''));
    }
    static logic(...r) {
        terminal.stderr(red('   [LOGIC] ') + getFunctionName(3), r.join(''));
    }
    static stderr(r, e) {
        terminal.writeToConsoleOrStderr(terminal.getProcessName() + r + e + '\n');
    }
    static writeToConsoleOrStderr(r) {
        if (isBrowser()) console.warn(r); else {
            if (!isNodejs()) throw new Error(r);
            process.stderr.write(r);
        }
    }
    static setProcessName(r) {
        Object.defineProperty(terminal, 'processName', {
            value: r,
            writable: !0
        });
    }
    static getProcessName() {
        return null == terminal.processName ? '' : gray(terminal.processName);
    }
}

function isBrowser() {
    return 'object' == typeof console && 'function' == typeof console.warn;
}

function isNodejs() {
    return 'object' == typeof process && 'object' == typeof process.stderr && 'function' == typeof process.stderr.write;
}

function gray(r) {
    return isBrowser() ? r : `[37m${r}[0m`;
}

function red(r) {
    return isBrowser() ? r : `[31m${r}[0m`;
}

function green(r) {
    return isBrowser() ? r : `[32m${r}[0m`;
}

function yellow(r) {
    return isBrowser() ? r : `[33m${r}[0m`;
}

function blue(r) {
    return isBrowser() ? r : `[34m${r}[0m`;
}

function magenta(r) {
    return isBrowser() ? r : `[35m${r}[0m`;
}

function cyan(r) {
    return isBrowser() ? r : `[36m${r}[0m`;
}

function white(r) {
    return isBrowser() ? r : `[37m${r}[0m`;
}

function getFunctionName(r) {
    var e = (new Error).stack.split('\n')[r], t = /at (.*) ?\(/g.exec(e), n = '';
    return null == t ? e : (t.length > 1 && (n += t[1].trim()), `{${n = rightAlign(n, 30)}} `);
}

function getStackTraceLine(r) {
    return (new Error).stack.split('\n')[r];
}

function rightAlign(r, e) {
    var t = e, n = r.length;
    return n > t ? r.substr(0, t - 3) + '...' : ' '.repeat(t - n) + r;
}