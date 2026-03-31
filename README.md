# Neptune Cash Website

This repo stores the website for the Neptune Cash cryptocurrency.

## Contributing

Contributions are welcome :)

If you want to contribute, please create an issue to discuss your proposed changes before starting
work on a pull request

## Articles

New articles can be published by adding them in the [MDX](https://mdxjs.com/) format, this format
enables adding interactive components and other elements to the posts.

### File structure of the `articles` folder

The structure of files in the articles folder is for organization purposes only. All articles, no
matter their location can be accessed at `/article/:slug`

### Frontmatter

Articles can be _configured_ with frontmatter, all fields are described below.

| field name  | description                                                                  | example data                                    |
| ----------- | ---------------------------------------------------------------------------- | ----------------------------------------------- |
| title       | article title                                                                | Intro to Neptune                                |
| description | article description                                                          | Best source of info to get started with Neptune |
| author      | article author(s)                                                            | John Doe & Jane Doe                             |
| type        | article type                                                                 | `learn` / `blog`                                |
| weight      | article weight (optional, used for ordering)                                 | 5                                               |
| pinned      | article will be shown at the top if set to true (optional)                   | true                                            |
| hidden      | article will not be visible in `/learn` or `/blog` if set to true (optional) | false                                           |
| imagegen    | internal unused field used when migrating articles to fill thumbnails        | A Merkle tree diagram                           |

#### Thumbnail `[thumbnail]`

| field name | description                                           | example data                              |
| ---------- | ----------------------------------------------------- | ----------------------------------------- |
| src        | image source, can be a relative path                  | /article-images/learn/ai/merkle-tree.jpeg |
| caption    | image caption, showed below image in the article page | Merkle tree diagram                       |

### Ordering

By default, newest articles are shown first on the `/learn`, and `/blog` pages, you can change that
using the `weight` and `pinned` fields as explained above, the ordering processes as follows

1. Pinned articles
2. Article weight (higher = shown higher)
3. Article post date

### Running locally on an Ubuntu machine, using bun
```bash
curl -fsSL https://bun.sh/install | bash
source $HOME/.bashrc
bun install
bun run dev
```