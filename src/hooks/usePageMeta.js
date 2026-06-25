import { useEffect } from 'react';

export function usePageMeta({ page, title, description }) {
  useEffect(() => {
    document.body.dataset.page = page;
    document.title = title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag && description) {
      descriptionTag.setAttribute('content', description);
    }

    window.scrollTo(0, 0);
  }, [page, title, description]);
}
