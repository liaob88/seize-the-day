interface MockFile {
  name: string;
  body: string;
  mimeType: string;
}

const createFileFromMockFile = (file: MockFile): File => {
  const blob = new Blob([file.body], { type: file.mimeType }) as any;
  // tslint:disable-next-line: no-string-literal
  blob['lastModifiedDate'] = new Date();
  // tslint:disable-next-line: no-string-literal
  blob['name'] = file.name;
  return blob as File;
};

export const createFileList = (files: MockFile[]) => {
  const fileList: FileList = {
    length: files.length,
    item(index: number): File {
      return fileList[index];
    }
  };
  files.forEach((file, index) => {
    fileList[index] = createFileFromMockFile(file);
  });

  return fileList;
};
