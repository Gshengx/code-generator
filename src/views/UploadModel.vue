<template>
  <div class="upload-model">
    <div class="decs">
      使用说明：上传要生成二维码的txt文件，以空格/换行符划分要生成的二维码
    </div>
    <div v-if="codeList.length === 0">
      <div class="file-select">
        <div class="upload-icon">+<span class="text">上传文件</span></div>
        <input type="file" id="fileInput" @change="change()" value="选取文件" />
      </div>
    </div>
    <div v-else class="file-info">
      <div>
        <span>共{{ codeList.length }}条数据</span>
        <div class="file-select upload-btn">
          <span>上传其它文件</span>
          <input
            type="file"
            id="fileInput"
            @change="change()"
            value="选取文件"
          />
        </div>
      </div>
      <table>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <div class="td">
              <div class="index">{{ index + 1 + pageSize * (page - 1) }}</div>
              <div class="code">
                <div v-for="(code, codeIndex) in item" :key="codeIndex">
                  {{ code }}
                </div>
              </div>
              <div class="action" @click="() => clickCode(index)">
                生成二维码
              </div>
            </div>
          </tr>
        </tbody>
      </table>
      <div class="page-action">
        <div v-if="page > 1" @click="page -= 1">上一页</div>
        <div
          v-if="page < Math.ceil(codeList.length / pageSize)"
          @click="page += 1"
        >
          下一页
        </div>
        <div>
          <span>每页展示数量：</span><input v-model="pageSize" type="number" />
        </div>
      </div>
    </div>
    <div
      class="qrcode-popup"
      v-if="codeInd > -1"
      @click.self="
        showPopup = false;
        codeInd = -1;
      "
    >
      <div class="popup-content">
        <div class="close">
          <span>第{{ codeInd + 1 + pageSize * (page - 1) }}条数据</span>

          <span
            @click="
              showPopup = false;
              codeInd = -1;
            "
          >
            X</span
          >
        </div>
        <div class="qrcode-list">
          <div
            class="qrcode-compenent"
            v-for="(item, index) in tableData[codeInd]"
            :key="index"
          >
            <qrcode
              :id="`${item}-${index}`"
              :url="item"
              :wid="230"
              :hei="230"
              colorDark="#000"
              colorLight="#fff"
            ></qrcode>
            <div class="qrcode-text">{{ tableData[codeInd][index] }}</div>
          </div>
        </div>
        <div class="qrcode-action">
          <div v-if="!(page == 1 && codeInd == 0)" @click="prev">
            生成上一条数据二维码
          </div>
          <div
            v-if="
              !(
                page == Math.ceil(codeList.length / pageSize) &&
                codeInd == tableData.length - 1
              )
            "
            @click="next"
          >
            生成下一条数据二维码
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qrcode from "@/components/qrcode.vue";

