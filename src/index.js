function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(str) {
    if (str.length === 0) return 0
   
    let str1 = str.trim()
    
    let arr = []
    if (str1.includes(' ')) arr = str1.split(' ')
    else arr = str1.split('')
    const arrBrackets = []
    const arrCheck = []

// Check brackets-------------------------

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '(' || arr[i] === ')') arrBrackets.push(arr[i])
        
        if (arrBrackets[0] === ')') throw new Error('ExpressionError: Brackets must be paired')
    }

    if (arrBrackets.length % 2 === 1) throw new Error('ExpressionError: Brackets must be paired')
    
    if (arrBrackets.length !== 0) { 
     
   	arrCheck.push(arrBrackets[0])

    	for (let i = 1; i < arrBrackets.length; i++) {
        
        	if (arrCheck[arrCheck.length - 1] === arrBrackets[i]) arrCheck.push(arrBrackets[i])
        	else arrCheck.pop()

    	}

	if (arrCheck.length !== 0) throw new Error('ExpressionError: Brackets must be paired')

    }

    
    
    // Calc---------------------------------
    
    function calc(a, op, b) {
        if (isNaN(a) || isNaN(a)) throw new Error('ExpressionError: Brackets must be paired')
        
        if (op === '*') return (+a * +b)
        if (op === '/') {
            if (+b === 0) throw new Error('TypeError: Division by zero.')
            return (+a / +b) 
        }
        if (op === '+') return (+a + +b)
        if (op === '-') return (+a - +b)
    }
    
    function megaCalc(arr1) {

        for (let i = 0; i < arr1.length - 1; i++) {
            
            if (arr1[i] === '*' || arr1[i] ==='/') {
                arr1[i + 1] = calc(arr1[i - 1], arr1[i], arr1[i + 1])
                arr1[i - 1] = ''
                arr1[i] = ''
            }
        }

        let arrTemp = []

        for (let i = 0; i < arr1.length; i++) {
            if(arr1[i] !== '') arrTemp.push(arr1[i])
        }

        arr1 = arrTemp.slice();
        arrTemp.length = 0;

        for(let i = 0; i < arr1.length - 1; i++) {
            
            if (arr1[i] === '+' || arr1[i] ==='-') {
                arr1[i + 1] = calc(arr1[i - 1], arr1[i], arr1[i + 1])
                arr1[i - 1] = ''
                arr1[i] = ''
            }
        }

        for (let i = 0; i < arr1.length; i++) {
            if(arr1[i] !== '') arrTemp.push(arr1[i])
        }

        arr1 = arrTemp.slice();
        arrTemp.length = 0;

        return arr1
    }

    // console.log(megaCalc(arr));

        ///Brackets------------------------

        function result(array) {
            let a = -1;
            let b = -1;
            let arrTemp1 = []
            for (let i = 0; i < array.length; i++) {
                if (array[i] === '(') a = i
                if (array[i] === ')') {
                    b = i
                    for (let j = a + 1; j < i; j++) {
                        arrTemp1.push(array[j])
                    }
                    // console.log(`gegaCalc(arrTemp1) = ${megaCalc(arrTemp1)}`);

                    array.splice(a, i - a + 1, megaCalc(arrTemp1))
                    arrTemp1 = []
                    i = -1;
                    a = -1
                    b = -1
                }
            }

            return megaCalc(array);

        }

    // console.log(result(arr)[0].toFixed(4));
    
    return +result(arr)[0].toFixed(4)
}

module.exports = {
    expressionCalculator
}