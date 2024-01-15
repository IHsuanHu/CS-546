//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.


export function nameCheck(str) {
    if (!str) {throw 'empty input'}
    if (typeof str !== 'string') {throw 'not a string'}
    if (str.trim().length === 0) {throw 'string with empty input'}
    str = str.trim()
    if (str.length < 2 || str.length >25) {throw 'exceed maximum length'}
    if (!/^[a-zA-Z-]+$/.test(str)) {throw 'contain not characters'}
    return str
}
export function emailCheck(email) {
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

export function passwordCheck(password) {
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

export function roleCheck(role) {
    if (!role) {throw 'empty input'}
    if (typeof role !== 'string') {throw 'not a string'}
    if (role.trim().length === 0) {throw 'string with empty input'}
    role = role.trim().toLowerCase()
    const check = ['user', 'admin']
    if (!check.includes(role)) {throw 'wrong input'}
    return role
}

