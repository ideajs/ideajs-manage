<!-- Created by macmzon@163.com-->
<template>
  <div class="appHeadPhoto">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div>
        <div class="editImgs">
          <Card class="infoHeadPhoto" :bordered="true">
            <div slot="title">
              <Row type="flex" justify="space-around" class="headType">
                <Col span="12">当前头像</Col>
                <Col span="12">预览头像</Col>
              </Row>
            </div>
            <div>
              <Row type="flex" justify="space-around" class="headType">
                <Col span="12" class="curHeadPhoto">
                  <img v-if="data.headImg" :src="data.headImg" alt="头像">
                </Col>
                <Col span="12" class="newHeadPhoto">
                  <img v-if="data.previews.url" :src="data.previews.url" :style="data.previews.img">
                </Col>
              </Row>
            </div>
          </Card>
          <div class="setHeadPhoto">
            <div class="setDiv">
              <Button class="setBtn" type="info" @click="changeScale(1)">
                <Icon type="md-add" title="放大" />
              </Button>
              <Button class="setBtn" type="info" @click="changeScale(-1)">
                <Icon type="md-remove" title="缩小" />
              </Button>
              <Button class="setBtn" type="info" @click="rotateLeft" title="左旋转">
                ↺
              </Button>
              <Button class="setBtn" type="info" @click="rotateRight" title="右旋转">
                ↻
              </Button>
              <Button class="setBtn" type="info" @click="down('')">
                <Icon type="md-arrow-down" title="下载" />
              </Button>
            </div>
            <div class="line">
              <div class="cropperCont" style="">
                <div class="cropper">
                  <vueCropper
                    ref="cropper"
                    :img="data.option.img"
                    :outputSize="data.option.size"
                    :outputType="data.option.outputType"
                    :info="true"
                    :full="data.option.full"
                    :canMove="data.option.canMove"
                    :canMoveBox="data.option.canMoveBox"
                    :original="data.option.original"
                    :autoCrop="data.option.autoCrop"
                    :autoCropWidth="data.option.autoCropWidth"
                    :autoCropHeight="data.option.autoCropHeight"
                    :fixedBox="data.option.fixedBox"
                    @realTime="realTime"
                    @imgLoad="imgLoad"
                  ></vueCropper>
                </div>
              </div>
            </div>
            <Row class="bottomBtn" type="flex" justify="space-around">
              <Col span="12">
                <Button type="primary" @click="uploadBtn()">选择图片</Button>
                <input v-show="false" id="uploadImg" type="file" :value="data.imgFile" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
              </Col>
              <Col span="12">
                <Button type="error" @click="finish('')">
                  设置头像
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {VueCropper} from 'vue-cropper'
import {Button, Card, Row, Col, Icon, Modal} from 'iview'
import { Popup } from 'vux'
import appHeader from '@/components/appConfig/appHeader.vue'
export default {
  name: 'appHeadPhoto',
  data () {
    return {
      showBack: false,
      data: {
        headerInfo: this.$route.meta,
        type: this.$route.query.type,
        idex: parseInt(this.$route.query.idex),
        toUrl: this.$route.query.toUrl,
        fromUrl: this.$route.query.fromUrl,
        userLogin: localStorage.getItem('userLogin'),     // 获取客户登录状态
        headImg: ' ',                           // 默认头像图片地址
        previews: {},                          // 预览图片参数
        option: {                              // VueCropper配置参数
          img: '',                             // 图片地址
          outputType: 'png',                   // 裁剪生成图片的格式
          outputSize: 1,                       // 裁剪生成图片的质量（0.1-1）
          full: false,                         // 是否输出原图比例的截图
          original: false,                     // 上传图片按照原始比例渲染
          canMove: true,                       // 上传图片是否可以移动
          canMoveBox: true,                    // 截图框能否拖动
          fixedBox: false,                     // 固定截图框大小 不允许改变
          autoCrop: true,                      // 是否默认生成截图框
          autoCropWidth: 100,                  // 预览截图宽度
          autoCropHeight: 100                  // 预览截图高度
        },
        fileUrl: '',                            // 本机文件地址
        imgFile: '',                            // 上传本地图片文件地址
        downImg: '#',                          // 下载图片地址
        uploadImgRelaPath: ''                  // 上传后的图片的地址（不带服务器域名）
      }
    }
  },
  created () {
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
    if (this.data.userLogin) {
      this.data.user = JSON.parse(localStorage.getItem(this.data.userLogin))       // 获取客户信息
      if (this.data.idex === -1) {
        this.data.headImg = this.data.user.userInfo.headImg || ''                  // 头像
      } else {
        this.data.headImg = this.data.user.friends[this.data.idex].headImg || ''   // 头像
      }
    }
  },
  methods: {
    back () {
      this.$back({
        path: this.data.fromUrl,
        query: {
          url: this.data.toUrl
        }
      }, this)
    },
    // 放大/缩小
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // 坐旋转
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    // 右旋转
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    // 上传图片（点击上传按钮）
    finish (type) {
      let formData = new FormData()
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          let img = window.URL.createObjectURL(data)
          this.data.headImg = img
          if (this.data.idex === -1) {
            this.data.user.userInfo.headImg = img
          } else {
            this.data.user.friends[this.data.idex].headImg = img
          }
          localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
          Modal.warning({
            title: '信息提示',
            content: '头像设置成功！',
            okText: '确定',
            onOk: () => {
            }
          })
          // if (false) {
          //   this.model = true
          //   this.modelSrc = img
          //   formData.append("file", data, this.data.fileUrl)
          //   this.$post('url', formData, (res) => {
          //     console.log(res)
          //     var res = response.data
          //     if(res.success == 1){
          //       this.data.imgFile = ''
          //       this.data.headImg = res.realPathList[0]  //完整路径
          //       this.data.uploadImgRelaPath = res.relaPathList[0]  //非完整路径
          //       console.log('上传成功')
          //     }
          //   })
          // }
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.data.headImg = data
          if (this.data.idex === -1) {
            this.data.user.userInfo.headImg = data
          } else {
            this.data.user.friends[this.data.idex].headImg = data
          }
          localStorage.setItem(this.data.userLogin, JSON.stringify(this.data.user))
          Modal.warning({
            title: '信息提示',
            content: '头像设置成功！',
            okText: '确定',
            onOk: () => {
            }
          })
          // if (false) {
          //   this.model = true
          //   this.modelSrc = data
          //   formData.append("file", data, this.data.fileUrl)
          //   this.$post('url', formData, (res) => {
          //     console.log(res)
          //     var res = response.data
          //     if(res.success == 1){
          //       this.data.imgFile = ''
          //       this.data.headImg = res.realPathList[0]  //完整路径
          //       this.data.uploadImgRelaPath = res.relaPathList[0]  //非完整路径
          //       console.log('上传成功')
          //     }
          //   })
          // }
        })
      }
    },
    // 实时预览函数
    realTime (data) {
      this.data.previews = data
    },
    // 下载图片
    down (type) {
      var aLink = document.createElement('a')
      aLink.download = 'author-img'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          this.data.downImg = window.URL.createObjectURL(data)
          aLink.href = window.URL.createObjectURL(data)
          aLink.click()
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.data.downImg = data
          aLink.href = data
          aLink.click()
        })
      }
    },
    // 选择本地图片
    uploadImg (e, num) {
      // 上传图片
      var file = e.target.files[0]
      this.data.fileUrl = file.name
      if (!/\.(jpg|jpeg|png)$/.test(e.target.value)) {
        Modal.warning({
          title: '信息提示',
          content: '图片类型必须是jpeg、jpg、png！',
          okText: '确定',
          onOk: () => {
          }
        })
        return false
      }
      var reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          // data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          this.data.option.img = data
        } else if (num === 2) {
          this.headPhoto.img = data
        }
      }
      // 转化为base64
      reader.readAsDataURL(file)
      // 转化为blob
      // reader.readAsArrayBuffer(file)
      // console.log(file)
      // console.log(reader)
    },
    imgLoad (msg) {
      // console.log(msg)
    },
    uploadBtn () {
      document.getElementById('uploadImg').click()
    }
  },
  components: {
    appHeader, Button, Card, Row, Col, Icon, VueCropper, Popup, Modal
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'stylus/appHeadPhoto.styl'
</style>
