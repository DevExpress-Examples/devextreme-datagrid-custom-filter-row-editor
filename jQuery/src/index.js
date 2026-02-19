$(() => {
  $('#gridContainer').dxDataGrid({
    dataSource: customers,
    keyExpr: 'ID',
    showBorders: true,
    filterRow: {
      visible: true,
    },
    onOptionChanged(e){
      if(e.fullName === 'columns[3].filterValue' && e.value === null){
        clearDropDownSelection();
      }
    },
    onEditorPreparing: (e) => {
      // Customize boolean filter editor via e.editorName
      if (e.parentType === 'filterRow' && e.dataField === 'IsActive') {
        e.editorName = 'dxCheckBox';
        e.editorOptions = {
          value: e.value,
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
        dataType: 'number',
      },
      {
        dataField: 'CompanyName',
        caption: 'Company Name',
        dataType: 'string',
      },
      {
        dataField: 'IsActive',
        dataType: 'boolean',
        caption: 'Active',
      },
      {
        dataField: 'CategoryId',
        dataType: 'number',
        caption: 'Category',
        calculateDisplayValue: (row) => {
          return categories.find(c => c.id === row.CategoryId)?.name;
        },
      },
    ],
  });


  function clearDropDownSelection(){
    const dropDownComponent = $('#dropDownFilter').dxDropDownBox('instance');
    const treeList = $('#embeddedTreeList').dxTreeList('instance');

    dropDownComponent?.option('value', null);
    dropDownComponent?.close();

    treeList?.clearSelection();
    treeList?.option('expandedRowKeys', []);
  }

  function createCustomEditor(dataGridArgs) {
    return $('<div id="dropDownFilter">').dxDropDownBox({
      value: dataGridArgs.value,
      dataSource: categories,
      valueExpr: 'id',
      displayExpr: 'name',
      buttons: [{
        location: 'after',
        name: 'customClear',
        options: {
          icon: "remove",
          onClick: () => {
            clearDropDownSelection();
            dataGridArgs.setValue(null);   
          }
          }
        }],
      contentTemplate: (dropDownArgs) => {
        return $('<div id="embeddedTreeList">').dxTreeList({
          selectedRowKeys: dropDownArgs.value != null ? [dropDownArgs.value] : [],
          height: "100%",
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
