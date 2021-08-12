import _ from "lodash";

/**
 * Filters List using filter funtion and returns filtered list  
 * @param values: Containing Array of Inputs in Drawer
 * @param filteredData: Array of List
 * @returns {Array}
 */
const LocalFilter = (values, filteredData) => {
    _.map(values, (value, key) => {
      if (value) {
        // eslint-disable-next-line eqeqeq
        const tempData = filteredData.filter((data) => data[key] == value);
        filteredData = [...tempData];
      }
    });
    return filteredData;
  
};

export default LocalFilter;
