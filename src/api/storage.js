const ls =  {
  get(key){ //null or string
    return localStorage.getItem(key);
  },
  set(key, value){  //always return true
    localStorage.setItem(key,value);
    return true;
  },
  delete(key){  //always return true
    localStorage.removeItem(key);
    return true;
  },
  clear(){  //always return true
    localStorage.clear();
    return true;
  },
};

export default ls;