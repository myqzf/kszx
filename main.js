const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const electron = require('electron')
const dialog = electron.dialog
const globalShortcut = electron.globalShortcut


// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let win

function createWindow () {
  // 创建浏览器窗口。
  win = new BrowserWindow({
	  width: 1920, 
	  height: 1080,
	  resizable: false,
      movable: false,
	  minimizable: false,
	  kiosk: true,
	  alwaysOnTop :true,
	  fullscreen:true,
	  webPreferences: {
		  defaultEncoding: 'UTF-8'
	  }
	  })

  // 加载应用的 index.html。
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  //设置全屏
  win.setFullScreen(true)
  //让窗口不在任务栏中显示.
  //win.setSkipTaskbar(true)
  //kiosk 模式.
  win.setKiosk(true)
  // 打开开发者工具。
  //win.webContents.openDevTools()

  win.on('move', () => {
   win.setFullScreen(true)
  })
   win.on('leave-full-screen', () => {
     // win.setFullScreen(true)
     //app.quit()
	  //dialog.showMessageBox({
	// dialog.showErrorBox('一条错误信息', '错误消息演示.')
      //type: 'info',
     // message: '成功!',
     // detail: '你按下了一个全局注册的快捷键绑定.',
     // buttons: ['好的']
    //})
  })
  win.on('blur', () => {
   //win.setFullScreen(true)
   //app.quit()
   // dialog.showMessageBox({
	//	 dialog.showErrorBox('一条错误信息', '错误消息演示.')
     // type: 'info',
     // message: '成功!',
     // detail: 'sk你按下了一个全局注册的快捷键绑定.',
     // buttons: ['好的']
    //})
  })
  
  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })
  win.on('app-command', function (e, cmd) {
  // Navigate the window back when the user hits their mouse back button
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
  
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

//app.on('move', () => {
 // if (process.platform !== 'darwin') {
 //   app.quit()
 // }
//})

app.on('ready', function () {
  globalShortcut.register('Super+D', function () {
    dialog.showMessageBox({
      type: 'info',
      message: '成功!',
      detail: '你按下了一个全局注册的快捷键绑定.',
      buttons: ['好的']
    })
  })
})

app.on('ready', () => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register('Alt+Tab', () => {
    // Do stuff when Y and either Command/Control is pressed.
	 app.quit()
  })
})



//app.on('ready', function () {
//  var electronScreen = electron.screen
//  var size = electronScreen.getPrimaryDisplay().workAreaSize
//  mainWindow = new BrowserWindow({ width: size.width, height: size.height })
//})

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在这文件，你可以续写应用剩下主进程代码。
  // 也可以拆分成几个文件，然后用 require 导入。
  if (win === null) {
    createWindow()
  }
})

// 在这文件，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。


