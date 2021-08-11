const TableSorter = (sorter, sort) => {
  if (sorter.order === "ascend") {
    //for ascend sort
    sort = "&sort=+" + sorter.field;
  } else if (sorter.order === "descend") {
    //for descend sort
    sort = "&sort=-" + sorter.field;
  } else {
    //for clear sort
    sort = "";
  }
  return sort;
};

export default TableSorter;
