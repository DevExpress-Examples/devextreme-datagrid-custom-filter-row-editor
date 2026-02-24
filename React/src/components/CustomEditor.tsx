import { DropDownBox, Button as DropDownBoxButton } from 'devextreme-react/drop-down-box';
import type { DropDownBoxRef, DropDownBoxTypes } from 'devextreme-react/drop-down-box';
import type { ButtonTypes } from 'devextreme-react/button';
import {
  forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState, useEffect,
} from 'react';
import {
  TreeList,
  Column,
  Selection,
} from 'devextreme-react/tree-list';
import type { TreeListRef, TreeListTypes } from 'devextreme-react/tree-list';
import { categories } from '../data';
import type { CustomEditorProps, NestedTreeListProps, CustomEditorHandle } from '../types/CustomEditor.types';

function NestedTreeList({
  gridEditorEvent, dropDownArgs, treeListRef, value,
}: NestedTreeListProps): JSX.Element {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>(dropDownArgs?.value != null ? [dropDownArgs.value] : []);

  useEffect(() => {
    setSelectedRowKeys(value != null ? [value] : []);
  }, [value]);

  const onSelectionChanged = useCallback((treeListArgs: TreeListTypes.SelectionChangedEvent) => {
    const selectedId = treeListArgs.currentSelectedRowKeys[0];
    if (!selectedId) return;
    const dropDownBoxInstance = dropDownArgs?.component;
    dropDownBoxInstance?.option('value', selectedId);
    dropDownBoxInstance?.close();
    gridEditorEvent.setValue(selectedId);
    setSelectedRowKeys([selectedId]);
  }, [dropDownArgs, gridEditorEvent]);

  return (
    <TreeList
      height="100%"
      selectedRowKeys={selectedRowKeys}
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

const CustomEditor = forwardRef<CustomEditorHandle, CustomEditorProps>(
  (({ gridEditorEvent }: CustomEditorProps, ref): JSX.Element => {
    const treeListRef = useRef<TreeListRef>(null);
    const dropDownBoxRef = useRef<DropDownBoxRef>(null);
    const [dropDownBoxValue, setDropDownBoxValue] = useState<number | null>(gridEditorEvent.value);

    const clearDropDownSelection = useCallback(() => {
      setDropDownBoxValue(null);
      dropDownBoxRef.current?.instance().close();
    }, []);

    useImperativeHandle(ref, () => ({
      clearDropDownSelection,
    }), [clearDropDownSelection]);

    const renderTreeList = useCallback(
      (dropDownArgs: DropDownBoxTypes.ContentTemplateData) => <NestedTreeList gridEditorEvent={gridEditorEvent} dropDownArgs={dropDownArgs} treeListRef={treeListRef} value={dropDownBoxValue} />,
      [gridEditorEvent, dropDownBoxValue],
    );

    const dropDownBoxButtonOptions = useMemo<ButtonTypes.Properties>(
      (): ButtonTypes.Properties => ({
        icon: 'remove',
        onClick: (): void => {
          gridEditorEvent.setValue(null);
          clearDropDownSelection();
        },
      }),
      [gridEditorEvent, clearDropDownSelection],
    );

    const dropDownBoxValueChanged = useCallback((e: DropDownBoxTypes.ValueChangedEvent) => {
      setDropDownBoxValue(e.value);
    }, []);

    return (<DropDownBox
      ref={dropDownBoxRef}
      value={dropDownBoxValue}
      onValueChanged={dropDownBoxValueChanged}
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
  }),
);

CustomEditor.displayName = 'CustomEditor';
export default CustomEditor;
