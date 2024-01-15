
export function nameCheck(name) {
  if (typeof name !== 'string') {throw 'input not a string'}
  name = name.trim()
  if (!/^[a-zA-z0-9\s]*$/.test(name)) {throw 'bad input'}  
  if (name.length === 0) {throw 'empty input'}
  return name
}

export function idCheck(id) {
    if (typeof id !== 'number'){
    if (typeof id === 'string'){id = id.trim()}
    if (typeof Number(id) !== 'number' ) {throw 'not a number'}
    if (!isFinite(id)) {throw 'not a correct id tpye'}}
    return Number(id)
}