import { within, render, screen } from '@testing-library/react';

import { posts, categories } from './fixures';
import { dateString } from '../lib/misc';
import Home from '../pages';

test('home page', () => {
  render(<Home posts={posts} categories={categories} />);
  const heading = screen.getByRole('heading', {
    name: /radi's blog/i,
  });
  expect(heading).toBeInTheDocument();

  const categoriesSection = document.querySelector('.categories');
  categories.forEach((category) =>
    expect(
      within(categoriesSection).getByRole('link', { name: category })
    ).toBeInTheDocument()
  );

  const postsSection = document.querySelector('.posts');

  posts.forEach((post) => {
    const date = dateString(post.date);
    expect(
      within(postsSection).getByRole('link', { name: post.title })
    ).toBeInTheDocument();
    expect(within(postsSection).getByText(date)).toBeInTheDocument();
    expect(
      within(postsSection).getByText(post.description)
    ).toBeInTheDocument();
    expect(
      within(postsSection).getAllByRole('link', { name: 'more >' }).length
    ).toBe(4);
  });
});
