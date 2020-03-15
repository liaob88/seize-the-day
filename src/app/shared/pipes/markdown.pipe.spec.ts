import { MarkdownPipe } from './markdown.pipe';

describe('MarkdownPipe', () => {
  let pipe: MarkdownPipe;
  beforeEach(() => {
    pipe = new MarkdownPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('markdown が渡されると HTML を期待された形で返すこと', () => {
    const md = '# h1 タグ';
    const expected = '<h1 id="h1-タグ">h1 タグ</h1>';

    expect(pipe.transform(md).replace(/\r?\n/g, '')).toBe(expected);
  });
});
