//the similar properties in data will be replaced by that of params
export const combineData = (data, params) => {
  //note that the params are not changed directly  because they may be used else where in the function
  const obj = {};
  for (const property in params) {
    obj[property] = params[property];
  }
  return { ...data, ...obj };
};

export const formatCurrentDate = (dt) => {
  const str = new Date().toUTCString().split(" ");
  const today = `${str[2]} ${str[1]} ${str[3]}`;
  return today;
};
