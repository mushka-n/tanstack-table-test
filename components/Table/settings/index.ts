import { ContentSettingsMap } from '../types';
import { FileContentSettings } from './FileContentSettings';
import { UserContentSettings } from './UserContentSettings';

export const ContentSettings: ContentSettingsMap = {
  file: FileContentSettings,
  user: UserContentSettings,
};
