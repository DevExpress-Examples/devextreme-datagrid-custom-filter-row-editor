import type { DropDownBoxTypes } from 'devextreme-react/drop-down-box';
import type { DataGridTypes } from 'devextreme-react/data-grid';

export interface CustomEditorProps {
  gridEditorEvent: DataGridTypes.EditorPreparingEvent;
}

export interface NestedTreeListProps {
  gridEditorEvent: DataGridTypes.EditorPreparingEvent;
  dropDownArgs: DropDownBoxTypes.ContentTemplateData;
}
