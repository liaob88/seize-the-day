import { Article, ArticleOfStore } from './../models';
import * as firebase from 'firebase';

export const mockArticleDoc: Article = {
  title: 'Test Article 1',
  contents:
    'テストテストテストテストテストテストテストテストテストテストテストテストテストテスト',
  imageSrc: 'https://homepages.cae.wisc.edu/~ece533/images/tulips.png',
  createdAt: firebase.firestore.Timestamp.fromDate(new Date('2020-01-01'))
};

export const mockArticleCollection: Article[] = [
  {
    title: 'Test Article 1',
    contents:
      'テストテストテストテストテストテストテストテストテストテストテストテストテストテスト',
    imageSrc: 'https://homepages.cae.wisc.edu/~ece533/images/tulips.png',
    createdAt: firebase.firestore.Timestamp.fromDate(new Date('2020-01-01'))
  },
  {
    title: 'Test Article 2',
    contents:
      'テストテストテストテストテストテストテストテストテストテストテストテストテストテスト',
    imageSrc: 'https://homepages.cae.wisc.edu/~ece533/images/tulips.png',
    createdAt: firebase.firestore.Timestamp.fromDate(new Date('2020-01-01'))
  }
];

export const mockArticleDocOfStore: ArticleOfStore = {
  id: '1',
  title: 'title テスト1',
  contents: 'contents テスト1',
  imageSrc: 'https://homepages.cae.wisc.edu/~ece533/images/tulips.png',
  createdAt: firebase.firestore.Timestamp.fromDate(new Date('2020-01-01'))
};

export const mockArticleCollectionOfStore: ArticleOfStore[] = [
  {
    id: '1',
    title: 'Test Article 1',
    contents:
      'テストテストテストテストテストテストテストテストテストテストテストテストテストテスト',
    imageSrc: 'https://homepages.cae.wisc.edu/~ece533/images/tulips.png',
    createdAt: firebase.firestore.Timestamp.fromDate(new Date('2020-01-01'))
  },
  {
    id: '2',
    title: 'Test Article 2',
    contents:
      'テストテストテストテストテストテストテストテストテストテストテストテストテストテスト',
    imageSrc: 'https://homepages.cae.wisc.edu/~ece533/images/tulips.png',
    createdAt: firebase.firestore.Timestamp.fromDate(new Date('2020-01-01'))
  }
];

export const createMockArticleDoc = (override?: Partial<Article>): Article => {
  return {
    ...mockArticleDoc,
    ...override
  };
};

export const createMockArticleCollection = (override?: Article): Article[] => {
  if (override) {
    return [...mockArticleCollection, override];
  } else {
    return [...mockArticleCollection];
  }
};

export const createMockArticleDocOfStore = (
  override?: Partial<ArticleOfStore>
): ArticleOfStore => {
  return {
    ...mockArticleDocOfStore,
    ...override
  };
};

export const createMockArticleCollectionOfStore = (
  override?: ArticleOfStore
): ArticleOfStore[] => {
  if (override) {
    return [...mockArticleCollectionOfStore, override];
  } else {
    return [...mockArticleCollectionOfStore];
  }
};
