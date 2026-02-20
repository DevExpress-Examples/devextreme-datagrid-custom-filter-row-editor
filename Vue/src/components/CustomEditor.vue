<script setup lang="ts">
import { ref, watch } from 'vue';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import DxDropDownBox, { DxButton as DxDropDownBoxButton } from 'devextreme-vue/drop-down-box';
import type { DxDropDownBoxTypes } from 'devextreme-vue/drop-down-box';
import type { ButtonTypes } from 'devextreme/ui/button';
import DxTreeList, { DxColumn as DxTreeListColumn, DxSelection as DxTreeListSelection } from 'devextreme-vue/tree-list';
import type { DxTreeListTypes } from 'devextreme-vue/tree-list';
import type { DxDataGridTypes } from 'devextreme-vue/data-grid';
import { categories } from '../data';

interface CustomEditorProps {
  gridEditorEvent: DxDataGridTypes.EditorPreparingEvent;
}

const props = defineProps<CustomEditorProps>();

const treeListRef = ref(null);
const dropDownBoxRef = ref(null);
const dropDownBoxValue = ref<number | null>(props.gridEditorEvent.value);
const selectedRowKeys = ref<number[]>(props.gridEditorEvent.value != null ? [props.gridEditorEvent.value] : []);

watch(dropDownBoxValue, (newValue) => {
  selectedRowKeys.value = newValue != null ? [newValue] : [];
});

function onSelectionChanged(e: DxTreeListTypes.SelectionChangedEvent) {
  const selectedId = e.currentSelectedRowKeys[0];
  if (!selectedId) return;
  
  const dropDownBoxInstance = dropDownBoxRef.value?.instance;
  dropDownBoxInstance?.option('value', selectedId);
  dropDownBoxInstance?.close();
  props.gridEditorEvent.setValue(selectedId);
  dropDownBoxValue.value = selectedId;
  selectedRowKeys.value = [selectedId];
}

function dropDownBoxValueChanged(e: DxDropDownBoxTypes.ValueChangedEvent) {
  dropDownBoxValue.value = e.value;
}

function clearDropDownSelection() {
  dropDownBoxValue.value = null;
  dropDownBoxRef.value?.instance?.close();
}

const dropDownBoxButtonOptions: ButtonTypes.Properties = {
  icon: 'remove',
  onClick: () => {
    props.gridEditorEvent.setValue(null);
    clearDropDownSelection();
  },
};

defineExpose({
  clearDropDownSelection,
});
</script>

<template>
  <div>
    <DxDropDownBox
      ref="dropDownBoxRef"
      :value="dropDownBoxValue"
      @valueChanged="dropDownBoxValueChanged"
      :dataSource="categories"
      valueExpr="id"
      displayExpr="name"
    >
      <template #content>
        <DxTreeList
          ref="treeListRef"
          height="100%"
          :selectedRowKeys="selectedRowKeys"
          :dataSource="categories"
          keyExpr="id"
          parentIdExpr="parentId"
          @selectionChanged="onSelectionChanged"
        >
          <DxTreeListSelection mode="single" />
          <DxTreeListColumn dataField="name" />
        </DxTreeList>
      </template>
      <DxDropDownBoxButton
        location="after"
        name="customClear"
        :options="dropDownBoxButtonOptions"
      />
    </DxDropDownBox>
  </div>
</template>
