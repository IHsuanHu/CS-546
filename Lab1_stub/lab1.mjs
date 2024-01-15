export const questionOne = (arr) => {
  // Implement question 1 here
  let temp = arr.join("");
  console.log(temp)
  let check = ['a', 'e', 'i', 'o', 'u'];
  let count = 0;
  let sumcheck = true; 
  for (let i of temp){
    if (check.includes(i.toLowerCase())){
      count = count +1;
    }
  }
  if (count % 2 === 1){
    sumcheck = false;
  }
  return [count, sumcheck]; //return result
};

export const questionTwo = (obj1, obj2) => {
  // Implement question 2 here
  let num = [];
  let str = [];
  for (let i in obj1){
    if (!(i in obj2)){
      if(Number(i)){
        num.push(i);
      } else{
      str.push(i);
      }
    }
  }
  for (let i in obj2){
    if (!(i in obj1)){
      if(Number(i)){
        num.push(i);
      } else{
      str.push(i);
      }
    }
  }
  num.sort(function (a, b) {  return a - b;  });
  str.sort()
  return num.concat(str); //return result
};

export const questionThree = (arr) => {
  // Implement question 3 here
  let res = {};
  for (let i = 0; i < arr.length; i++){
    let [a, b, c] = arr[i];
    let perimeter = a + b + c;
    let s = perimeter/2;
    let area = Math.sqrt(s * (s-a) * (s-b) * (s-c));
    res[String(i)] = [Number(area.toFixed(2)), perimeter];
    }
  return res; //return result
};

export const questionFour = (string) => {
  // Implement question 4 here
  let res = [];
  let temp = string.split(',');
  for (let i of temp){
    let leng = i.length
    let ele = i.substring(Math.floor(leng/2)) + i.substring(0, Math.floor(leng/2));
    res.push(ele)
  }
  return res; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'I-Hsuan',
  lastName: 'Hu',
  studentId: '20010728'
};
