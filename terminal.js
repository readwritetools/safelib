/* Copyright (c) 2022 Read Write Tools. */
export default class terminal {
    static log(...e) {
        terminal.stdout(e.join(''));
    }
    static stdout(e) {
        terminal.writeToConsoleOrStdout(terminal.getProcessName() + e + '\n');
    }
    static writeToConsoleOrStdout(e) {
        if (isBrowser()) console.info(e); else {
            if (!isNodejs()) throw new Error(e);
            process.stdout.write(e);
        }
    }
    static trace(...e) {
        terminal.stderr(gray('   [TRACE] '), e.join(''));
    }
    static expect(...e) {
        terminal.stderr(yellow('  [EXPECT] ') + getFunctionName(4), e.join(''));
    }
    static aver(...e) {
        terminal.stderr(yellow('    [AVER] ') + getFunctionName(4), e.join(''));
    }
    static invalid(...e) {
        terminal.stderr(yellow(' [INVALID] '), e.join(''));
    }
    static warning(...e) {
        terminal.stderr(yellow(' [WARNING] '), e.join(''));
    }
    static error(...e) {
        terminal.stderr(red('   [ERROR] '), e.join(''));
    }
    static caught(...e) {
        terminal.stderr(red('  [CAUGHT] ') + getFunctionName(3), e.join(''));
    }
    static abnormal(...e) {
        terminal.stderr(red('[ABNORMAL] ') + getFunctionName(3), e.join(''));
    }
    static logic(...e) {
        terminal.stderr(red('   [LOGIC] ') + getFunctionName(3), e.join(''));
    }
    static stderr(e, r) {
        terminal.writeToConsoleOrStderr(terminal.getProcessName() + e + r + '\n');
    }
    static writeToConsoleOrStderr(e) {
        if (isBrowser()) console.warn(e); else {
            if (!isNodejs()) throw new Error(e);
            process.stderr.write(e);
        }
    }
    static setProcessName(e) {
        Object.defineProperty(terminal, 'processName', {
            value: e,
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

function gray(e) {
    return isBrowser() ? e : `[37m${e}[0m`;
}

function red(e) {
    return isBrowser() ? e : `[31m${e}[0m`;
}

function green(e) {
    return isBrowser() ? e : `[32m${e}[0m`;
}

function yellow(e) {
    return isBrowser() ? e : `[33m${e}[0m`;
}

function blue(e) {
    return isBrowser() ? e : `[34m${e}[0m`;
}

function magenta(e) {
    return isBrowser() ? e : `[35m${e}[0m`;
}

function cyan(e) {
    return isBrowser() ? e : `[36m${e}[0m`;
}

function white(e) {
    return isBrowser() ? e : `[37m${e}[0m`;
}

function getFunctionName(e) {
    var r = (new Error).stack.split('\n')[e], t = /at (.*) ?\(/g.exec(r), n = '';
    return null == t ? r : (t.length > 1 && (n += t[1].trim()), `{${n = rightAlign(n, 30)}} `);
}

function rightAlign(e, r) {
    var t = r, n = e.length;
    return n > t ? e.substr(0, t - 3) + '...' : ' '.repeat(t + 1 - n) + e;
}