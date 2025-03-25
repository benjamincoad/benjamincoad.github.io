# Windows 98-Styled Blog Reference Guide

## Basic Blog Post Template

```html
<div class="notepad-window">
    <div class="notepad-title-bar">
        <span class="notepad-title">Your Blog Title</span>
        <div class="title-bar-controls">
            <button class="title-bar-button">_</button>
            <button class="title-bar-button">□</button>
            <button class="title-bar-button">×</button>
        </div>
    </div>
    <div class="notepad-menu">
        <span>File</span>
        <span>Edit</span>
        <span>Format</span>
        <span>View</span>
        <span>Help</span>
    </div>
    <div class="notepad-content">
        <div class="blog-text">
            <div class="blog-title">Your Blog Title</div>
            <div class="blog-meta">Posted on [Date] • [Read Time]</div>

            <!-- Blog content goes here -->
            
        </div>
    </div>
    <div class="notepad-status">
        <span>Ready</span>
    </div>
</div>
```

## Blog Elements

### 1. Headers
```html
<div class="blog-title">Main Title</div>
<h2>Section Header</h2>
<h3>Subsection Header</h3>
```

### 2. Paragraphs
```html
<p>Your paragraph text goes here. These will have proper spacing and line height for readability.</p>
```

### 3. Images
```html
<div class="blog-image-container">
    <img src="your-image.jpg" alt="Image description">
    <div class="blog-image-caption">Your image caption here</div>
</div>
```

### 4. Code Blocks
```html
<div class="blog-code-title">filename.py</div>
<div class="blog-code">
def your_code():
    return "Hello, Windows 98!"
</div>
```

### 5. Lists
```html
<ul>
    <li>Unordered list item</li>
    <li>Another list item</li>
</ul>

<ol>
    <li>Ordered list item</li>
    <li>Another ordered item</li>
</ol>
```

### 6. Info Boxes
```html
<div class="blog-info">
    <div class="blog-info-title">
        <span>ℹ️</span>
        <span>Info Title</span>
    </div>
    Your information content goes here.
</div>
```

### 7. Quotes
```html
<div class="blog-quote">
    Your quote text goes here.
</div>
```

### 8. Tags
```html
<div class="blog-tags">
    <span class="blog-tag">Tag 1</span>
    <span class="blog-tag">Tag 2</span>
</div>
```

### 9. Dividers
```html
<div class="blog-divider"></div>
```

## Complete Example

```html
<div class="notepad-window">
    <div class="notepad-title-bar">
        <span class="notepad-title">How to Build a Blog</span>
        <div class="title-bar-controls">
            <button class="title-bar-button">_</button>
            <button class="title-bar-button">□</button>
            <button class="title-bar-button">×</button>
        </div>
    </div>
    <div class="notepad-menu">
        <span>File</span>
        <span>Edit</span>
        <span>Format</span>
        <span>View</span>
        <span>Help</span>
    </div>
    <div class="notepad-content">
        <div class="blog-text">
            <div class="blog-title">How to Build a Blog</div>
            <div class="blog-meta">Posted on July 2, 2024 • 3 min read</div>

            <div class="blog-info">
                <div class="blog-info-title">
                    <span>ℹ️</span>
                    <span>Quick Start</span>
                </div>
                This guide will help you create your first blog post.
            </div>

            <h2>Getting Started</h2>
            <p>Let's begin with the basic structure of a blog post.</p>

            <div class="blog-image-container">
                <img src="blog-example.jpg" alt="Blog Structure Example">
                <div class="blog-image-caption">Basic blog post structure</div>
            </div>

            <h2>Key Components</h2>
            <ul>
                <li>Clear title and metadata</li>
                <li>Well-structured content</li>
                <li>Engaging visuals</li>
                <li>Proper formatting</li>
            </ul>

            <h3>Code Implementation</h3>
            <div class="blog-code-title">blog.html</div>
            <div class="blog-code">
<div class="blog-title">
    Your Amazing Title
</div>
<p>Your content here...</p></div>

            <div class="blog-quote">
                "Good structure makes content more engaging and easier to read."
            </div>

            <div class="blog-divider"></div>

            <div class="blog-tags">
                <span class="blog-tag">HTML</span>
                <span class="blog-tag">CSS</span>
                <span class="blog-tag">Blogging</span>
            </div>
        </div>
    </div>
    <div class="notepad-status">
        <span>Ready</span>
    </div>
</div>
```

## Best Practices

1. Keep titles clear and concise
2. Use headers to organize content
3. Include relevant images with captions
4. Break up text with lists and quotes
5. Add tags for better categorization
6. Use info boxes for important notes
7. Maintain consistent spacing between elements
8. Add metadata (date, read time) for context
9. Close each post with relevant tags