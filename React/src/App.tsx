import { createRoot } from 'react-dom/client';
import { useRef, useCallback } from 'react';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import './App.css';
import DataGrid, {
  Column,
  FilterRow,
} from 'devextreme-react/data-grid';
import { type DataGridTypes, type DataGridRef } from 'devextreme-react/data-grid';
import { type CheckBoxTypes } from 'devextreme-react/check-box';
import { customers, categories, type Customer } from './data';
import CustomEditor from './components/CustomEditor.tsx';
import type { CustomEditorHandle } from './types/CustomEditor.types';

function App(): JSX.Element {
  const dataGrid = useRef<DataGridRef | null>(null);
  const customEditorRef = useRef<CustomEditorHandle | null>(null);
  const onEditorPreparing = useCallback((e: DataGridTypes.EditorPreparingEvent) => {
    // Customize boolean filter editor via e.editorName
    if (e.parentType === 'filterRow' && e.dataField === 'IsActive') {
      e.editorName = 'dxCheckBox';
      e.editorOptions = {
        value: e.value,
        enableThreeStateBehavior: true,
        onValueChanged(args: CheckBoxTypes.ValueChangedEvent) {
          e.setValue(args.value ?? null);
        },
      };
    }

    // Customize category filter editor via component prop
    if (e.parentType === 'filterRow' && e.dataField === 'CategoryId') {
      e.cancel = true;
      createRoot(e.editorElement).render(<CustomEditor gridEditorEvent={e} ref={customEditorRef} />);
    }
  }, []);

  const onOptionChanged = useCallback((e: DataGridTypes.OptionChangedEvent) => {
    if (e.fullName === 'columns[3].filterValue' && e.value === null) {
      customEditorRef.current?.clearDropDownSelection();
    }
  }, []);
  const calculateDisplayValue = useCallback(
    (row: Customer) => categories.find((c) => c.id === row.CategoryId)?.name ?? '',
    [],
  );

  return (
    <div className="demo-container">
      <DataGrid
        ref={dataGrid}
        dataSource={customers}
        keyExpr="ID"
        showBorders={true}
        onEditorPreparing={onEditorPreparing}
        onOptionChanged={onOptionChanged}
      >
        <FilterRow visible={true} />
        <Column dataField="ID" dataType="number" width={80} visible={false} />
        <Column dataField="CompanyName" dataType="string" caption="Company Name" />
        <Column dataField="IsActive" dataType="boolean" caption="Active" filterValue={true} />
        <Column
          dataField="CategoryId"
          dataType="number"
          caption="Category"
          calculateDisplayValue={calculateDisplayValue}
          filterValue={1}
        />
      </DataGrid>
    </div>
  );
}

export default App;
