# 未配置流水线之前本地打包发布脚本, 已废弃

npm run build

rsync -avz --delete dist/*  root@106.52.242.121:/home/fn1/chang
