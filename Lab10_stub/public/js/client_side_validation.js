// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

function loginInput() {
    let login = document.getElementById('login');
    if (login) {
        let email = document.getElementById('emailAddressInput');
        let password = document.getElementById('passwordInput');
        let errorDiv = document.getElementById('error');
        try{
            email = emailCheck(email.value)
            password = passwordCheck(password.value)
        } catch (e) {
            errorDiv.hidden = false;
            errorDiv.innerHTML = e;
            
          }
      }
}

function registerInput() {
    let register = document.getElementById('register')
    if (register) {
        let firstName = document.getElementById('firstNameInput')
        let lastName = document.getElementById('lastNameInput')
        let emailAddress = document.getElementById('emailAddressInput')
        let password = document.getElementById('passwordInput')
        let confirmPassword = document.getElementById('confirmPasswordInput')
        let role = document.getElementById('roleInput')
        let errorDiv = document.getElementById('error');
        try{
            firstName = nameCheck(firstName.value)
            lastName = nameCheck(lastName.value)
            emailAddress = emailCheck(emailAddress.value)
            password = passwordCheck(password.value)
            confirmPassword = passwordCheck(confirmPassword.value)
            role = roleCheck(role.value)
            if (password !== confirmPassword) {throw 'password not equal'}
            
        } catch (e) {
            errorDiv.hidden = false
            errorDiv.innerHTML = e
            
        }
    }
}


function nameCheck(str) {
    if (!str) {throw 'empty input'}
    if (typeof str !== 'string') {throw 'not a string'}
    if (str.trim().length === 0) {throw 'string with empty input'}
    str = str.trim()
    if (str.length < 2 || str.length >25) {throw 'exceed maximum length'}
    if (!/^[a-zA-Z-]+$/.test(str)) {throw 'contain not characters'}
    return str
}
function emailCheck(email) {
    if (!email) {throw 'empty input'}
    if (typeof email !== 'string') {throw 'not a string'}
    if (email.trim().length === 0) {throw 'string with empty input'}
    email = email.trim()
    let check = email.split('@');
    if (check.length != 2 || check[0].length === 0 || check[1].length === 0){throw 'email not correct'}
    if (!check[0][0].match(/[0-9A-Za-z]/) || !check[0][check[0].length-1].match(/[0-9A-Za-z]/)){ throw 'wrong format'};
    if (!check[0][0].match(/[0-9A-Za-z]/) || !check[0][check[0].length-1].match(/[0-9A-Za-z]/)){throw 'wrong format'};
    for (let i = 0; i < check[0].length; i++) {
      if (!check[0][i].match(/[0-9A-Za-z_.-]/)){throw 'wrong format'}
      if (i > 0 && check[0][i].match(/[.-_]/) && !check[0][i-1].match(/[0-9A-Za-z]/)) { throw 'wrong format';}}
      
    if (!check[1][0].match(/[0-9A-Za-z]/)) {throw 'wrong format'};
    for (let j = 0; j < check[1].length; j++){
      if (!check[1][j].match(/[0-9A-Za-z-.]/)){throw 'wrong format'}
      if (j > 0 && check[1][j].includes('.') && !check[1][j-1].match(/[0-9A-Za-z]/)) {throw 'wrong format'};
    }
    let domain = check[1].split('.')
    if (domain.length < 2 || domain[domain.length-1].length < 2) {throw 'wrong format'}
    return check[0].toLowerCase() + '@' + check[1].toLowerCase()
}

function passwordCheck(password) {
    if (!password) {throw 'empty input'}
    if (typeof password !== 'string') {throw 'not a string'}
    if (password.trim().length === 0) {throw 'string with empty input'}
    password = password.trim()
    if (password.split(' ').length > 1) {throw 'wrong format'}
    if (password.length < 8 ) { throw 'password too short'}
    if (!/[A-Z]/.test(password)) {throw 'no uppercase'}
    if (!/[0-9]/.test(password)) {throw 'no number'}
    if (/^[a-zA-Z0-9]+$/.test(password)) {throw 'no special character'}
    return password

}

function roleCheck(role) {
    if (!role) {throw 'empty input'}
    if (typeof role !== 'string') {throw 'not a string'}
    if (role.trim().length === 0) {throw 'string with empty input'}
    role = role.trim().toLowerCase()
    const check = ['user', 'admin']
    if (!check.includes(role)) {throw 'wrong input'}
    return role
}