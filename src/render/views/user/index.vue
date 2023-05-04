<template>
  <div class="wraper-container">
    <div class="view">
      <div class="form-item">
        <div class="form-title">1、选择班级</div>
        <div class="form-input">
          <el-select v-model="classInfo.value" placeholder="请选择" @change="onChange">
            <el-option
              v-for="item in classInfo.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>

      <div class="form-item">
        <div class="form-title">2、所选班级学生名单</div>
        <div class="form-input">
          <el-table :data="classInfo.log" style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="class" label="班级" width="180" />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="no" label="学号" />
          </el-table>
        </div>
      </div>

      <div class="form-item">
        <div class="form-title">3、随机生成点名名单</div>
        <div class="form-input">
          随机选中<el-input
            style="width: 180px"
            type="number"
            v-model="classInfo.input"
            placeholder="请输入"
          />名学生
          <el-button type="primary" @click="onStart()">确认</el-button>
        </div>
        <div class="form-input">
          <el-table :data="classInfo.randomList" style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="class" label="班级" width="180" />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="no" label="学号" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useCache } from "@/render/hooks/useCache";
import { random } from "lodash";
const { wsCache } = useCache("localStorage");

const count = ref("班级点名");
interface classType {
  class: string;
  no: string;
  name: string;
}
const classInfo = reactive<{
  input: string;
  log: Array<classType>;
  randomList: Array<classType>;
  value: string;
  options: Array<{
    label: string;
    value: string;
  }>;
}>({
  input: "",
  options: [],
  randomList: [],
  value: "",
  log: [],
});
let infoList: Array<classType> = [];
onMounted(() => {
  infoList = wsCache.get("classInfoList");
  let classList: Array<string> = [];
  if (infoList && infoList.length > 0) {
    infoList.forEach((item: classType) => {
      if (!classList.includes(item.class)) {
        classList.push(item.class);
      }
    });
    classInfo.options = classList.map((item: string) => {
      return {
        label: item,
        value: item,
      };
    });
  }
});

const onStart = () => {
  const num = parseFloat(classInfo.input);

  if (num && !isNaN(num) && num <= classInfo.log.length) {
    const randomList: Array<number> = [];
    const list: Array<classType> = [];
    do {
      const rnum = getRandom();
      if (!randomList.includes(rnum)) {
        randomList.push(rnum);
      }
    } while (randomList.length < num);
    classInfo.log.forEach((item: classType, index: number) => {
      if (randomList.includes(index + 1)) {
        list.push({
          class: item.class,
          name: item.name,
          no: item.no,
        });
      }
    });
    classInfo.randomList = list;
  }
};
const getRandom = () => {
  //0-1
  const len = classInfo.log.length;
  return Math.floor(Math.random() * len + 1);
};
const onChange = (value: string) => {
  let classList: Array<classType> = [];
  if (infoList && infoList.length > 0) {
    infoList.forEach((item: classType) => {
      if (value === item.class) {
        classList.push({
          class: item.class,
          name: item.name,
          no: item.no,
        });
      }
    });
  }
  classInfo.log = classList;
};
</script>

<style scoped>
.wraper-container {
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  overflow-y: auto;
}
.form-item {
  margin-bottom: 10px;
}
.form-title,
.form-input {
  margin-bottom: 10px;
}
</style>
