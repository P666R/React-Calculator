import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import './App.css';

function Calculator() {
  // state variables for the calculator's result, operands, operator, and decimal input
  const [result, setResult] = useState('0');
  const [operand1, setOperand1] = useState('');
  const [operator, setOperator] = useState('');
  const [operand2, setOperand2] = useState('');
  const [decimal, setDecimal] = useState(false);

  // function to handle clicks on number buttons
  const handleNumberClick = (num) => {
    if (operator) {
      // if there's already an operator, update the second operand
      if (operand2.length < 8) {
        // limit digits to 8
        setOperand2(operand2 + num);
        setResult(operand2 + num);
      }
    } else {
      // otherwise, update the first operand
      if (operand1.length < 8) {
        // limit digits to 8
        setOperand1(operand1 + num);
        setResult(operand1 + num);
      }
    }
  };

  // function to handle clicks on operator buttons
  const handleOperatorClick = (op) => {
    if (!operator) {
      // if there's no current operator, set the operator and update the result
      setOperator(op);
      setResult(op);
      // reset decimal flag
      setDecimal(false);
    }
  };

  // function to handle clicks on the equals button
  const handleEqualsClick = () => {
    let num1 = parseFloat(operand1);
    let num2 = parseFloat(operand2);
    let res;
    switch (operator) {
      case '+':
        res = num1 + num2;
        break;
      case '-':
        res = num1 - num2;
        break;
      case '*':
        res = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          // prevent division by zero
          setResult('Error');
          setOperand1('');
          setOperator('');
          setOperand2('');
          setDecimal(false);
          return;
        }
        res = num1 / num2;
        break;
      default:
        res = '';
        break;
    }
    if (res.toString().length > 8) {
      // limit digits to 8
      res = res.toPrecision(8);
    }
    // update the result and reset the operands, operator, and decimal flag
    setResult(res);
    setOperand1(res);
    setOperator('');
    setOperand2('');
    setDecimal(false);
  };

  // function to handle clicks on the clear button
  const handleClearClick = () => {
    // reset all state variables
    setResult('0');
    setOperand1('');
    setOperator('');
    setOperand2('');
    setDecimal(false);
  };

  // function to handle clicks on the +/- button
  const handleSignChangeClick = () => {
    if (operator) {
      // if there's already an operator, negate the second operand and update the result
      setOperand2((parseFloat(operand2) * -1).toString());
      setResult((parseFloat(operand2) * -1).toString());
    } else {
      // otherwise, negate the first operand and update the result
      setOperand1((parseFloat(operand1) * -1).toString());
      setResult((parseFloat(operand1) * -1).toString());
    }
  };

  // function to handle clicks on the % button
  const handlePercentageClick = () => {
    if (operator) {
      setOperand2((parseFloat(operand2) / 100).toString());
      setResult((parseFloat(operand2) / 100).toString());
    } else {
      setOperand1((parseFloat(operand1) / 100).toString());
      setResult((parseFloat(operand1) / 100).toString());
    }
  };

  // function to handle clicks on the . button
  const handleDecimalClick = () => {
    if (!decimal) {
      if (operator) {
        setOperand2(operand2 + '.');
        setResult(operand2 + '.');
      } else {
        setOperand1(operand1 + '.');
        setResult(operand1 + '.');
      }
      setDecimal(true);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="screen">
          {result !== '' || result === '0' ? (
            <NumericFormat
              value={result}
              displayType={'text'}
              thousandSeparator={true}
            />
          ) : (
            <NumericFormat
              value={operand1}
              displayType={'text'}
              thousandSeparator={true}
            />
          )}
        </div>

        <div className="btn light-gray" onClick={() => handleClearClick()}>
          AC
        </div>
        <div className="btn light-gray" onClick={() => handleSignChangeClick()}>
          +/-
        </div>
        <div className="btn light-gray" onClick={() => handlePercentageClick()}>
          %
        </div>
        <div className="btn red" onClick={() => handleOperatorClick('/')}>
          /
        </div>

        <div className="btn" onClick={() => handleNumberClick('7')}>
          7
        </div>
        <div className="btn" onClick={() => handleNumberClick('8')}>
          8
        </div>
        <div className="btn" onClick={() => handleNumberClick('9')}>
          9
        </div>
        <div className="btn red" onClick={() => handleOperatorClick('*')}>
          *
        </div>

        <div className="btn" onClick={() => handleNumberClick('4')}>
          4
        </div>
        <div className="btn" onClick={() => handleNumberClick('5')}>
          5
        </div>
        <div className="btn" onClick={() => handleNumberClick('6')}>
          6
        </div>
        <div className="btn red" onClick={() => handleOperatorClick('-')}>
          -
        </div>

        <div className="btn" onClick={() => handleNumberClick('1')}>
          1
        </div>
        <div className="btn" onClick={() => handleNumberClick('2')}>
          2
        </div>
        <div className="btn" onClick={() => handleNumberClick('3')}>
          3
        </div>
        <div className="btn red" onClick={() => handleOperatorClick('+')}>
          +
        </div>

        <div className="btn" onClick={() => handleNumberClick('0')}>
          0
        </div>
        <div className="btn" onClick={() => handleDecimalClick()}>
          .
        </div>
        <div className="btn equal" onClick={() => handleEqualsClick()}>
          =
        </div>
      </div>
    </div>
  );
}

export default Calculator;
