<template>
  <div class="flex">
    <div class="w500">
      <JsonEditorVue
        :modelValue="json"
        :show-btns="false"
        :modeList="['form']"
        :mode="'form'"
        :expandedOnStart="false"
        @change="onJsonChange"
      />
    </div>

    <div class="container flex1 oa">
      <el-form-item>
        <label for="">类别:</label>
        <el-tree-select
          :data="data"
          v-model="cateValue"
          check-strictly
          :render-after-expand="false"
          @change="nodeChange"
        ></el-tree-select>
      </el-form-item>
      <VueForm
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
        :formFooter="{ show: false }"
      ></VueForm>
    </div>
  </div>
  <div class="opert-btns">
    <el-button size="large" type="primary" @click="handleSubmit">保存</el-button>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, toRefs, ref, computed, watch, onMounted } from "vue";
import { ElMessage } from "element-plus";
import JsonEditorVue from "json-editor-vue3";
import VueForm from "@lljj/vue3-form-element";

import { fetchFormSchemaData } from "@/api";

const emits = defineEmits(["submit"]);

const cateValue = ref();
const data = ref();
const formData = ref({});
const schema = ref({
  type: "object",
  properties: {},
});

const uiSchema = ref({});

const json = ref<any>({}); // 左侧json数据

watch(
  () => formData.value,
  (newVal) => {
    console.log(newVal);
    if (newVal) {
      json.value.formData = {};
      json.value.formData = newVal;
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => schema.value,
  (newVal) => {
    if (newVal) {
      json.value.schema = {};
      json.value.schema = newVal;
    }
  },
  { immediate: true, deep: true }
);

function onJsonChange(value) {
  return;
  // formData.value = value.formData;
  // schema.value = value.schema;
}
/**
 * 节点选择
 */
function nodeChange(val: string) {
  let properties = {};
  let res = diGuiMergeProperties(json.value.openlabel.classes, val, properties);
  console.log(res);
  json.value.schema = {};
  json.value.schema.properties = res;
  schema.value.properties = res;
}

/**
 * 递归合并顶级节点properties
 */
function diGuiMergeProperties(arr: any, val: string, properties: Object) {
  if (!arr || !arr.length) {
    return properties;
  }
  arr.forEach((item) => {
    if (item.name == val) {
      let resProperties = {};
      const parentNodes = findParentNodesByName(json.value.openlabel.classes, item.name);
      parentNodes.forEach((ele) => {
        resProperties = Object.assign(resProperties, ele.properties);
      });
      return Object.assign(properties, resProperties, item.properties);
    }
    if (item.children && item.children.length) {
      diGuiMergeProperties(item.children, val, properties);
    }
  });
  return properties;
}

/**
 * 遍历递归查找所属父节点列表
 * @param nodes
 * @param name
 * @param parents
 */
function findParentNodesByName(nodes, name, parents = []) {
  // 遍历数组中的每个节点
  for (const node of nodes) {
    // 如果当前节点的 name 匹配目标 name，则返回父节点列表
    if (node.name === name) {
      return parents;
    }

    // 如果当前节点有子节点，递归查找
    if (node.children && node.children.length > 0) {
      const result = findParentNodesByName(node.children, name, [...parents, node]);
      if (result) {
        return result;
      }
    }
  }

  // 如果没有找到，返回 null
  return null;
}

/**
 * 根据左侧json数据递归data
 */
 function generateTreeFromArray(nodes) {
    return nodes.map(node => {
        // 创建新的节点，包含 label 和 value 字段
        const newNode = {
            label: node.name,
            value: node.name,  // 使用 ontology_uid 作为 value
            properties: {},
            children: []
        };

        // 如果当前节点有子节点，递归处理子节点
        if (node.children && node.children.length > 0) {
            newNode.children = generateTreeFromArray(node.children);
        }

        // 如果没有子节点，则删除 children 字段
        if (newNode.children.length === 0) {
            delete newNode.children;
        }

        return newNode;
    });
}


/**
 * 获取左侧json数据和data数据
 */
const getJsonData = async () => {
  const res = await fetchFormSchemaData();
  json.value = res.data;
  const originalTreeArray = json.value.openlabel.classes;
  data.value = generateTreeFromArray(originalTreeArray);
  console.log(data.value);
};
onMounted(() => {
  getJsonData();
});

function handleSubmit() {
  console.log(formData.value);
  emits("submit");
  ElMessage.success("保存成功");
}
</script>

<style scoped>
.container {
  height: calc(100% - 60px);
}
.w500 {
  width: 50%;
}
.flex {
  height: 70vh;
  display: flex;
}
.flex1 {
  flex: 1;
  margin-left: 16px;
}
.oa {
  overflow: auto;
}
.opert-btns {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
