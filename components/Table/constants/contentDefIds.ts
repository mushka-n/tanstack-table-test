export const ContentDefIds = {
  file: {
    columns: {
      title: 'file-column-title',
      room: 'file-column-room',
      author: 'file-column-author',
      dateCreated: 'file-column-dateCreated',
      dateUpdated: 'file-column-dateUpdated',
      size: 'file-column-size',
      type: 'file-column-type',
      contextBtn: 'file-column-contextBtn',
    },
    rows: {
      default: 'file-row-default',
      trash: 'file-trash-default',
    },
    tiles: {
      default: 'file-tile-default',
    },
  },

  user: {
    columns: {
      Name: 'user-column-name',
      Type: 'user-column-type',
      Email: 'user-column-email',
      ContextBtn: 'user-column-contextBtn',
    },
    rows: {
      Default: 'user-row-default',
    },
    tiles: {},
  },
} as const;
