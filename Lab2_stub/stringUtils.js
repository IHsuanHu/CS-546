/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let emojiCounter = (message) => {
      let res = 0;
      if (typeof message === 'string' && message.trim().length != 0){
            message = message.trim();
            let countemoji = 0;
            for (let i = 0; i < message.length; i++) {
                  if (message[i] === ':') {
                        for (let j = i+1; j < message.length; j++) {
                              if (message[j] === ':' && countemoji != 0){
                                    if (message.substring(i, j+1).split(' ').length !== 1 || message.substring(i, j+1).search(' ')){
                                          break
                                    }
                                    res += 1
                                    countemoji = 0
                                    i = j
                                    break
                              } else if (message[j] === ':' && countemoji == 0){
                                    break
                              } else {
                                    countemoji += 1
                              }
                        }
                  }
            }
      } else {
            throw new Error;
      }
      return res
};

export let sortStockPrices = (lastStocks, currStocks) => {
      if (!typeof lastStocks === 'string' || !typeof currStocks === 'string'){throw new Error}
      if (lastStocks.split(/[|,]/g).length != 6 || currStocks.split(/[|,]/g).length != 6) { throw new Error}
      let dict = Object;
      let last = lastStocks.split(/[|,]/);
      let cur = currStocks.split(/[|,]/);
      for (let i = 0; i < 6; i++){
            if (i % 2 === 1){ 
                  if(!Number(last[i])){throw new Error}
                  else{dict[last[i-1].toUpperCase()] = [Number(last[i])]}}

            if (i % 2 === 0){
                  if(Number(last[i])|| last[i].length > 5 || last[i].match(/[^A-Za-z]/g)){throw new Error}
                  else{dict[last[i].toUpperCase()] = []}}
      }
      for (let j = 0; j < 6; j++){
            if (j % 2 === 0){
                  if(!dict[cur[j].toUpperCase()]) { throw new Error}
            }
            if (j % 2 === 1) {
                  if(!Number(cur[j])) {throw new Error}
                  else{ 
                        dict[cur[j-1].toUpperCase()].push(Number(cur[j]))
                        let change = Number((dict[cur[j-1].toUpperCase()][0] - dict[cur[j-1].toUpperCase()][1]) / dict[cur[j-1].toUpperCase()][0])
                        // let change = Number((dict[cur[j-1].toUpperCase()][1] / dict[cur[j-1].toUpperCase()][0])-1)
                        dict[cur[j-1].toUpperCase()].push(Number((change*100 *-1).toFixed(1)))
                  }
            } 
      }
      let res = []
      for (let k in dict){
            res.push({symbol:k, price:dict[k][1], change:dict[k][2]})
      }
      return res


};

export let mashUp = (string1, string2) => {
      if (!string1 || !string2 || !typeof string1 === 'string' || !typeof string2 === 'string') {throw new Error}
      if (string1.trim().length < 4 || string2.trim().length < 4){ throw new Error}
      string1 = string1.trim()
      string2 = string2.trim()
      let a, b, c, d
      a = string1.substring(0,4)
      b = string1.substring(4)
      c = string2.substring(0,4)
      d = string2.substring(4)
      return c+b+' '+a+d
};
