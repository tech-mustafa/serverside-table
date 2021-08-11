import _ from "lodash";

const TableFilter = (serverFilter, values, filteredData) => {
  //Local Filter
  if (serverFilter === false) {
    _.map(values, (value, key) => {
      if (value) {
        // eslint-disable-next-line eqeqeq
        const tempData = filteredData.filter((data) => data[key] == value);
        filteredData = [...tempData];
      }
    });
    return filteredData;
  }
  //Server Filter
  else {
    let searchStr = "";
    _.map(values, (value, key) => {
      if (value) {
        searchStr = searchStr + "&" + key + "=" + value.replace(" ", "_");
      }
    });
    return searchStr;
  }
};

export default TableFilter;
