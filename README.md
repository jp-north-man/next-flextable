# 紹介
next-flextableはCRMでよく見る自由度の高いテーブルをUI側で作成するサンプルコードです。

# 実行方法
フロントエンドのソースコードをクローンします。
```
git clone https://github.com/jp-north-man/next-flextable.git
```
```
npm install -D tailwindcss postcss autoprefixer
npm install react-icons --save
npx tailwindcss init -p
npm install uuid
``
実行
```
npm run dev
``
バックエンド側ののソースコードをクローンします。
```
git clone https://github.com/jp-north-man/flextable-backend.git
```
実行
```
docker-compose up --build
go run main.go
``
