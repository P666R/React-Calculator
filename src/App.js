import './App.css';
import { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';

function App() {
  // piece of state for previous input
  const [prevState, setPrevState] = useState('');
  //  piece of state for current input
  const [curState, setCurState] = useState('');
  // piece of state to display the input
  const [input, setInput] = useState('0');
  // piece of state for the operators
  const [operator, setOperator] = useState(null);
  // piece of state for equality operator
  const [total, setTotal] = useState(false);

  const inputNum = (e) => {
    //  check to avoid multiple . as input
    if (curState.includes('.') && e.target.innerText === '.') return;

    // equal operator check
    if (total) {
      setPrevState('');
    }

    // checks for current input, if true concatinate current input state to new input else set new input
    curState
      ? setCurState((cur) => cur + e.target.innerText)
      : setCurState(e.target.innerText);
    setTotal(false);
  };

  // on every current input change set it as displayed input
  useEffect(() => {
    setInput(curState);
  }, [curState]);

  // reset the displayed input on initial render
  useEffect(() => {
    setInput('0');
  }, []);

  // operator functionality for any operator button press
  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (curState === '') return;
    if (prevState !== '') {
      equals();
    } else {
      setPrevState(curState);
      setCurState('');
    }
  };

  // functionality on AC button press
  const reset = (e) => {
    setPrevState('');
    setCurState('');
    setInput('0');
  };

  // functionality on % button press
  const percent = (e) => {
    prevState
      ? setCurState(String((parseFloat(curState) / 100) * prevState))
      : setCurState(String(parseFloat(curState) / 100));
  };

  // functionality on +/- button press
  const minusPlus = (e) => {
    if (curState.charAt(0) === '-') {
      setCurState(curState.substring(1));
    } else {
      setCurState('-' + curState);
    }
  };

  // functionality on = button press
  const equals = (e) => {
    if (e?.target.innerText === '=') {
      setTotal(true);
    }

    // switch statement to perform different maths calculations based on different operators
    let cal;
    switch (operator) {
      case '/':
        cal = String(parseFloat(prevState) / parseFloat(curState));
        break;
      case '*':
        cal = String(parseFloat(prevState) * parseFloat(curState));
        break;
      case '+':
        cal = String(parseFloat(prevState) + parseFloat(curState));
        break;
      case '-':
        cal = String(parseFloat(prevState) - parseFloat(curState));
        break;
      default:
        return;
    }

    // reset display input, current input and set previous input to calculated value
    setInput('');
    setPrevState(cal);
    setCurState('');
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="screen">
          {input !== '' || input === '0' ? (
            <NumericFormat
              value={input}
              displayType={'text'}
              thousandSeparator={true}
            />
          ) : (
            <NumericFormat
              value={prevState}
              displayType={'text'}
              thousandSeparator={true}
            />
          )}
        </div>
        <div className="btn light-gray" onClick={reset}>
          AC
        </div>
        <div className="btn light-gray" onClick={percent}>
          %
        </div>
        <div className="btn light-gray" onClick={minusPlus}>
          +/-
        </div>
        <div className="btn red" onClick={operatorType}>
          /
        </div>
        <div className="btn" onClick={inputNum}>
          7
        </div>
        <div className="btn" onClick={inputNum}>
          8
        </div>
        <div className="btn" onClick={inputNum}>
          9
        </div>
        <div className="btn red" onClick={operatorType}>
          *
        </div>
        <div className="btn" onClick={inputNum}>
          4
        </div>
        <div className="btn" onClick={inputNum}>
          5
        </div>
        <div className="btn" onClick={inputNum}>
          6
        </div>
        <div className="btn red" onClick={operatorType}>
          +
        </div>
        <div className="btn" onClick={inputNum}>
          1
        </div>
        <div className="btn" onClick={inputNum}>
          2
        </div>
        <div className="btn" onClick={inputNum}>
          3
        </div>
        <div className="btn red" onClick={operatorType}>
          -
        </div>
        <div className="btn" onClick={inputNum}>
          0
        </div>
        <div className="btn" onClick={inputNum}>
          .
        </div>
        <div className="btn equal" onClick={equals}>
          =
        </div>
      </div>
    </div>
  );
}

export default App;
