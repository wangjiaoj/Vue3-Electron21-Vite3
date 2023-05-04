// @ts-ignore
const {ipcMain,BrowserWindow,shell} =require('electron')
const {createMainWindow} = require( '../../windows/mainWindows.js')

const xlsx = require('node-xlsx')
const settitle=()=>{
    // @ts-ignore
    ipcMain.handle('on-settitle-event',(event,title)=>{
            const webContents = event.sender
            const win = BrowserWindow.fromWebContents(webContents)
            console.log('title------------',title)
            win.setTitle(title)
      return '已收到'
    })
}
// 浏览器打开页面
const openByBrowser=()=>{
    // @ts-ignore
    ipcMain.handle('on-useOpenByBrowser-event',(event,url)=>{
       shell.openExternal(url)
    })
}
// 登录 展示首页
const setlogin=()=>{
    // @ts-ignore
    ipcMain.handle('on-setlogin-event',(event,title)=>{
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.close()
        createMainWindow(BrowserWindow)
        return '已经登录'
    })
}
// 加载页判断登录或者展示首页
const isShowLogin=()=>{
    // @ts-ignore
    ipcMain.handle('on-isshowlogin-event',(event,value)=>{
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.close()
        createMainWindow(BrowserWindow)
        return ''
    })
}
// 首页屏幕缩小 放大 关闭控制
const setScreen=()=>{
    // @ts-ignore
    ipcMain.handle('on-setScreen-event',(event,value)=>{
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        if(value==='miniScreen'){
            win.minimize()
        }else if(value==='fullScreen'){
            if(win.isMaximized()){
                win.restore()
            }else{
                win.maximize()
            }
        }else if(value==='closeScreen'){
            win.close()
        }
        return ''
    })
}
 
const testXls = ()=>{
  
    ipcMain.handle('on-testXls-event',(event,value)=>{
         
         let buffer = Buffer.from(value); //Buffer  
         const workSheetsFromBuffer = xlsx.parse(buffer)
         let data = []
        if (!workSheetsFromBuffer || !workSheetsFromBuffer.length) {
             
           //`第${sourceIndex}个excel文件解析失败，可能是空文件或者文件太大`)
        }else {        
            for (let i = 0; i < workSheetsFromBuffer.length; i++) {
             const shetData = handleTableSheet(workSheetsFromBuffer[i].data)
             data = data.concat(shetData)   
            }
        }
        // const webContents = event.sender
        // const win = BrowserWindow.fromWebContents(webContents)
        // win.close()
        return data
    })
 
}
const handleTableSheet = (table) => {
    
    // 进行空行和编号校验
    //const emptyOrderAccouts = []
    for (let i = table.length - 1; i >= 0; i--) {
      if (table[i].every(x => !x)) {
        table.splice(i, 1)
      } 
    }
    tableContainer = table.slice(1)
    return tableContainer
  }
 
const InitController=(app)=>{
        settitle(),
        openByBrowser(),
        setlogin(),
        isShowLogin(),
        setScreen(),
        testXls()
}

module.exports={
    InitController,

}
