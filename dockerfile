# ベースイメージを選択
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# パッケージファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# .envをコピー
COPY .env .env
RUN npx prisma generate
ENV API_URL=http://api:3001
# Next.js のビルドを実行（必要に応じて）
RUN npm run build
# コンテナ起動時のコマンド
CMD ["npm", "start"]

# アプリケーションのポートを開放
EXPOSE 3001