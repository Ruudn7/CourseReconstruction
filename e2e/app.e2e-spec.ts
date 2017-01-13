import { CourseSystemPage } from './app.po';

describe('course-system App', function() {
  let page: CourseSystemPage;

  beforeEach(() => {
    page = new CourseSystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
