/**
 * Creates String of column name with '+' / '-' indicating order which'll be passed in APIendpoint to fetch Sorted Data
 * @param sorter: Contains array of objects of antd table's sorter
 * @param sort: String to be passed inn APIendpoint to fetch Sorted data
 * @returns {String}
 */
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
