<div align="center" style="vertical-align: center;">
  <h1>OpenLab-WEBClient</h1>
  <h1>オープンラボ デモ用Webクライアント</h1>
  <img src="https://github.com/ritsu2891/OpenLab-WEBClient/raw/master/mdimg/js.png" height="80px" />
  <img src="https://github.com/ritsu2891/OpenLab-WEBClient/raw/master/mdimg/vue.svg" height="80px" />
  <img src="https://github.com/ritsu2891/OpenLab-WEBClient/raw/master/mdimg/chartjs.svg" height="80px" />
</div>

<br/>

![動作イメージ](https://github.com/ritsu2891/OpenLab-WEBClient/raw/master/mdimg/train.gif)

## 概要

DB に書き込んだデータをグラフで表示する WEB アプリケーションです。研究室で作成するデモに向けて作成しました。

## 背景

研究成果を発表するデモにおいて端末鵜の画面のように一般の人にとって表示が分かりづらいと、何をやっているかのイメージがつきづらいと思ったので、実際にシステムに応用したときにどんなシステムになるかを想像して Web ブラウザによりインターフェースを作成しました。単に分類結果を文字で示すのではなく、図や色で示すことで何を表しているのかが理解しやすくなるように努めました。

## 機能

### 異音検知

![異音検知動作イメージ](https://github.com/ritsu2891/OpenLab-WEBClient/raw/master/mdimg/train.gif)

プラレールの車輪に物が挟まっているか、また挟まっているものは何なのかという推定をするデモに対するインターフェースです。運行管理システムを想像し、列車お現在位置を飾りとして表示し異音の検知結果を時系列で画面下部に表示しています。

### 足音による人数推定

![足音による人数推定動作イメージ](https://github.com/ritsu2891/OpenLab-WEBClient/raw/master/mdimg/road.gif)

足音を 1 つのマイクで拾ってそこから何人が歩いているのかを推定するというデモに対するインターフェースです。防犯システムを想像し、画面上で「警戒」セット中に 1 人以上の足音を検知したら時系列でその結果を画面下部に表示し、画面上部に推定人数に応じた絵を表示します。
