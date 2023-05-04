const { contextBridge, ipcRenderer } = require('electron')
const setTitle=async (title)=>{
   let result= await ipcRenderer.invoke('on-settitle-event', title)
   
}
// 浏览器打开页面
const openByBrowser=(url)=>{
    ipcRenderer.invoke('on-useOpenByBrowser-event',url)
}
// 页面全屏 缩小 关闭
const setScreen=(value)=>{
    ipcRenderer.invoke('on-setScreen-event',value)
}
const testXls= async(content)=>{
    let result = await ipcRenderer.invoke('on-testXls-event', content)
    return result
}
contextBridge.exposeInMainWorld('electronAPI', {
    setTitle,
    openByBrowser,
    setScreen,
    testXls,
    ipcRenderer: { ...ipcRenderer, on:  ipcRenderer.on.bind(ipcRenderer) }
})
