## Reciper 是什么？

Reciper 是一个文档生成工具，它可以将 Markdown 文档构建成站点。

<img src="http://localhost/Develop/reciper/book.png" srcset="http://localhost/Develop/reciper/book.png 2x" />

## 快速入门

#### 1. 创建一个项目目录并进入

```bash
mkdir demo
cd demo
```

#### 2. 创建一个 index.html 文件，里面这么写：

```html
<!DOCTYPE html>
<script src="//yanagieiichi.github.io/reciper/index.js"></script>
<script>
reciper({
  items: [
    { "text": "SubPage", "href": "/sub-page/" }
  ]
});
</script>
```

#### 3. 在项目目录下创建一个子目录 sub-page

```bash
mkdir sub-page
```

#### 4. 建立软链，将 sub-page/index.html 指向外面的 index.html

```bash
ln -s ../index.html sub-page/index.html
```

#### 5. 在 sub-page 中创建一个 README.md

```markdown
## 标题 1

内容 1

## 标题 2

内容 2
```

#### 6. 在目录上启动一个 http 服务

```bash
python -m SimpleHTTPServer
```

## 特点

* 简单易用
* 可定制主题
* 提供代码高亮

