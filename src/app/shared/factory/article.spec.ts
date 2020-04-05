import {
  createMockArticleDoc,
  mockArticleDoc,
  mockArticleCollection,
  createMockArticleCollection,
  createMockArticleDocOfStore,
  createMockArticleCollectionOfStore,
  mockArticleCollectionOfStore,
  mockArticleDocOfStore
} from './article';
import * as firebase from 'firebase';

describe('article factory', () => {
  describe('createMockArticleDoc', () => {
    it('default は、決められた mock article doc を返す', () => {
      const expected = mockArticleDoc;
      const result = createMockArticleDoc();
      expect(result).toEqual(expected);
    });
    it('override された時、その内容を反映すること', () => {
      const expected = {
        title: 'Test Article 1 updated',
        contents: 'updated',
        imageSrc: 'https://homepages.cae.wisc.edu/~ece533/images/tulips.png',
        createdAt: firebase.firestore.Timestamp.fromDate(new Date())
      };

      const result = createMockArticleDoc({
        title: 'Test Article 1 updated',
        contents: 'updated'
      });
      expect(result.title).toEqual(expected.title);
      expect(result.contents).toEqual(expected.contents);
    });
  });

  describe('createMockArticleCollection', () => {
    it('default は、決められた mock article collection を返す', () => {
      const expected = mockArticleCollection;
      const result = createMockArticleCollection();
      expect(result).toEqual(expected);
    });

    it('override された時、その内容を反映すること', () => {
      const newItem = {
        title: 'Test Article 1 updated',
        contents: 'updated',
        imageSrc: 'https://homepages.cae.wisc.edu/~ece533/images/tulips.png',
        createdAt: firebase.firestore.Timestamp.fromDate(new Date())
      };
      const expected = [...mockArticleCollection, newItem];
      const result = createMockArticleCollection(newItem);

      expect(result).toEqual(expected);
    });
  });

  describe('createMockArticleDocOfStore', () => {
    it('default は、決められた mock article doc を返す', () => {
      const expected = mockArticleDocOfStore;
      const result = createMockArticleDocOfStore();
      expect(result).toEqual(expected);
    });
    it('override された時、その内容を反映すること', () => {
      const expected = {
        title: 'Test Article 1 updated',
        contents: 'updated',
        imageSrc: 'https://homepages.cae.wisc.edu/~ece533/images/tulips.png',
        createdAt: firebase.firestore.Timestamp.fromDate(new Date())
      };

      const result = createMockArticleDocOfStore({
        title: 'Test Article 1 updated',
        contents: 'updated'
      });
      expect(result.title).toEqual(expected.title);
      expect(result.contents).toEqual(expected.contents);
    });
  });

  describe('createMockArticleCollection', () => {
    it('default は、決められた mock article collection を返す', () => {
      const expected = mockArticleCollectionOfStore;
      const result = createMockArticleCollectionOfStore();
      expect(result).toEqual(expected);
    });

    it('override された時、その内容を反映すること', () => {
      const newItem = {
        id: '3',
        title: 'Test Article 1 updated',
        contents: 'updated',
        imageSrc: 'https://homepages.cae.wisc.edu/~ece533/images/tulips.png',
        createdAt: firebase.firestore.Timestamp.fromDate(new Date())
      };
      const expected = [...mockArticleCollectionOfStore, newItem];
      const result = createMockArticleCollectionOfStore(newItem);

      expect(result).toEqual(expected);
    });
  });
});
