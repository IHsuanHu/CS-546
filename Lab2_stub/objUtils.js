/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let solvePuzzles = (puzzles, pieces) => {
      if (!puzzles || !Array.isArray(puzzles) || puzzles.length == 0) {throw new Error}
      if (!pieces || !typeof pieces === 'object' || pieces == null || Object.keys(pieces).length < 1) {throw new Error}
      if (puzzles.length == 1 && Object.keys(puzzles[0]).length == 0) { throw 'empty puzzle'}
      for (let l of puzzles) {
            if (typeof l  === 'string' || Array.isArray(l)) { throw new Error} }
      for (let i of puzzles){
            if(typeof i === 'object'){
                  for (let j in pieces){
                        if (j.match(/[a-e]/)){
                              if (!i[j.trim()]){ i[j.trim()] = pieces[j] }
                        }else {throw new Error}}
            } else {throw new Error}}
      let res = []
      for (let j of puzzles){
            let keys = Object.keys(j).sort()
            let temp = Object()
            for (let k of keys){
                  if (k.trim().match(/[a-e]/)) {temp[k.trim()] = j[k.trim()]}
                  else { throw 'no match key'}}
                  
            res.push(temp)
      }
      return res
};

export let evaluatePokerHand = (hand, communityCards) => {
      if (!hand || !communityCards || !Array.isArray(hand) || !Array.isArray(communityCards)
            || hand.length !== 2 || communityCards.length > 5 || communityCards.length < 3) { throw new Error}
      let values = ['2','3','4','5','6','7','8','9','10','J', 'Q', 'K','A']
      let suits = ['hearts','clubs','diamonds','spades']
      let collectvalue = Object()
      let collectsuit = Object()
      let all = hand.concat(communityCards)
      for (let i of all) {
            if (!suits.includes(i.suit) || !values.includes(i.value)){
                  throw new Error
            } else { 
                  if (collectsuit[i.suit] && collectsuit[i.suit].includes(i.value)) { throw new Error}
                  else{
                        if (!collectsuit[i.suit]) {collectsuit[i.suit] = [i.value]} 
                        else {collectsuit[i.suit].push(i.value)}}
            collectvalue[i['value']] = collectvalue[i['value']] +1 || 1}}
      for (let j in collectsuit){
            if (collectsuit[j].length >= 5){
                  let temp  = []
                  for (let k of collectsuit[j]) {  temp.push(values.indexOf(k))}
                  temp.sort(function (a, b) {  return a - b;  })
                  if ( (temp[4]-temp[0]) || (temp[5]-temp[1]) || (temp[6]-temp[2]) == 4) { return "Straight Flush"}
                  if (temp[0] == 0 && temp[3] == 3 && temp[temp.length-1] == 12){ return "Straight Flush" }
            }}
      let ans = Object.values(collectvalue).sort()
      if (ans[ans.length-1] == 3){return "Three of a Kind" } 
      else if (ans[ans.length-1] == 2) {return "Pair" } 
      else { return "High Card" }      
};

export let combineObjects = (arr) => {
      if (!Array.isArray(arr) || arr.length < 2){ throw new Error}
      let count = Object()
      for (let i of arr) {
            if (!typeof i === 'object' || Array.isArray(i)) { throw new Error}
            if (Object.keys(i).length === 0) { throw new Error}
            for (let j in i){
                  count[j] = (count[j] || 0) +1}}
      let res = Object()
      for (let j in count){
            if (count[j] == arr.length) {
                  for (let k = 0; k < arr.length; k++){
                        if (k == 0){
                              if ( typeof arr[k][j] === 'string'){
                                    res[j] = [arr[k][j].trim()]      
                              } else{
                              res[j] = [arr[k][j]]}
                        }else{ 
                              if ( typeof arr[k][j] === 'string'){
                                    res[j].push(arr[k][j].trim())
                              } else{
                              res[j].push(arr[k][j]) }}
      }}}
      return res
};

try{
      console.log(solvePuzzles([{ a: 3, b: 4, f: 5 }], { a: 3, b: 4, c: 5, d: 6, e: 7 }))
      }catch(e){ console.log(e)}