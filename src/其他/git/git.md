# git

- 状态

git status

- 添加到暂存区

git add -A

- 添加到版本库

git commit -m ""

- 状态

git status -s

- 工作区的修改

git diff 

- 暂存区的修改

git diff -cached

- 删除

git rm *

git rm --cached *

- mv

git mv a A

- 撤销

git reset HEAD * 

git checkout -- *

- 切换分支

git checkout -b test


# 新建分支流程

git checkout -b test

git push origin test:test

git branch --set-upstream-to=origin/test test

git push