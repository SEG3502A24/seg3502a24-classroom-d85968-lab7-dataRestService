import { BookNamesPipe } from './booknames.pipe';

describe('BookNamesPipe', () => {
  it('create an instance', () => {
    const pipe = new BookNamesPipe();
    expect(pipe).toBeTruthy();
  });
});
