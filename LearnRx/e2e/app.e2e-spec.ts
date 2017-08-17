import { LearnRxPage } from './app.po';

describe('learn-rx App', () => {
  let page: LearnRxPage;

  beforeEach(() => {
    page = new LearnRxPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
