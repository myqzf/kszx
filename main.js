const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const electron = require('electron')
const dialog = electron.dialog
const globalShortcut = electron.globalShortcut


// ����һ������ window �����ȫ�����ã�����㲻��������
// �� JavaScript �����������գ� window �ᱻ�Զ��عر�
let win

function createWindow () {
  // ������������ڡ�
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

  // ����Ӧ�õ� index.html��
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  //����ȫ��
  win.setFullScreen(true)
  //�ô��ڲ�������������ʾ.
  //win.setSkipTaskbar(true)
  //kiosk ģʽ.
  win.setKiosk(true)
  // �򿪿����߹��ߡ�
  //win.webContents.openDevTools()

  win.on('move', () => {
   win.setFullScreen(true)
  })
   win.on('leave-full-screen', () => {
     // win.setFullScreen(true)
     //app.quit()
	  //dialog.showMessageBox({
	// dialog.showErrorBox('һ��������Ϣ', '������Ϣ��ʾ.')
      //type: 'info',
     // message: '�ɹ�!',
     // detail: '�㰴����һ��ȫ��ע��Ŀ�ݼ���.',
     // buttons: ['�õ�']
    //})
  })
  win.on('blur', () => {
   //win.setFullScreen(true)
   //app.quit()
   // dialog.showMessageBox({
	//	 dialog.showErrorBox('һ��������Ϣ', '������Ϣ��ʾ.')
     // type: 'info',
     // message: '�ɹ�!',
     // detail: 'sk�㰴����һ��ȫ��ע��Ŀ�ݼ���.',
     // buttons: ['�õ�']
    //})
  })
  
  // �� window ���رգ�����¼��ᱻ������
  win.on('closed', () => {
    // ȡ������ window ����������Ӧ��֧�ֶര�ڵĻ���
    // ͨ����Ѷ�� window ��������һ���������棬
    // ���ͬʱ����Ӧ��ɾ����Ӧ��Ԫ�ء�
    win = null
  })
  win.on('app-command', function (e, cmd) {
  // Navigate the window back when the user hits their mouse back button
  if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
    win.webContents.goBack()
  }
})
  
}

// Electron ���ڳ�ʼ����׼��
// �������������ʱ���������������
// ���� API �� ready �¼����������ʹ�á�
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
      message: '�ɹ�!',
      detail: '�㰴����һ��ȫ��ע��Ŀ�ݼ���.',
      buttons: ['�õ�']
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

// ��ȫ�����ڹر�ʱ�˳���
app.on('window-all-closed', () => {
  // �� macOS �ϣ������û��� Cmd + Q ȷ�����˳���
  // ������󲿷�Ӧ�ü���˵����ᱣ�ּ��
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // �����ļ����������дӦ��ʣ�������̴��롣
  // Ҳ���Բ�ֳɼ����ļ���Ȼ���� require ���롣
  if (win === null) {
    createWindow()
  }
})

// �����ļ����������дӦ��ʣ�������̴��롣
// Ҳ���Բ�ֳɼ����ļ���Ȼ���� require ���롣


