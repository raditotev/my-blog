import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });

  return JSON.stringify(allPostsData);
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getAllCategoryIds() {
  const categories = getCategories();
  return categories.map((category) => {
    return {
      params: {
        category,
      },
    };
  });
}

export function getPostData(id) {
  const filePath = path.join(postsDirectory, id + '.md');
  const fileContents = fs.readFileSync(filePath, 'utf-8');

  const matterResult = matter(fileContents);

  return JSON.stringify({
    id,
    ...matterResult.data,
    markdown: matterResult.content,
  });
}

export function getCategories() {
  const categories = [];
  const fileNames = fs.readdirSync(postsDirectory);
  fileNames.forEach((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const matterResult = matter(fileContents);
    categories.push(...matterResult.data.categories);
  });

  return categories.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
}

export function getPostsByCategory(category) {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return JSON.stringify(
    allPostsData.filter((post) => post.categories.includes(category))
  );
}