export default {
  name: "UploadModel",
  data() {
    return {
      codeList: [],
      tableData: [],
      fileName: "",
      fileSize: "",
      codeInd: -1,
      page: 1,
      pageSize: 10,
      showPopup: false
    };
  },
  components: {
    qrcode
  },
  watch: {
    page(n, o) {
      if (n > o) {
        this.tableData = this.codeList.slice(
          o * this.pageSize,
          n * this.pageSize
        );
      } else {
        this.tableData = this.codeList.slice(
          (n - 1) * this.pageSize,
          n * this.pageSize
        );
      }
    },
    pageSize(n) {
      this.tableData = this.codeList.slice(0, n);
      this.page = 1;
    },
    showPopup(n) {
      if (n && this.codeList.length > 0) {
        document.getElementById("app").scrollTop = 0;
        document.getElementById("app").style.overflow = "hidden";
      } else {
        document.getElementById("app").style.overflow = "auto";
      }
    }
  },
  methods: {
    change() {
      const fileInput = document.getElementById("fileInput");
      if (fileInput.value) {
        this.hasContent = true;
        // 获取File引用:
        const file = fileInput.files[0];
        // 获取File信息:
        this.fileName = file.name;
        this.fileSize = file.size;
        // 读取文件:
        const _this = this;
        const reader = new FileReader();
        reader.onload = function(e) {
          const data = e.target.result;
          const codeList = data.split(/[(\r\n)\r\n]+/);
          codeList.forEach((item, index) => {
            if (!item) {
              codeList.splice(index, 1); //删除空项
            }
          });
          _this.codeList = codeList.map(item => {
            const code = item.replace(/\s+/g, " "); //多个空格转一个空格
            return code.split(" ");
          });
          _this.tableData =
            _this.codeList.length > _this.pageSize
              ? _this.codeList.slice(0, _this.pageSize)
              : _this.codeList;
          console.log(_this.codeList);
        };
        // 以DataURL的形式读取文件:
        reader.readAsText(file, "gb2312");
      }
    },
    clickCode(index) {
      this.codeInd = index;
      this.showPopup = true;
    },
    prev() {
      if (this.codeInd > 0) {
        this.codeInd -= 1;
        return;
      }
      this.page -= 1;
      this.codeInd = this.pageSize - 1;
    },
    next() {
      if (this.codeInd < this.pageSize - 1) {
        this.codeInd += 1;
        return;
      }
      this.codeInd = 0;
      this.page += 1;
    }
  }
};
</script>
<style scoped lang="less">
.upload-model {
  padding-bottom: 120px;
  .decs {
    margin: 32px;
    margin-top: 0;
  }
  .file-select {
    width: 25%;
    margin: auto;
    position: relative;
    .upload-icon {
      width: 240px;
      height: 240px;
      margin: auto;
      border: 1px solid rgba(0, 0, 0, 0.25);
      background: #fff;
      border-radius: 4px;
      font-size: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: rgba(0, 0, 0, 0.65);
      .text {
        font-size: 24px;
      }
    }
    input {
      position: absolute;
      width: 120px;
      height: 120px;
      top: 0;
      margin: auto;
      left: 0;
      right: 0;
      opacity: 0;
      z-index: 99;
    }
  }
  .file-info {
    table {
      background: #fff;
      padding: 8px;
      margin: auto;
      width: 90%;
      margin-top: 16px;
      border-radius: 8px;
      tr {
        .td {
          text-align: center;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.15);
          padding: 8px 0;
          .index {
            padding: 8px 12px;
            width: 3%;
          }
          .code {
            width: 80%;
            text-align: left;
            line-height: 1.8;
            padding-left: 8px;
          }
          .action {
            text-align: center;
            color: #42b983;
            width: 17%;
          }
        }
        &:last-child {
          .td {
            border-bottom: unset;
          }
        }
      }
    }
    .page-action {
      display: flex;
      justify-content: space-around;
      margin: auto;
      margin-top: 16px;
      width: 50%;
      input {
        border: unset;
        outline: none;
        width: 50px;
        height: 32px;
        border-radius: 8px;
        text-align: center;
      }
    }
    .upload-btn {
      color: #42b983;
      padding: 16px;
    }
  }
  .qrcode-popup {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 100;
    .close {
      height: 80px;
      font-size: 32px;
      color: rgba(0, 0, 0, 0.45);
      display: flex;
      justify-content: space-between;
    }
    .popup-content {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 35%;
      top: 20%;
      background: #fff;
      border-radius: 8px;
      padding: 35px;
      z-index: 999;
      .qrcode-list {
        display: flex;
        flex-wrap: nowrap;
        overflow: auto;
        .qrcode-compenent {
          background: #fff;
          width: 320px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-radius: 8px;
          margin: 0 24px;
          text-align: left;
          flex-direction: column;
        }
        .qrcode-text {
          margin: 16px 0;
        }
      }
      .qrcode-action {
        display: flex;
        justify-content: space-around;
        width: 65%;
        margin: 16px auto;
      }
    }
  }
}
</style>
