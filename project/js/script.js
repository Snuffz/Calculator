let display = document.getElementById('display');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    let expression = display.value;
    try {
        let result = evaluateExpression(expression);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

function evaluateExpression(expression) {
    expression = expression.replace(/[^-()\d/*+.%]/g, ' ');

    let tokens = expression.match(/(\d+(\.\d+)?|\+|\-|\*|\/|\(|\)|%)/g);

    if (!tokens) {
        throw new Error('Invalid expression');
    }

    let postfix = infixToPostfix(tokens);

    let result = evaluatePostfix(postfix);
    return result;
}

function infixToPostfix(tokens) {
    let precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '%': 3
    };

    let output = [];
    let stack = [];

    tokens.forEach(token => {
        if (!isNaN(token)) {
            output.push(token);
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop();
        } else {
            while (stack.length > 0 && precedence[token] <= precedence[stack[stack.length - 1]]) {
                output.push(stack.pop());
            }
            stack.push(token);
        }
    });

    while (stack.length > 0) {
        output.push(stack.pop());
    }

    return output;
}

function appendToDisplay(value) {
    let display = document.getElementById('display');
    display.value += value;
}

function evaluatePostfix(tokens) {
    let stack = [];

    tokens.forEach(token => {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else {
            let operand2 = stack.pop();
            let operand1 = stack.pop();
            switch (token) {
                case '+':
                    stack.push(operand1 + operand2);
                    break;
                case '-':
                    stack.push(operand1 - operand2);
                    break;
                case '*':
                    stack.push(operand1 * operand2);
                    break;
                case '/':
                    if (operand2 === 0) {
                        throw new Error('Division by zero');
                    }
                    stack.push(operand1 / operand2);
                    break;
                case '%':
                    stack.push(operand1 * (operand2 / 100));
                    break;
            }
        }
    });

    if (stack.length !== 1) {
        throw new Error('Invalid expression');
    }

    return stack.pop();
}
