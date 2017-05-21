export const getIndexFromPercent = (percent, maxValue) => {
  const index = parseInt((percent / 100) * maxValue, 10);
  return index;
};

// http://stackoverflow.com/a/6712058
export const sortByTitle = songs => songs.sort((a, b) => {
  let nameA = '';
  let nameB = '';
  if (a.title) {
    nameA = a.title.toLowerCase();
  }
  if (b.title) {
    nameB = b.title.toLowerCase();
  }
  if (nameA < nameB) {
    return -1;
  } else if (nameA > nameB) {
    return 1;
  }
  return 0;
});
