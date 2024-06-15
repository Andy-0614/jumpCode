
## 1. 起因
#### 想做一個可以在內網 隨開隨用的 程式分享軟體
#### 於是就開始查適合的方案 
```vite + vue + sqlite```
## 2. 後續
1. 需要打包
2. 輸入框要帶有markdown語法顏色
3. 如果有大佬可以幫我繼續寫下去 🫠
## 3. 目前的執行方式
1. git clone https://github.com/Andy-0614/jumpCode.git
2. 到backend & frontend ```npm i```
3. cd frontend
4. npm run start
## 4. 目錄
### 後端
- `server.js `
### 設定檔
- `.env`
### 資料庫
- `data.db`
### 入口
- `App.vue`
- `index.html`
- `main.ts`
### 主要頁面
- `Home.html UI`
- `Write.vue 打字,上傳`
- `Read.vue 收尋,讀取`
- `Setting.vue 偏好`
### 瀏覽功能
- `info.vue 列出所有 (Read.vue) 搜尋結果`
- `edit.vue 根據 (info.vue) 決定編輯,刷新`
### Debug
- `Error.vue 顯示狀態`
