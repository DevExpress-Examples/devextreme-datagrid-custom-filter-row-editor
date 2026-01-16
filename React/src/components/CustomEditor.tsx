import { DropDownBox, From, type DropDownBoxTypes } from 'devextreme-react/drop-down-box';
import { useCallback } from 'react';
import {
  TreeList,
  Column,
  Selection,
} from 'devextreme-react/tree-list';
import type { TreeListTypes } from 'devextreme-react/tree-list';
import { categories } from '../data';
import type { CustomEditorProps, NestedTreeListProps } from '../types/CustomEditor.types';


function NestedTreeList({ gridEditorEvent, dropDownArgs }: NestedTreeListProps): JSX.Element {
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
  const renderTreeList = useCallback((dropDownArgs: DropDownBoxTypes.ContentTemplateData) =>
    <NestedTreeList gridEditorEvent={gridEditorEvent} dropDownArgs={dropDownArgs} />,
  []);

  return (<DropDownBox
      dataSource={categories}
      valueExpr="id"
      displayExpr="name"
      contentRender={renderTreeList}
    />
  );
}