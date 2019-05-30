'use strict';

chrome.tabs.query({ active: true }, ([{ url }]) =>  {
  const urlParts = new URL(url);
  const ex = urlParts.searchParams.get('ex');

  if (ex) {
    const variantLinks = document.querySelectorAll('a');
    variantLinks.forEach((link) => {
      const [, variant] = link.getAttribute('id').match(/^variant-(\d)$/);
      const [, experiment] = ex.match(/^([A-Z]+-[0-9]+)\.\d$/);

      urlParts.searchParams.delete('ex');
      urlParts.searchParams.set('fex', `${experiment}.${variant}`);
      link.setAttribute('href', urlParts.toString());
    });
  }
});

