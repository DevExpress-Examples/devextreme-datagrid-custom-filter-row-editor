import type { DropDownBoxTypes } from 'devextreme-react/drop-down-box';
import type { DataGridTypes } from 'devextreme-react/data-grid';
import type { TreeListRef } from 'devextreme-react/tree-list';

export interface CustomEditorProps {
  gridEditorEvent: DataGridTypes.EditorPreparingEvent;
}

export interface NestedTreeListProps {
  gridEditorEvent: DataGridTypes.EditorPreparingEvent;
  dropDownArgs: DropDownBoxTypes.ContentTemplateData;
  treeListRef: React.RefObject<TreeListRef>;
}
