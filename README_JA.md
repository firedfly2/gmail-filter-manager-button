# Gmail フィルター管理ボタン

Gmail のツールバーに **「フィルタ」** ボタンを追加し、クリックで **`#settings/filters`（フィルタとブロック中のアドレス）** を開きます。

---

## リポジトリ

**GitHub:** https://github.com/firedfly2/gmail-filter-manager-button

Git でのクローン:
```bash
git clone https://github.com/firedfly2/gmail-filter-manager-button.git
cd gmail-filter-manager-button
```

GitHub CLI の場合:
```bash
gh repo clone firedfly2/gmail-filter-manager-button
cd gmail-filter-manager-button
```

- **Issues:** 不具合報告や機能要望は Issues タブへ  
- **Pull Requests:** どなたでも歓迎です。差分は最小に、概要とスクリーンショット/録画があると助かります

---

## 特長

- ミニマルにボタンを追加するだけです

---

## インストール（ローカル / アンパック）

1. 本リポジトリをダウンロードまたはクローン  
2. Chrome / Arc で `chrome://extensions` を開く  
3. 右上の **「デベロッパーモード」** を ON  
4. **「パッケージ化されていない拡張機能を読み込む」** をクリックし、このフォルダを選択  
5. Gmail をリロードすると、ツールバーにアイコンが表示されます

> 変更を加えた場合は、`chrome://extensions` で拡張の **「再読み込み」** を実行してください。

---

## 使い方

- ツールバーがある画面（受信トレイ、検索結果など）で常に表示されます  

---

## 仕組み（概要）

- コンテンツスクリプトがツールバー要素（`div[gh="mtb"]`）を監視し、**「︙」ボタンの直前**に自前ボタンを差し込みます  
- クリック時は URL の **ハッシュを `#settings/filters` に変更**し、Gmail の SPA ルーターに画面切替を委譲します

---

## トラブルシューティング

- **アイコンが出ない:** Gmail を再読み込み／ツールバー表示のある画面を確認／UI を変更する他拡張を一時的に無効化  
- **位置やホバーがずれる:** 最新版へ更新（整列・サイズは自動補正）  
- 解決しない場合は、DevTools の Elements から `div[gh="mtb"]` 配下の DOM（該当部分）を共有してください

---

## 権限・プライバシー

- 追加のブラウザ権限は一切要求しません  
- 外部ネットワークへの送信は行いません

---

## ライセンス

MIT
