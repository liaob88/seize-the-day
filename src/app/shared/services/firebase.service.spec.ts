import {
  createMockArticleCollection,
  createMockArticleDoc
} from './../factory/article';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';

const MockFirebase = jasmine.createSpyObj('FirebaseService', [
  'getCollection',
  'getDoc',
  'createDoc',
  'updateDoc',
  'deleteDoc',
  'uploadToStorage',
  'getDLUrl'
]);

describe('FirebaseService', () => {
  beforeEach(() => {
    MockFirebase.getCollection.and.returnValue(
      of(createMockArticleCollection())
    );
    MockFirebase.getDoc.and.returnValue(of(createMockArticleDoc()));

    TestBed.configureTestingModule({
      providers: [{ provide: FirebaseService, useValue: MockFirebase }]
    });
  });

  it('should be created', () => {
    const service: FirebaseService = TestBed.get(FirebaseService);
    expect(service).toBeTruthy();
  });
});
