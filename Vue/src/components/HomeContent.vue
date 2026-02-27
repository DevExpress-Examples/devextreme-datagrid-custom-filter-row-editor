<script setup lang="ts">
import { createVNode, render, type VNode, type ComponentInternalInstance } from 'vue';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import DxDataGrid, {
  DxColumn,
  DxFilterRow
} from 'devextreme-vue/data-grid';
import type { DxDataGridTypes } from 'devextreme-vue/data-grid';
import type { DxCheckBoxTypes } from 'devextreme-vue/check-box';
import CustomEditor from './CustomEditor.vue';
import { customers, categories, type Customer } from '../data';

let vnode: VNode | null = null;

function onEditorPreparing(e: DxDataGridTypes.EditorPreparingEvent): void {
  // Customize boolean filter editor via e.editorName
  if (e.parentType === 'filterRow' && e.dataField === 'IsActive') {
    e.editorName = 'dxCheckBox';
    e.editorOptions = {
      value: e.value,
      enableThreeStateBehavior: true,
      onValueChanged(args: DxCheckBoxTypes.ValueChangedEvent): void {
        e.setValue(args.value ?? null);
      },
    };
  }

  // Customize category filter editor via component prop
  if (e.parentType === 'filterRow' && e.dataField === 'CategoryId') {
    e.cancel = true;

    // Clean up previous vnode if exists
    if (vnode && e.editorElement) {
      render(null, e.editorElement);
    }

    vnode = createVNode(CustomEditor, {
      gridEditorEvent: e,
    });

    if (e.editorElement) {
      render(vnode, e.editorElement);
    }
  }
}

function onOptionChanged(e: DxDataGridTypes.OptionChangedEvent): void {
  if (e.fullName === 'columns[3].filterValue' && e.value === null) {
    const component = vnode?.component as
    ComponentInternalInstance | undefined;
    if (component?.exposed?.clearDropDownSelection) {
      component.exposed.clearDropDownSelection();
    }
  }
}

function calculateDisplayValue(row: Customer): string {
  return categories.find((c) => c.id === row.CategoryId)?.name ?? '';
}
</script>

<template>
  <div class="demo-container">
    <DxDataGrid
      :data-source="customers"
      key-expr="ID"
      :show-borders="true"
      @editor-preparing="onEditorPreparing"
      @option-changed="onOptionChanged"
    >
      <DxFilterRow :visible="true"/>
      <DxColumn
        data-field="ID"
        data-type="number"
        :width="80"
        :visible="false"
      />
      <DxColumn
        data-field="CompanyName"
        data-type="string"
        caption="Company Name"
      />
      <DxColumn
        data-field="IsActive"
        data-type="boolean"
        caption="Active"
        :filter-value="true"
      />
      <DxColumn
        data-field="CategoryId"
        data-type="number"
        caption="Category"
        :calculate-display-value="calculateDisplayValue"
        :filter-value="1"
      />
    </DxDataGrid>
  </div>
</template>
