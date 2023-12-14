import { File, User } from './Table/types';

export const peopleData: User[] = [
  {
    id: '3fcfa5c9-19b3-4bb2-8d30-3192143a5c4e',
    displayName: 'Никита Мушка',
    avatarSmall:
      '/static/images/default_user_photo_size_32-32.png?hash=819878304',
    profileUrl: 'https://namushka.onlyoffice.com/accounts/view/nikitamushka',
    hasAvatar: false,
  },
  {
    id: 'b626be14-cf4f-475b-990b-7e1eacd44903',
    displayName: 'Иван Иванов',
    avatarSmall:
      '/static/images/default_user_photo_size_32-32.png?hash=819878304',
    profileUrl: 'https://namushka.onlyoffice.com/accounts/view/ivanivanov',
    hasAvatar: false,
  },
];

export const fileData: File[] = [
  {
    id: 1,
    title: 'New Presentation',
    author: peopleData[0],
    contentLength: '3.7 MB',
    created: new Date('2023/12/12'),
    updated: new Date('2023/12/24'),
    fileType: 6,
  },
  {
    id: 1,
    title: 'New Document',
    author: peopleData[1],
    contentLength: '2.71 MB',
    created: new Date('2023/12/12'),
    updated: new Date('2023/12/24'),
    fileType: 7,
  },
  {
    id: 1,
    title: 'New Spreadsheet',
    author: peopleData[0],
    contentLength: '8.9 MB',
    created: new Date('2023/12/12'),
    updated: new Date('2023/12/24'),
    fileType: 5,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onlyofficeFile = {
  folderId: 920,
  version: 1,
  versionGroup: 1,
  contentLength: '33.89 KB',
  pureContentLength: 34699,
  fileStatus: 0,
  mute: false,
  viewUrl:
    'https://namushka.onlyoffice.com/filehandler.ashx?action=download&fileid=592140',
  webUrl: 'https://namushka.onlyoffice.com/doceditor?fileid=592140&version=1',
  fileType: 6,
  fileExst: '.pptx',
  comment: 'Created',
  thumbnailStatus: 3,
  denyDownload: false,
  denySharing: false,
  viewAccessibility: {
    ImageView: false,
    MediaView: false,
    WebView: true,
    WebEdit: true,
    WebReview: false,
    WebCustomFilterEditing: false,
    WebRestrictedEditing: false,
    WebComment: true,
    CoAuhtoring: true,
    CanConvert: true,
    MustConvert: false,
  },
  id: 592140,
  rootFolderId: 920,
  canShare: true,
  security: {
    Read: true,
    Comment: true,
    FillForms: true,
    Review: true,
    Edit: true,
    Delete: true,
    CustomFilter: true,
    Rename: true,
    ReadHistory: true,
    Lock: false,
    EditHistory: true,
    Copy: true,
    Move: true,
    Duplicate: true,
    SubmitToFormGallery: false,
    Download: true,
    Convert: true,
  },
  title: 'New presentation.pptx',
  access: 0,
  shared: false,
  created: '2023-12-13T15:56:30.0000000+03:00',
  createdBy: {
    id: '3fcfa5c9-19b3-4bb2-8d30-3192143a5c4e',
    displayName: 'Никита Мушка',
    avatarSmall:
      '/static/images/default_user_photo_size_32-32.png?hash=819878304',
    profileUrl: 'https://namushka.onlyoffice.com/accounts/view/nikitamushka',
    hasAvatar: false,
  },
  updated: '2023-12-13T15:56:30.0000000+03:00',
  rootFolderType: 5,
  updatedBy: {
    id: '3fcfa5c9-19b3-4bb2-8d30-3192143a5c4e',
    displayName: 'Никита Мушка',
    avatarSmall:
      '/static/images/default_user_photo_size_32-32.png?hash=819878304',
    profileUrl: 'https://namushka.onlyoffice.com/accounts/view/nikitamushka',
    hasAvatar: false,
  },
};