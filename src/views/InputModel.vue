<template>
  <div class="input-model">
    <div class="decs">
      使用说明：输入想要生成二维码的字符串，点击生成，即可生成对应二维码，通过换行符可生成多个二维码哦
    </div>
    <div class="qrcode-generator">
      <textarea row="1" v-model="value" />
      <div class="qrcode-list">
        <div
          class="qrcode-compenent"
          v-for="(item, index) in showQrcode"
          :key="index"
        >
          <qrcode
            :id="`qrcode-${index}`"
            :url="item"
            :wid="230"
            :hei="230"
            colorDark="#000"
            colorLight="#fff"
          ></qrcode>
          <div class="qrcode-text">{{ item }}</div>
        </div>
      </div>
    </div>
    <div class="btn-group">
      <div
        class="btn cancel"
        @click="
          value = '';
          showQrcode = [];
        "
      >
        重 置
      </div>
      <div class="btn primary" :class="{ disable: !value }" @click="generator">
        生 成
      </div>
    </div>
  </div>
</template>
<script>
import qrcode from "@/components/qrcode.vue";
export default {
  name: "InputModel",
  data() {
    return {
      value: "",
      showQrcode: []
    };
  },
  components: {
    qrcode
  },
  methods: {
    generator() {
      if (!this.value) return;
      const codeList = this.value.split(/[(\r\n)\r\n]+/);
      codeList.forEach((item, index) => {
        if (!item) {
          codeList.splice(index, 1); //删除空项
        }
      });
      this.showQrcode = codeList;
    }
  }
};
</script>
<style scoped lang="less">
.input-model {
  margin: auto;
  width: 90%;
  .decs {
    margin: 32px;
    color: #4a4a4a;
  }
  .qrcode-generator {
    display: flex;
    flex-direction: column;
    align-items: center;
    textarea {
      width: 760px;
      height: 300px;
      border: unset;
      border-radius: 8px;
      font-size: 28px;
      resize: none;
      outline: none;
      padding: 16px;
    }
    .qrcode-list {
      display: flex;
      flex-wrap: nowrap;
      overflow: auto;
      margin-top: 24px;
      max-width: 860px;
      background: #fff;
      border-radius: 8px;
      .qrcode-compenent {
        background: #fff;
        width: 320px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 32px;
        text-align: left;
        flex-direction: column;
      }
      .qrcode-text {
        margin: 16px 0;
      }
    }
  }
  .btn {
    margin: 36px 16px;
  }
}
</style>
