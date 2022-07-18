#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

git add .

git commit -m '.'

git push 



cd public

git init 

git add . 

git commit -m '更新'

git git push -f https://github.com/wangchenbing/vuePress.git master:gh-pages

cd -