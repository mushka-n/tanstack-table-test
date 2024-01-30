import {
  ContentViewsMap,
  DefaultContentSettingsMap,
} from '../types/contentSettings';

import {
  FileContentViews,
  FileDefaultContentSettings,
} from './FileContentSettings';

import {
  UserContentViews,
  UserDefaultContentSettings,
} from './UserContentSettings';

export const ContentViews: ContentViewsMap = {
  file: FileContentViews,
  user: UserContentViews,
} as const;

export const DefaultContentSettings: DefaultContentSettingsMap = {
  file: FileDefaultContentSettings,
  user: UserDefaultContentSettings,
};
