<template>
  <div class="wraper-container">
    <div class="xlsx">
      <div class="form-item">
        <div class="form-title">1、确认当前学生名单</div>
        <div class="form-input">
          <el-table :data="uploadPageData.log" style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="class" label="班级" width="180" />
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="no" label="学号" />
          </el-table>
        </div>
      </div>

      <div class="form-item">
        <div class="form-title">
          2、上传excel文件(支持多sheet页,每页第一行为:学生/姓名/学号)
        </div>
        <div class="form-input">
          <el-upload
            ref="elUploadFile"
            drag
            action=""
            :auto-upload="false"
            :on-change="onFileChange"
            :on-remove="onFileRemove"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <div>将文件拖到此处</div>
              <div>(每次更新均会全量覆盖)</div>
            </div>
          </el-upload>
        </div>
      </div>

      <div class="form-item">
        <div class="form-title">3、确认更新班级excel文件覆盖原有数据</div>
        <div class="form-input">
          <el-button type="primary" @click="onStart()">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useCache } from "@/render/hooks/useCache";
const { wsCache } = useCache("localStorage");
interface classType {
  class: string;
  no: string;
  name: string;
}
const count = ref("班级点名");

const uploadPageData = reactive<{
  sourcePathList: Array<any>;
  isLoading: boolean;
  log: Array<classType>;
}>({
  sourcePathList: [],
  isLoading: false,
  log: [],
});
const elUploadFile = ref(null);

onMounted(() => {
  const infoList = wsCache.get("classInfoList");
  if (infoList && infoList.length > 0) {
    uploadPageData.log = infoList;
  }
  const html = document.querySelector("html");
  if (html) {
    html.ondragenter = html.ondragover = html.ondragleave = html.ondrop = (e) => {
      e.preventDefault();
    };
  }
});

const formatToBuffer = (files: any) => {
  return new Promise((resolve: Function, reject: Function) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(files); //files.raw这个是原始文件对象
    reader.onload = (e) => {
      let res = e.target?.result; //ArrayBuffer
      resolve(res);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const onFileChange = (
  file: any,
  fileList: { map: (arg0: (x: any) => any) => never[] }
) => {
  const list: any[] = [];
  formatToBuffer(file.raw).then((res) => {
    window.electronAPI.testXls(res).then(
      (result: Array<Array<string>>) => {
        console.log(result);
        uploadPageData.log = formatData(result);
      },
      (error: any) => {
        console.log(error);
      }
    );
  });
};
const onFileRemove = (
  file: any,
  fileList: { map: (arg0: (x: any) => any) => never[] }
) => {
  //   uploadPageData.sourcePathList = fileList.map((x: { raw: any }) => x.raw.path);
};

const formatData = (infoList: Array<Array<string>>) => {
  let classList: Array<classType> = [];
  if (infoList && infoList.length > 0) {
    infoList.forEach((element: Array<string>) => {
      classList.push({
        class: element.length > 0 ? element[0] : "",
        name: element.length > 2 ? element[1] : "",
        no: element.length > 2 ? element[2] : "",
      });
    });
  }
  return classList;
};
const onStart = () => {
  wsCache.set("classInfoList", uploadPageData.log);
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
