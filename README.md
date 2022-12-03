# Lapras 候補者チェックサポート

## What is this ?

Lapras のタレントプールの画面からプール済みの候補者のIDをスクレイピングし、
候補者を順次表示するためのChrome拡張です。

https://scout.lapras.com/talent_pool/

## 技術スタック

* TypeScript
* Webpack
* React

## 利用方法
1. 後述の手順でChrome拡張をビルドする。
2. Chromeから `chrome://extensions/` を開く。
3. 画面右上にある **「デベロッパーモード」** のトグルをクリックし、有効化する。
4. 画面左上にある **「パッケージ化されていない拡張機能を読み込む」** をクリックし、 1. でビルドして作成されたフォルダを指定する。

## アイコン

[【フリーアイコン】 アルファベット1](https://sozai.cman.jp/icon/string/alphabet1/)


## ビルド方法

### セットアップ

```bash
$ npm install
```

### ビルド
カレントディレクトリで以下のコマンドを実行
```bash
$ npm run build
```
