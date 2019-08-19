<!-- Created by macmzon@163.com-->
<template>
  <div class="appPhotoImg">
    <div v-transfer-dom>
      <popup v-model="showBack"></popup>
    </div>
    <appHeader :headerInfo="data.headerInfo"></appHeader>
    <div class="container">
      <div>
        <div class="editImgs">
          <Card class="infoPhotoPhoto" :bordered="true">
            <div slot="title" class="PhotoTitle">预览图片
            </div>
            <div class="PhotoType">
              <img v-if="data.PhotoImg" :src="data.PhotoImg">
            </div>
          </Card>
          <div class="setPhotoPhoto">
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
                  上传图片
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
  name: 'appPhotoImg',
  data () {
    return {
      showBack: false,
      data: {
        headerInfo: this.$route.meta,
        PhotoImg: ' ',                           // 默认头像图片地址
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
          autoCropWidth: 225,                  // 预览截图宽度
          autoCropHeight: 150                  // 预览截图高度
        },
        fileUrl: '',                            // 本机文件地址
        imgFile: '',                            // 上传本地图片文件地址
        downImg: '#',                          // 下载图片地址
        uploadImgRelaPath: ''                  // 上传后的图片的地址（不带服务器域名）
      }
    }
  },
  created () {
    this.data.type = this.$route.query.type
    this.data.toUrl = this.$route.query.toUrl
    this.data.fromUrl = this.$route.query.fromUrl
    /*自定义顶部header两侧按钮事件+页面左右滑动事件*/
    this.$route.meta.header.leftFuc = this.back                 // header左侧返回按钮事件
    this.$route.meta.touch.rightFuc = this.back                 // 页面向右滑动事件
  },
  methods: {
    back () {
      this.$route.meta.isBack = true
      this.$push({
        path: this.data.fromUrl,
        query: {
          type: this.data.type,
          toUrl: this.data.toUrl
        }
      })
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
          this.data.PhotoImg = img
          localStorage.setItem(this.data.type, img)
          Modal.warning({
            title: '信息提示',
            content: '图片上传成功！',
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
          //       this.data.PhotoImg = res.realPathList[0]  //完整路径
          //       this.data.uploadImgRelaPath = res.relaPathList[0]  //非完整路径
          //       console.log('图片上传成功')
          //     }
          //   })
          // }
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.data.PhotoImg = data
          localStorage.setItem(this.data.type, data)
          Modal.warning({
            title: '信息提示',
            content: '图片上传成功！',
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
          //       this.data.PhotoImg = res.realPathList[0]  //完整路径
          //       this.data.uploadImgRelaPath = res.relaPathList[0]  //非完整路径
          //       console.log('图片上传成功')
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
          this.PhotoPhoto.img = data
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
  @import 'stylus/appPhotoImg.styl'
</style>
