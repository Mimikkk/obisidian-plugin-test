export namespace Tailwind {
  export const create = () =>
    Object.assign(document.createElement('script'), {
      type: 'text/javascript',
      src: 'https://cdn.tailwindcss.com',
    });
}
