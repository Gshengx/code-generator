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
      width: 700px;
      height: 260px;
      border: unset;
      border-radius: 8px;
      font-size: 24px;
      resize: none;
      outline: none;
    }
    .qrcode-list {
      display: flex;
      flex-wrap: nowrap;
      overflow: auto;
      margin-top: 16px;
      max-width: 820px;
      background: #fff;
      border-radius: 8px;
    }
    .qrcode-compenent {
      background: #fff;
      width: 260px;
      height: 260px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
  }
  .btn {
    margin: 32px 16px;
  }
}
</style>
