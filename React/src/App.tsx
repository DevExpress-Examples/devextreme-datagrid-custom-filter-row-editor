import { createRoot } from 'react-dom/client';
import { useRef, useCallback } from 'react';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import './App.css';
import DataGrid, {
  Column,
  FilterRow,
} from 'devextreme-react/data-grid';
import { type DataGridTypes, type DataGridRef } from 'devextreme-react/data-grid';
import { customers, categories, type Customer } from './data';
import CustomEditor from './components/CustomEditor.tsx';

function App(): JSX.Element {
  const dataGrid = useRef<DataGridRef | null>(null);
  const onEditorPreparing = useCallback((e: DataGridTypes.EditorPreparingEvent) => {
    // Customize boolean filter editor via e.editorName
    if (e.parentType === 'filterRow' && e.dataField === 'IsActive') {
      e.editorName = 'dxCheckBox';
      e.editorOptions = {
        value: null,
        enableThreeStateBehavior: true,
        onValueChanged(args: any) {
          e.setValue(args.value ?? null);
        },
      };
    }

    // Customize category filter editor via component prop
    if (e.parentType === 'filterRow' && e.dataField === 'CategoryId') {
      e.cancel = true;
      createRoot(e.editorElement).render(<CustomEditor gridEditorEvent={e} />);
    }
  }, []);

  const calculateDisplayValue = useCallback((row: Customer) => categories.find((c) => c.id === row.CategoryId)?.name, []);

  return (
    <div className="demo-container">
      <DataGrid
        ref={dataGrid}
        dataSource={customers}
        keyExpr="ID"
        showBorders={true}
        onEditorPreparing={onEditorPreparing}
      >
        <FilterRow visible={true} />
        <Column dataField="ID" width={80} visible={false} />
        <Column dataField="CompanyName" caption="Company Name" />
        <Column dataField="IsActive" caption="Active" dataType="boolean" />
        <Column
          dataField="CategoryId"
          caption="Category"
          calculateDisplayValue={calculateDisplayValue}
        />
      </DataGrid>
    </div>
  );
}

export default App;
