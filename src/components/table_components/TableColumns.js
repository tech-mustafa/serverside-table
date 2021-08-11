const TableColumns = (columns, sorter) => {
  const tempColumns = [];
  columns.map((col, i) => {
    if (col.sorter && sorter) {
      //checks if sorter value is true
      return tempColumns.push({
        title: col.title,
        dataIndex: col.dataIndex,
        fieldType: col.fieldType,
        sorter:
          col.fieldType === "number"
            ? (a, b) => a[col.dataIndex] - b[col.dataIndex]
            : (a, b) => a[col.dataIndex].length - b[col.dataIndex].length,
      });
    } else {
      //checks if sorter value is false
      return tempColumns.push({
        title: col.title,
        dataIndex: col.dataIndex,
        fieldType: col.fieldType,
      });
    }
  });
  return tempColumns;
};

export default TableColumns;
