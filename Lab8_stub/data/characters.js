//import axios, md5
import axios from "axios";
import md5 from 'blueimp-md5' //you will need to install this module;
import * as helper from '../helpers.js'
const publickey = 'b6ca386cdff8864d307d294e5b5bcf3d';
const privatekey = '3b566cd1ea65b10b49c71dbdb12787d398924b35';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
// const url = '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

async function getall() {
  const {data} = await axios.get(url)
  return data.data.results
}

export const searchCharacterByName = async (name) => {
  //Function to search the api and return up to 15 characters matching the name param
  name = helper.nameCheck(name)
  let res = baseUrl + '?nameStartsWith=' + name + '&limit=15'
  const url = res + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
  const {data} = await axios.get(url)
  if (data.data.results.length === 0) {throw 404}
  let ans = data.data.results
  return ans
};

export const searchCharacterById = async (id) => {
  //Function to fetch a character from the api matching the id
  id = helper.idCheck(id)
  let res = baseUrl + '/' + id
  const url = res + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
  try{ const {data} = await axios.get(url)
      return data.data.results
  }catch (e) { console.log(e)}
  
};

// console.log(await searchCharacterById(1012295))
// console.log(await searchCharacterByName('spider'))
