// Use in CalendarStack
export const getDate = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  return [yyyy, mm, dd];
};

//Use in homewroks
export const editTime = (time) => {
  const month = time.substring(6, 7);
  const day = time.substring(8, 10);
  const nameOfDay = new Date(time).toString().split(' ')[0];

  return nameOfDay + ' ' + day + '.' + month;
};

export const test = (arr) => {};
