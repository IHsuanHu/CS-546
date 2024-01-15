//Here is where you will do all of the logic and processing for the palindrome and prime checking.

// let frmLabel = document.getElementById('formLabel');
function readInput() {
    let myForm = document.getElementById('myForm');
    if (myForm) {
        let textInput = document.getElementById('palindrome_input');
        let errorDiv = document.getElementById('error');
        let myUl = document.getElementById('palindromes');
        event.preventDefault();
        let res = []
        try{
            if (typeof textInput.value !== 'string') { throw 'not a string'}
            if (textInput.value.trim().length == 0) { throw 'empty input'}
            let text = textInput.value.replace(/[^a-zA-Z0-9,]/g, '').split(',')
            for (let i of text){
                let tmp = palindrome(i.trim())
                res.push(tmp)
            }
            let prime = primeCheck(res.length)
            errorDiv.hidden = true;
            let li = document.createElement('li');
            li.innerHTML = '[' +res+ ']';
            if (prime == true) {li.className = 'prime'}
            else {li.className = 'not-prime'}
            myUl.appendChild(li);
            myForm.reset();
            textInput.focus();

        } catch (e) {
            errorDiv.hidden = false;
            errorDiv.innerHTML = e;
            // myForm.reset();
            textInput.focus();
          }
      }
}


function palindrome(input) {
    if (typeof input !== 'string') { throw 'not a sting'}
    input = input.toLowerCase().trim();
    if (input.length === 0) { throw 'Empty input'}
    let ans = input.split('')
    ans = ans.reverse().join('')
    if (input == ans) { return true}
    else {return false}
}

function primeCheck(number) {
    if (typeof number !=='number') { throw 'wrong input type'}
    if (number <= 0) { throw 'out of bound'}
    if (number == 1) {return false}
    let top = Math.floor(Math.sqrt(number))
    if (top === 1) {return true}
    for (let i = 2; i < top+1; i++) {
        if (number % i === 0) { return false}
    }
    return true
}
