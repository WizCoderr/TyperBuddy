# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


## How to create a blog post

1) open **blog-post-data.ts**, here we have to generate a blog id first
2) **npm run url** or **bun run url**, and then enter the title of the blog. It will generate the blog id
3) use the blog id to create a new blog
4) add image for your blog post, open **/assets/img/blogs/** folder and paste your blog image. Prefer to download the image from **unsplash.com** with medium quality image.
5) Now, import the blog image with the suitable name. see the example for already created there.
6) Visit **/pages/blogs/** and duplicate any existing blog. 
7) Now, **rename** the duplicated blog with **id (generated by the script)**.
8) Write your content and publish the post.




