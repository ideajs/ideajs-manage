/*Created by macmzon@163.com*/
// 数据库初始化参数
var DB = {
  SQL: {},                         // 数据库对象
  DB_NAME: 'MYDBSQL',              // 数据库名称
  DB_VERSION: 1,                   // 使用正整数，别用浮点型
  READ_WRITE: 'readwrite',         // 读写权限
  READ_ONLY: 'readonly'            // 只读权限
}
// 数据库初始化
function initDb () {
	var req = indexedDB.open(DB.DB_NAME, DB.DB_VERSION)
	req.onsuccess = function (evt) {
		DB.SQL = evt.target.result
	}
	req.onerror = function (evt) {
		console.error("initDb error:", evt.target.errorCode || evt.target.error)
	}

	// 增加数据库版本号时,会触发onupgradeneeded事件(会在onsuccess之前被调用)
	req.onupgradeneeded = function (evt) {
		var db = evt.currentTarget.result
		// ObjectStore必须在onupgradeneeded里创建，其他地方将会创建失败
		var usersStore = db.createObjectStore("users", { keyPath : "id" })
		usersStore.createIndex("name", "name", { unique : false })
	}
}

initDb()

function addData () {
	var users = [{
		id : '001',
		name : '刘亦菲',
		age : 18
	},{
		id : '002',
		name : '杨幂',
		age : 19
	},{
		id : '005',
		name : '柳岩',
		age : 20
	}]

	var tx = DB.SQL.transaction("users", DB.READ_WRITE)
  var store = tx.objectStore("users")
	var i = 0, len = users.length
	while(i < len){
		var req= store.add(users[i++])
		req.onsuccess = function (evt) {
			console.log("addData success:", evt.target.result)
		}
		req.onerror = function (evt) {
			console.error("addData error:", evt.target.errorCode || evt.target.error)
		}
	}
}

function updateData(){
	var tx = DB.SQL.transaction("users", DB.READ_WRITE)
  var store = tx.objectStore("users")
	var req = store.put({
		id : '001',
		name : '刘亦菲-小龙女',
		age : 18
	})
	req.onsuccess = function (evt) {
		console.log("updateData success")
	}
	req.onerror = function (evt) {
		console.error("updateData error:", evt.target.errorCode || evt.target.error)
	}
}

function getData() {
	var tx = DB.SQL.transaction("users")
  var store = tx.objectStore("users")
	var req = store.get("001")
	req.onsuccess = function (evt) {
		var res = evt.target.result
		console.log(res)
	}
	req.onerror = function (evt) {
		console.error("getData error:", evt.target.errorCode || evt.target.error)
	}
}

function delData () {
	var tx = DB.SQL.transaction("users", DB.READ_WRITE)
  var store = tx.objectStore("users")
	var req = store.delete("001")
	req.onsuccess = function (evt) {
		console.log("delData success")
	}
	req.onerror = function (evt) {
		console.error("delData error:", evt.target.errorCode || evt.target.error)
	}
}

function clearData () {
	var tx = DB.SQL.transaction("users", DB.READ_WRITE)
  var store = tx.objectStore("users")
	var req = store.clear()
	req.onsuccess = function (evt) {
		console.log("clearData success")
	}
	req.onerror = function (evt) {
		console.error("clearData error:", evt.target.errorCode || evt.target.error)
	}
}

function openCursor () {
	var tx = DB.SQL.transaction("users", DB.READ_WRITE)
  var store = tx.objectStore("users")
	var req = store.openCursor()
	req.onsuccess = function (evt) {
		var cursor = evt.target.result
		if(cursor){ // 必要检查
			var value = cursor.value
			if(value.name == '杨幂'){
				value.age = 16
				cursor.update(value) // 修改数据(必须是读写模式)
			}
			if(value.name == '柳岩'){
				cursor.delete()  // 删除当前项
			}
			cursor.continue() // 移动到下一项
		}
	}
	req.onerror = function (evt) {
		console.error("openCursor error:", evt.target.errorCode || evt.target.error)
	}
}

function indexGetData () {
	var tx = DB.SQL.transaction("users", DB.READ_WRITE)
  var store = tx.objectStore("users")
	var index = store.index("name")
	var req = index.get("杨幂")
	req.onsuccess = function (evt) {
		console.log("indexGet success" , evt.target.result)
	}
	req.onerror = function (evt) {
		console.error("indexGet error:", evt.target.errorCode || evt.target.error)
	}
}

function indexOpenCursor () {
	var tx = DB.SQL.transaction("users", DB.READ_WRITE)
  var store = tx.objectStore("users")
	var index = store.index("name")
	var req = index.openCursor()
	req.onsuccess = function (evt) {
		var cursor = evt.target.result
		if(cursor){ // 必要检查
			var value = cursor.value
			cursor.continue() // 移动到下一项
		}
	}
	req.onerror = function (evt) {
		console.error("openCursor error:", evt.target.errorCode || evt.target.error)
	}
}

function indexNames () {
	var tx = DB.SQL.transaction("users", DB.READ_WRITE)
  var store = tx.objectStore("users")
	var indexNames = store.indexNames
	var index, i = 0, len = indexNames.length
	while(i < len){
		index = store.index(indexNames[i++])
	}
}