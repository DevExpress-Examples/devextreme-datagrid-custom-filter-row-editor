import { DropDownBox, Button as DropDownBoxButton } from 'devextreme-react/drop-down-box';
import type { DropDownBoxRef, DropDownBoxTypes } from 'devextreme-react/drop-down-box';
import type { ButtonTypes } from 'devextreme-react/button';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  TreeList,
  Column,
  Selection,
} from 'devextreme-react/tree-list';
import type { TreeListRef, TreeListTypes } from 'devextreme-react/tree-list';
import { categories } from '../data';
import type { CustomEditorProps, NestedTreeListProps } from '../types/CustomEditor.types';


function NestedTreeList({ gridEditorEvent, dropDownArgs, treeListRef }: NestedTreeListProps): JSX.Element {
  const onSelectionChanged = useCallback((treeListArgs: TreeListTypes.SelectionChangedEvent) => {
    const selectedId = treeListArgs.currentSelectedRowKeys[0];
    if (!selectedId) return;
    gridEditorEvent.setValue(selectedId);
    const dropDownBoxInstance = dropDownArgs.component;
    dropDownBoxInstance.option('value', selectedId);
    dropDownBoxInstance.close();
  }, []);

  return (
    <TreeList
      ref={treeListRef}
      dataSource={categories}
      keyExpr="id"
      parentIdExpr="parentId"
      onSelectionChanged={onSelectionChanged}
    >
      <Selection mode="single" />
      <Column dataField="name" />
    </TreeList>
  );
}

export default function CustomEditor({ gridEditorEvent }: CustomEditorProps): JSX.Element {
  const treeListRef = useRef<TreeListRef>(null);
  const dropDownBoxRef = useRef<DropDownBoxRef>(null);
  const [dropDownBoxValue, setDropDownBoxValue] = useState(gridEditorEvent.value);

  const renderTreeList = useCallback((dropDownArgs: DropDownBoxTypes.ContentTemplateData) =>
    <NestedTreeList gridEditorEvent={gridEditorEvent} dropDownArgs={dropDownArgs} treeListRef={treeListRef} />,
  [gridEditorEvent]);

  const clearDropDownSelection = ()=>{
    setDropDownBoxValue(null);
    dropDownBoxRef.current?.instance().close();
    const treeListInstance = treeListRef.current?.instance();
    if(treeListInstance){
      treeListInstance.clearSelection();
      treeListInstance.option('expandedRowKeys', [])
    }
  }

  const dropDownBoxButtonOptions = useMemo<ButtonTypes.Properties>(
    (): ButtonTypes.Properties => ({
      onClick: (e: ButtonTypes.ClickEvent): void => {
        gridEditorEvent.setValue(null);
        clearDropDownSelection();
      },
    }),
    [],
  );

  const syncTreeViewSelection = useCallback((e: DropDownBoxTypes.ValueChangedEvent)=>{
    setDropDownBoxValue(e.value);
    //configure treelist selection?
    // https://js.devexpress.com/React/Demos/WidgetsGallery/Demo/DropDownBox/SingleSelection/FluentBlueLight/
  }, []);

  return (<DropDownBox
      ref={dropDownBoxRef}
      value={dropDownBoxValue}
      onValueChanged={syncTreeViewSelection}
      dataSource={categories}
      valueExpr="id"
      displayExpr="name"
      contentRender={renderTreeList}
    >
       <DropDownBoxButton
          location= 'after'
          name= 'customClear'
          options={dropDownBoxButtonOptions}
        />
    </DropDownBox>
  );
}