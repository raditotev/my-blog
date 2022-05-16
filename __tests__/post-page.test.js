import { render, screen } from '@testing-library/react';

import { post, mockedPostContent } from './fixures';
import PostPage from '../pages/posts/[id]';
import { dateString } from '../lib/misc';

test('post page', () => {
  render(<PostPage post={post} />);

  expect(
    screen.getByRole('heading', {
      name: /radi's blog/i,
    })
  ).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: post.title })).toBeInTheDocument();
  expect(screen.getByText(dateString(post.date))).toBeInTheDocument();
  expect(screen.getByText(mockedPostContent)).toBeInTheDocument();
  post.categories.forEach((category) => {
    expect(screen.getByRole('link', { name: category })).toHaveAttribute(
      'href',
      `/categories/${category}`
    );
  });
  expect(screen.getByRole('link', { name: '🏠' })).toHaveAttribute('href', '/');
});
