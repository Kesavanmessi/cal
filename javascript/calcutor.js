function add(e) {
    let a = document.getElementById("element").value;
    document.getElementById("element").value = a + e;
}

function remove() {
    let a = document.getElementById("element").value;
    document.getElementById("element").value = a.substring(0, a.length - 1);
}

function clearInput() {
    document.getElementById("element").value = '';
}

function prece(ch) {
    if (ch === '(') {
        return 0;
    } else if (ch === '-' || ch === '+') {
        return 1;
    } else {
        return 2;
    }
}

function cal(pre) {
    while (stlen > 0 && prece(st[stlen - 1]) !== pre) {
        let ope = st.pop();
        let el = l.pop();
        if (ope === '+') {
            l[l.length - 1] += el;
        } else if (ope === '-') {
            l[l.length - 1] -= el;
        } else if (ope === '*') {
            l[l.length - 1] *= el;
        } else if (ope === '/') {
            l[l.length - 1] = Math.floor(l[l.length - 1] / el);
        } else if (ope === '%') {
            l[l.length - 1] %= el;
        } else if (ope === '^') {
            l[l.length - 1] = Math.pow(l[l.length - 1], el);
        } else if (ope === '√') {
            l[l.length - 1] = Math.sqrt(el);
        }
        stlen -= 1;
    }
    if (pre === 0 && stlen > 0) {
        st.pop();
        stlen -= 1;
    }
}

function evaluateExpression(a) {
    st = [];
    l = [];
    stlen = 0;
    let i = 0;

    while (i < a.length) {
        let ch = a[i];

        if (ch === ' ') {
            i++;
            continue;
        }

        if (!isNaN(ch) || ch === '.') {
            let num = '';

            // Parse the full number (including decimals)
            while (i < a.length && (!isNaN(a[i]) || a[i] === '.')) {
                num += a[i];
                i++;
            }
            l.push(parseFloat(num));
            continue;
        } else {
            if (ch === ')') {
                cal(0);
            } else if (stlen === 0 || ch === '(' || prece(st[stlen - 1]) < prece(ch)) {
                st.push(ch);
                stlen++;
            } else {
                cal(prece(ch) - 1);
                st.push(ch);
                stlen++;
            }
        }
        i++;
    }

    if (stlen > 0) {
        cal(0);
    }

    return l[0];
}

function call() {
    let a = document.getElementById("element").value;
    document.getElementById("element").value = evaluateExpression(a);
}
