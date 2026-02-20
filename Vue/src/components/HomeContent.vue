<script setup lang="ts">
import { ref, createApp } from 'vue';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import DxDataGrid, {
    DxColumn,
    DxFilterRow
} from 'devextreme-vue/data-grid';
import type { DxDataGridTypes } from 'devextreme-vue/data-grid';
import CustomEditor from './CustomEditor.vue';
import { customers, categories, type Customer } from '../data';

const dataGrid = ref(null);
const customEditorRef = ref<typeof CustomEditor | null>(null);

function onEditorPreparing(e: DxDataGridTypes.EditorPreparingEvent) {
  // Customize boolean filter editor via e.editorName
  if (e.parentType === 'filterRow' && e.dataField === 'IsActive') {
    e.editorName = 'dxCheckBox';
    e.editorOptions = {
      value: e.value,
      enableThreeStateBehavior: true,
      onValueChanged(args: any) {
        e.setValue(args.value ?? null);
      },
    };
  }

  // Customize category filter editor via component prop
  if (e.parentType === 'filterRow' && e.dataField === 'CategoryId') {
    e.cancel = true;
    const app = createApp(CustomEditor, {
      gridEditorEvent: e,
      ref: customEditorRef,
    });
    app.mount(e.editorElement);
  }
}

function onOptionChanged(e: DxDataGridTypes.OptionChangedEvent) {
  if (e.fullName === 'columns[3].filterValue' && e.value === null) {
    customEditorRef.value?.clearDropDownSelection?.();
  }
}

function calculateDisplayValue(row: Customer) {
  return categories.find((c) => c.id === row.CategoryId)?.name ?? '';
}

</script>
<template>
  <div class="demo-container">
    <DxDataGrid
      ref="dataGrid"
      :dataSource="customers"
      keyExpr="ID"
      :showBorders="true"
      @editorPreparing="onEditorPreparing"
      @optionChanged="onOptionChanged"
    >
      <DxFilterRow :visible="true" />
      <DxColumn dataField="ID" dataType="number" :width="80" :visible="false" />
      <DxColumn dataField="CompanyName" dataType="string" caption="Company Name" />
      <DxColumn dataField="IsActive" dataType="boolean" caption="Active" :filterValue="true" />
      <DxColumn
        dataField="CategoryId"
        dataType="number"
        caption="Category"
        :calculateDisplayValue="calculateDisplayValue"
        :filterValue="1"
      />
    </DxDataGrid>
  </div>
</template>
