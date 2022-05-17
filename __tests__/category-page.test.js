import { render, screen } from '@testing-library/react';
import CategoryPage from '../pages/categories/[category]';
import { posts } from './fixures';

const postsByCategory = (posts, category) =>
  posts.filter((post) => post.categories.includes(category));

describe('category page', () => {
  test('single post', () => {
    const selectedCategory = 's3';
    const filteredPosts = postsByCategory(posts, selectedCategory);
    render(<CategoryPage category={selectedCategory} posts={filteredPosts} />);

    expect(
      screen.getByRole('heading', {
        name: /radi's blog/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: `${selectedCategory}: ${filteredPosts.length} post`,
      })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /read more >/i }).length).toBe(
      1
    );
  });

  test('multiple posts', () => {
    const selectedCategory = 'ruby';
    const filteredPosts = postsByCategory(posts, selectedCategory);
    render(<CategoryPage category={selectedCategory} posts={filteredPosts} />);

    expect(
      screen.getByRole('heading', {
        name: `${selectedCategory}: ${filteredPosts.length} posts`,
      })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /read more >/i }).length).toBe(
      2
    );
  });
});
