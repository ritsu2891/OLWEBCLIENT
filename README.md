# OLWEBCLIENT
Simple Data Graph Web Application with Nuxt.js

DBに書き込んだデータをグラフで表示するWEBアプリケーションです。研究室で作成するデモに向けて作成しました。[OLCOMDIS](https://github.com/ritsu2891/OLCOMDIS)と一緒に使う事で、データロガーからデータを読み込みグラフで表示するまでの流れが出来上がります。本リポジトリにはフロントエンド部分のみをおいています。バックエンドは検証時には[SQLer](https://github.com/alash3al/sqler)を使っています。（設定ファイルはこのリポジトリの`backend/config.hcl`）

## 動作画面イメージ
![screenshot](https://user-images.githubusercontent.com/25300684/63503337-3c171000-c50a-11e9-884e-ea45663bc3ba.png)

## 想定環境
最新のCrome, FirefoxまたはSafari。検証は基本的にChromeでしか行っていませんが、最新のAPIを直接使ってはいないので多分動く（？）

## 利用ライブラリ等
開発にはNuxt.jsを使っています。ライブラリのインストール等については[公式のドキュメント](https://nuxtjs.org/guide/commands)をご覧下さい。
表示関係では**Bootstrap**および**Chart.js**を使っていますが、普通にURLで読み込むので特にインストール等は必要ありません。

## 現時点（2019/08/22）で実現した機能
- 特定のテーブルのデータでグラフを壁画（更新の度に全て書き換え）
- 特定のテーブルのデータのレコードの値一つを表示
- 特定のテーブルについて更新する必要があるかを、更新日時記録テーブルのレコードを参照して判定する -> 不要な壁画更新は行わない ※OLCOMDIS側でまだ対応できていません
