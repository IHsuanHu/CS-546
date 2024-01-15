// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is

export function stringCheck (str) {
    if (typeof str !== 'string' || !str) { throw 'not a string'}
    if (str.trim().length == 0) { throw 'empty'}
    return str.trim();
}

export function eventCheck(obj) {
    if (typeof obj !== 'object'){ throw 'not a object'}
    if (Array.isArray(obj)){ throw 'not a object'}
    const states = ['AL', 'AK', 'AZ', 'AR', 'AS', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI', 
    'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
    'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 
    'TT', 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI', 'WY']
    let {streetAddress, city, state, zip} = obj
    streetAddress = stringCheck(streetAddress)
    city = stringCheck(city)
    state = stringCheck(state)
    zip = stringCheck(zip)
    if (streetAddress.length <3 || city.length <3) {throw 'wrong format in loaction'}
    if (state.length !== 2 || !states.includes(state.toUpperCase())) {throw 'state fromat wrong'}
    if (!zip.match(/^\d{5}$/)) {throw 'zip wrong'}
    let newobj = Object();
    newobj['streetAddress'] = streetAddress
    newobj['city'] = city
    newobj['state'] = state.toUpperCase()
    newobj['zip'] = zip
  
    return newobj
  }

export function numberCheck(num) {
    if (typeof Number(num) !== 'number') {throw 'not a number'}
    if (!isFinite(num)) {throw 'not correct number'}
    return Number(num);
  }

export function emailvalidation(email) {
    let check = email.split('@');
    if (check.length != 2){throw 'email not correct'}
    if (!check[0][0].match(/[0-9A-Za-z]/) || !check[0][check[0].length-1].match(/[0-9A-Za-z]/)){ throw 'wrong format'};
    if (!check[0][0].match(/[0-9A-Za-z]/) || !check[0][check[0].length-1].match(/[0-9A-Za-z]/)){throw 'wrong format'};
    for (let i = 0; i < check[0].length; i++) {
      if (!check[0][i].match(/[0-9A-Za-z_.-]/)){throw 'wrong format'}
      // if (check[0][i].match(/[.-_]/) && !check[0][i-1].match(/[0-9A-Za-z]/)) {throw new Error('wrong format')};
      if (i > 0 && check[0][i].match(/[.-_]/) && !check[0][i-1].match(/[0-9A-Za-z]/)) { throw 'wrong format';}}
      
    if (!check[1][0].match(/[0-9A-Za-z]/)) {throw 'wrong format'};
    for (let j = 0; j < check[1].length; j++){
      if (!check[1][j].match(/[0-9A-Za-z-.]/)){throw 'wrong format'}
      if (j > 0 && check[1][j].includes('.') && !check[1][j-1].match(/[0-9A-Za-z]/)) {throw 'wrong format'};
    }
    let domain = check[1].split('.')
    if (domain.length < 2 || domain[domain.length-1].length < 2) {throw 'wrong format'}
  }

export function datevalidation(date){
    if (date.split('/').length !== 3) {throw 'wrong format'}
    let [month, day, year] = date.split('/');
    if (month.length != 2) {throw 'wrong month format'}
    if (day.length != 2) {throw 'wrong day format'}
    if (year.length != 4) {throw 'wrong year format'}
    month = numberCheck(month)
    day = numberCheck(day)
    year = numberCheck(year)
    if (!numberInRange(month, 1, 12)) {throw 'wrong month'}
    if ([1,3,5,7,8,10,12].includes(month) && !numberInRange(day, 1, 31)) {throw 'wrong date'}
      else if ([4,6,9,11].includes(month) && !numberInRange(day, 1, 30)) {throw 'wrong date'}
      else if (month == 2 && !numberInRange(day, 1, 28)) {throw 'wrong date'}
   
    var currentdate = new Date(); 
    if (year < currentdate.getFullYear()) {throw 'wrong year'}
    if (year === currentdate.getFullYear() && month < (currentdate.getMonth()+1)) {throw 'wrong month'}
    if (year === currentdate.getFullYear() && month === (currentdate.getMonth()+1) && day <= currentdate.getDate()) {
      throw 'wrong date'}
  }

export function numberInRange (x, min, max) {
    return (x-min) * (x-max) <= 0
  }

export function timevalidation(startTime, endTime){
    startTime = stringCheck(startTime);
    endTime = stringCheck(endTime);
    let countStart = 0
    let countEnd = 0
    const symble = ['AM', 'PM']
    if (startTime.split(' ').length === 1 || !symble.includes(startTime.split(' ')[1])){ throw 'wrong format'}
    else if(startTime.split(' ')[1] === 'PM') { countStart = 12*60}
    if (endTime.split(' ').length === 1 || !symble.includes(endTime.split(' ')[1])){ throw 'wrong format'}
    else if(endTime.split(' ')[1] === 'PM') { countEnd = 12*60}
    let startmin = startTime.split(' ')[0].split(':')
    let endmin = endTime.split(' ')[0].split(':')
    if (startmin.length !== 2 || endmin.length !== 2) {throw 'wrong format'}

    if (!numberInRange(numberCheck(startmin[0]), 1, 12) || startmin[0][0] === '0') {throw 'wrong hour'}
    else { if (numberCheck(startmin[0]) !== 12 ){ countStart += numberCheck(startmin[0]) * 60}}
    if (!numberInRange(numberCheck(endmin[0]), 1, 12) || endmin[0][0] === '0') {throw 'wrong hour'}
    else { if (numberCheck(endmin[0]) !== 12 ){ countEnd += numberCheck(endmin[0]) * 60}}

    if (!numberInRange(numberCheck(startmin[1]), 0, 59)) {throw 'wrong hour'}
    else {countStart += numberCheck(startmin[1])}
    if (!numberInRange(numberCheck(endmin[1]), 0, 59)) {throw 'wrong hour'}
    else {countEnd += numberCheck(endmin[1])}

    if (( countEnd - countStart ) < 30) {throw 'starttime not enough'}
  
  }

 