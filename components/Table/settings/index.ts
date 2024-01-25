import { DataTypeKeys } from '../enums';
import { FileContentSettings } from './FileContentSettings';
import { UserContentSettings } from './UserContentSettings';

export const ContentSettings = {
  [DataTypeKeys.File]: FileContentSettings,
  [DataTypeKeys.User]: UserContentSettings,
};
