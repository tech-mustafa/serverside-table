/**
 * Creates Fields Object for DynamicForm using Columns data to create Drawer form
 * @param columns: Object containing columns properties
 * @returns {Array}
 */
const DrawerFields = (columns) => {
  const tempFields = [];
  columns.map((col) => {
    return tempFields.push({
      type: col.fieldType,
      name: col.dataIndex,
      label: col.title,
    });
  });
  return tempFields;
};

export default DrawerFields;
