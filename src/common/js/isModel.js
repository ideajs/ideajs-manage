import Vue from 'vue'
import {ConfirmPlugin, AlertPlugin , ToastPlugin, LoadingPlugin} from 'vux'

Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

const vm = new Vue()

// loading(show)
export function showLoading (oMsg) {
  vm.$vux.loading.show({
    text: oMsg || 'Loading'
  })
  setTimeout(() => {
    vm.$vux.loading.hide()
  }, 2000)
}

// loading(hide)
export function hideLoading () {
  vm.$vux.loading.hide()
}

// confirm
export function showConfirm (oMsg) {
  vm.$vux.confirm.show({
    title: oMsg.title || '信息提示',
    content: oMsg.content,
    cancelText: oMsg.cancelText || '取消',
    confirmText: oMsg.confirmText || '确定',
    onCancel () {
      oMsg.cancelFunc && oMsg.cancelFunc()
    },
    onConfirm () {
      oMsg.confirmFunc && oMsg.confirmFunc()
    }
  })
}

// alert
export function showAlert (oMsg) {
  vm.$vux.alert.show({
    title: oMsg.title || '提示',
    content: oMsg.content,
    buttonText: oMsg.buttonText || '确定',
    onShow () {},
    onHide () {
      oMsg.hideFunc && oMsg.hideFunc()
    }
  })
}

// toast
export function showToast (oMsg) {
  vm.$vux.toast.show({
    text: oMsg.text,
    position: oMsg.position || '100px',
    type: oMsg.type || 'text',
    width: oMsg.width || '13em',
    onShow () {},
    onHide () {}
  })
}
