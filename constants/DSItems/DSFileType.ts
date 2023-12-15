export enum DSFileType {
  Unknown_1 = 1,
  Unknown_2 = 2,
  Unknown_3 = 3,
  Unknown_4 = 4,
  Spreadsheet = 5,
  Presentation = 6,
  Document = 7,
}

export const getFileTypeFullName = (fileType: DSFileType) => {
  switch (fileType) {
    case 5:
      return 'Spreadsheet XSLX';
    case 6:
      return 'Presentation PPTX';
    case 7:
      return 'Document DOCX';
    default:
      return 'Unknown';
  }
};
