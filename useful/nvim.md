# neovim

[官网](https://neovim.io/)

## mac 下载

```
brew install neovim

```

## 使用

```

# 已经有vim并想同步使用配置，则可以使用这个方法
nvim
:help nvim-from-vim

# 主要就是教你软连接或者拷贝你的vim配置到nvim

```

我当时遇到了两个问题

1. 打开文件后色彩不对

```vim
let $NVIM_TUI_ENABLE_TRUE_COLOR=1
set termguicolors

```

2. 发现`insert`模式下 enter 键用不了

```vim
inoremap <Enter> <M-Enter>
```

## 刚切换过来的感受

1. 我用了`iterm2`和`tmux`，之前用`vim`死活配置不上`M`、`S`键的使用，就感觉有点浪费了键位。比如想用`M-S-f`来格式化文件。换成`nvim`之后就能用了，吹爆！[20210521更正，是由于.vimrc里面有用到enter的键位映射，coc相关的，去掉了就好了]
2. 有一些细节更流畅了，不知道是不是心里作用。😁

## 快捷键记忆

1. 删除xml标签内的内容：`dit`(delete inner tag block)
2. 相应地，修改xml标签内的内容: `cit`(change inner tag block)
3. 删除引号内的数据: `di"` (修改用`ci"`)
