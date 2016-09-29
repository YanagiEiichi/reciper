## What's the Reciper?

Reciper is a document creator, it build some markdown document to a website.

## Getting Started

#### 1. Create a directory as site root

```bash
mkdir demo
cd demo
```

#### 2. Create a index.html to site root

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

#### 3. Create a sub-page to site root

```bash
mkdir sub-page
```

#### 4. link index to sub-page

```bash
ln -s ../index.html sub-page/index.html
```

#### 5. Create README.md to sub-page

```markdown
## title 1

content 1

## title 2

content 2
```

#### 6. Start http server

```bash
python -m SimpleHTTPServer
```

## Feature

* Easy to use
* Customizable theme
* Highlighting Coding
