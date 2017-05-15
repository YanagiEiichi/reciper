## Reciperって何？

Reciperっては仕様書を作る工具、Markdown から仕様書サイートに転換することができる。

## 始める

#### 1. プロジェクトのルートデイレクトリを作成する

```bash
mkdir demo
cd demo
```

#### 2. index.html を作成する、内容はこれ：

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

#### 3. sub-page デイレクトリを作成する

```bash
mkdir sub-page
```

#### 4. sub-page に、外の index.html をソフトリンクする

```bash
ln -s ../index.html sub-page/index.html
```

#### 5. sub-page に、README.md を作成する、内容はこれ：

```markdown
## title 1

content 1

## title 2

content 2
```

#### 6. http サーバを起動する

```bash
python -m SimpleHTTPServer
```
