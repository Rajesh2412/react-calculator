import React from 'react';
import { useState } from 'react';
import Button from './components/Button/button';

const App = () => {
    const [calc, setCalc] = useState('');
    const [result, setResult] = useState('');

    const operators = ['+', '-', '*', '/', '(', '%', 'AC'];

    const updateCalc = (val) => {
        if (
            (operators.includes(val) && calc === '') ||
            (operators.includes(val) && operators.includes(calc.slice(-1)))
        ) {
            return;
        }

        setCalc(calc + val)

        if (!operators.includes(val)) {
            try {
                setResult(eval(calc + val).toString());
            } catch (e) {
                return;
            }
        }
    }

    const createDigits = () => {
        const digits = [];

        for (let i = 1; i < 10; i++) {

            digits.push(
                <button onClick={() => updateCalc(i.toString())} key={i}>{i}</button>
            );

            switch (i) {
                case 3:
                    digits.push(
                        <Button handleClick={() => updateCalc('+')} value="+" />
                    )
                    break
                case 6:
                    digits.push(
                        <Button handleClick={() => updateCalc('-')} value="-" />
                    )
                    break

                case 9:
                    digits.push(
                        <Button handleClick={() => updateCalc('×')} value="×" />
                    )
            }
        }

        return digits;
    }

    const calculate = () => {
        if (calc === '') return setCalc('0');

        if (operators.includes(calc.slice(-1))) {
            setCalc('error');
            setResult('error');
        }

        try {
            setCalc(eval(calc).toString());
        } catch (e) {
            return;
        }
    }

    const clearAll = () => {
        if (calc === '') return;
        setCalc('');
        setResult('');
    }


    const clearLast = (val) => {
        if (calc === '') return;

        let temp = val.slice(0, -1)
        setCalc(temp);
        if(operators.includes(temp.slice(-1))){
            setResult('')
        }else{
            setResult(eval(temp))
        }
    
    }

    return (
        <div className="App">
            <div className="calculator">
                {/* <div className="outher-edge"/> */}
                <div className="display">

                    {calc || '0'}
                    <div className="result" >
                        {result ? <span>{result}</span> : ''}
                    </div>
                </div>
                <div className="operators">
                    <Button handleClick={clearAll} value="AC" />
                    <Button handleClick={() => updateCalc('%')} value="%" />
                    <Button handleClick={() => updateCalc('/')} value="/" />
                    <Button handleClick={clearAll} value="C" />
                    {/* <Button _class="clear-btn" handleClick={ clearLast } value=""/> */}
                </div>
                <div className="digits">
                    {createDigits()}
                    <Button handleClick={() => updateCalc('0')} value="0" />
                    <Button handleClick={() => updateCalc('.')} value="." />
                    <Button _class="clear-btn" handleClick={()=> clearLast(calc)} value="⇐" />
                    <Button _class="enter-btn" handleClick={() => calculate()} value="=" />
                </div>
                {/* <div className="outher-edge"/> */}
            </div>
        </div>
    );
}

export default App;
