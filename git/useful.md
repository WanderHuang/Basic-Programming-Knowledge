# 一天一个 git 小技巧

### 查看一个项目最新的提交在哪里

```shell
git for-each-ref --sort=-committerdate refs/heads/

# or DESC
git branch --sort=-committerdate

# or ASC
git branch --sort=committerdate

# 高级用法
git for-each-ref --sort=committerdate refs/heads/ --format='%(HEAD) %(color:yellow)%(refname:short)%(color:reset) - %(color:red)%(objectname:short)%(color:reset) - %(contents:subject) - %(authorname) (%(color:green)%(committerdate:relative)%(color:reset))'
```
