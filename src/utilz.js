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

/*//use for marks
export function getStartEndOfWeek() {
  let curr = new Date(); // get current date
  let month = curr.getDate();
  let day = curr.getDay();

  let first = month - day + 1; // First day is the day of the month - the day of the week
  let last = first + 11; // last day is the first day + 11 (For the next week)

  let firstday = new Date(curr.setDate(first));
  let lastday = new Date(curr.setDate(last));

  return [
    JSON.stringify(firstday).substring(1, 11),
    JSON.stringify(lastday).substring(1, 11),
  ];
}*/

//use for marks
function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

export function getLastWeek() {
  let curr = new Date(); // get current date
  let curr2 = new Date();

  let lastWeek = new Date(curr2.setDate(curr.getDate() - 7));
  let nextWeek = new Date(curr.setDate(curr.getDate() + 11));

  return [
    JSON.stringify(getMonday(lastWeek)).substring(1, 11),
    JSON.stringify(nextWeek).substring(1, 11),
  ];
}

export function getLastMonth() {
  let curr = new Date(); // get current date for last month
  let curr2 = new Date(); // get current date for next week

  let lastMonth = curr.setMonth(curr.getMonth() - 1);
  let nextWeek = new Date(curr2.setDate(curr2.getDate() + 11));

  return [
    JSON.stringify(getMonday(lastMonth)).substring(1, 11),
    JSON.stringify(nextWeek).substring(1, 11),
  ];
}

export function getLastTwoMonths() {
  let curr = new Date(); // get current date for last month
  let curr2 = new Date(); // get current date for next week

  let lastMonth = curr.setMonth(curr.getMonth() - 2);
  let nextWeek = new Date(curr2.setDate(curr2.getDate() + 11));

  console.log(
    JSON.stringify(getMonday(lastMonth)).substring(1, 11),
    JSON.stringify(nextWeek).substring(1, 11),
  );

  return [
    JSON.stringify(getMonday(lastMonth)).substring(1, 11),
    JSON.stringify(nextWeek).substring(1, 11),
  ];
}

export function shadeColor(color, amount) {
  if ('#fff' === color) {
    color = '#ffffff';
  }
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, (color) =>
        (
          '0' +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2),
      )
  );
}
