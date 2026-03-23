## 🧠 專案背景（Background）

身為 UX/UI 設計師，長時間專注於設計流程與介面思考，偶爾也會擔心自己逐漸生疏實際切版與前端實作的細節。  
因此在近期時間較為允許的情況下，我選擇回頭修正並完成去年尚未完全處理好的專案。

本次重構重點放在：

- 補齊 **Sass 樣式架構**，讓樣式層級與維護性更清楚  
- 修正與完善 **無障礙（Accessibility）** 細節  
- 重新熟悉切版流程與前端實作節奏  

對我而言，這不只是一個完成專案的過程，更像是一次回到基礎、重新校準設計與實作能力的練習。

---

## 📁 專案結構與樣式架構說明

本專案採用 **Sass（SCSS）** 作為樣式管理方式，並依照「基礎設定 / 版面 / 元件」進行模組化拆分，以提升可讀性與後續維護性。

```txt
TRAFFICBUS/
├── css/
│   ├── bootstrap.min.css      # Bootstrap 編譯後樣式
│   ├── style.css              # 專案主要樣式（由 Sass 編譯）
│   └── style.css.map
├── images/                    # 圖片資源
├── js/                        # 前端互動腳本
├── sass/
│   ├── _Bootstrap/            # Bootstrap 客製化相關設定
│   ├── base/                  # 全站基礎樣式
│   │   ├── _variables.scss    # 變數（顏色、字級、間距等）
│   │   ├── _mixins.scss       # 共用 mixins
│   │   ├── _reset.scss        # Reset / Normalize
│   │   ├── _accessibility.scss# 無障礙相關樣式
│   │   ├── _animate.scss      # 動畫相關設定
│   │   └── _index.scss        # base 匯總入口
│   ├── components/            # 元件樣式
│   │   ├── _header.scss
│   │   ├── _banner.scss
│   │   ├── _route.scss
│   │   ├── _spot.scss
│   │   ├── _transport.scss
│   │   └── _modal.scss
│   ├── layout/                # 版面配置
│   │   ├── _container.scss
│   │   └── _footer.scss
│   └── style.scss             # Sass 主入口檔
├── index.html
├── package.json
└── README.md


Repo page : https://zhongjess.github.io/Penghu-Airport/

