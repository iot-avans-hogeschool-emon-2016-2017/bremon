import { BremonPage } from './app.po';

describe('bremon App', () => {
  let page: BremonPage;

  beforeEach(() => {
    page = new BremonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
