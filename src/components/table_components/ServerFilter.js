import _ from "lodash";

/**
 * Creates String of keys and values which'll be passed in APIendpoint to fetch Filtered Data
 * @param values: Containing Array of Inputs in Drawer
 * @returns {String}
 */
const ServerFilter = (values) => {
  let searchStr = "";
  _.map(values, (value, key) => {
    if (value) {
      searchStr = searchStr + "&" + key + "=" + value.replace(" ", "_");
    }
  });
  return searchStr;
};

export default ServerFilter;
