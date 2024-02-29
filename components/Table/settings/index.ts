import { AnyDataTypeKey } from '../types';

import {
  fileContentDefs,
  fileDefaultContentSettings,
} from './FileContentSettings';

import {
  userContentDefs,
  userDefaultContentSettings,
} from './UserContentSettings';

//

export const defaultContentSettingsMap = {
  file: fileDefaultContentSettings,
  user: userDefaultContentSettings,
} as const satisfies { [DTK in AnyDataTypeKey]: unknown };

export const contentDefsMap = {
  file: fileContentDefs,
  user: userContentDefs,
} as const satisfies { [DTK in AnyDataTypeKey]: unknown };
