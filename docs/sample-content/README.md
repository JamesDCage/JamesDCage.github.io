# Sample Content

These files are test content for the blog site implementor. They include:

- **2026-04-13-batman-and-superman.md** — A longer article with a hero image and an inline image. Tests hero tile layout (1.3.2.2) and article page reading experience.
- **2026-04-08-black-bean-soup.md** — A shorter article with a main image, headings, lists, and a different tag. Tests main image tile layout (1.3.2.1) and article body formatting.
- **manifest.json** — A sample manifest with all three post types: hero article, main article, and video-only post. Ready to use for home page testing.

## Image path note

In the Markdown source files, image paths are relative (e.g., `images/2026-04-13-heroes.jpg`). In the manifest.json and the final HTML on the blog site, image paths must be absolute from the site root (e.g., `/posts/images/2026-04-13-heroes.jpg`). The blog-manager will need to rewrite image paths during Markdown-to-HTML conversion.

## Placeholder images

The implementor will need to provide placeholder images for testing. Any images will do — the content and dimensions don't need to match the articles. Suggested sizes:
- Hero images: approximately 1200x600px
- Main images: approximately 800x500px  
- Video thumbnails: approximately 640x360px (16:9)
