$(() => {
  $('#gridContainer').dxDataGrid({
    dataSource: customers,
    keyExpr: 'ID',
    showBorders: true,
    filterRow: {
      visible: true,
    },
    onEditorPreparing: (e) => {
      // Customize boolean filter editor via e.editorName
      if (e.parentType === 'filterRow' && e.dataField === 'IsActive') {
        e.editorName = 'dxCheckBox';
        e.editorOptions = {
          value: null,
          enableThreeStateBehavior: true,
          onValueChanged(args) {
            e.setValue(args.value ?? null);
          }
        };
      }

      // Customize category filter editor via DOM injection to e.editorElement
      if (e.parentType === 'filterRow' && e.dataField === 'CategoryId') {
        e.cancel = true;
        e.editorElement.append(createCustomEditor(e));
      }
    },
    columns: [
      {
        dataField: 'ID',
        width: 80,
        visible: false,
      },
      {
        dataField: 'CompanyName',
        caption: 'Company Name',
      },
      {
        dataField: 'IsActive',
        caption: 'Active',
        dataType: 'boolean',
      },
      {
        dataField: 'CategoryId',
        caption: 'Category',
        calculateDisplayValue: (row) => {
          return categories.find(c => c.id === row.CategoryId)?.name;
        }
      },
    ],
  });

  function createCustomEditor(dataGridArgs) {
    return $('<div>').dxDropDownBox({
      dataSource: categories,
      valueExpr: 'id',
      displayExpr: 'name',
      contentTemplate: (dropDownArgs) => {
        return $('<div>').dxTreeList({
          dataSource: categories,
          keyExpr: 'id',
          parentIdExpr: 'parentId',
          selection: { mode: 'single' },
          columns: ['name'],
          onSelectionChanged: (treeListArgs) => {
            const selectedId = treeListArgs.currentSelectedRowKeys[0];
            if (!selectedId) return;
            dataGridArgs.setValue(selectedId);
            dropDownArgs.component.option('value', selectedId);
            dropDownArgs.component.close();
          },
        });
      },
    });
  }
});