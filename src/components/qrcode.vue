<template>
  <div class="qrcode">
    <div class="qrcode_content" ref="qrcode" :id="id"></div>
  </div>
</template>

<script>
import QRcode from "qrcodejs2";
export default {
  name: "qrcode",
  props: {
    id: String,
    wid: Number,
    hei: Number,
    url: String,
    colorDark: String,
    colorLight: String
  },
  data() {
    return {
      qrcode: null
    };
  },
  mounted() {
    this.creatCode();
  },
  updated() {
    if (this.qrcode) {
      this.qrcode.clear();
      this.qrcode.makeCode(this.url);
    }
  },
  methods: {
    creatCode() {
      this.qrcode = new QRcode(this.id, {
        width: this.wid,
        height: this.hei, // 高度  ,250*320/(window.innerWidth)/20
        text: this.url, // 二维码内容
        image: "",
        correctLevel: QRcode.CorrectLevel.L,
        //容错级别，可设置为：(低到高)
        // QRCode.CorrectLevel.L
        // QRCode.CorrectLevel.M
        // QRCode.CorrectLevel.Q
        // QRCode.CorrectLevel.H

        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        colorLight: this.colorLight,
        colorDark: this.colorDark
      });
    }
  }
};
</script>
