import React, { ReactNode, useState } from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import {
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import './styles.css';
import { AnyDataType } from '../Table/types';

interface ContextMenuProps {
  item: AnyDataType;
  children: ReactNode;
}

const ContextMenu = ({ item, children }: ContextMenuProps) => {
  const [bookmarksChecked, setBookmarksChecked] = useState<boolean>(true);
  const [urlsChecked, setUrlsChecked] = React.useState<boolean>(false);
  const [person, setPerson] = useState<string>('pedro');

  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger className='ContextMenuTrigger' asChild>
        {children}
      </ContextMenuPrimitive.Trigger>
      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content className='ContextMenuContent'>
          //
          <ContextMenuPrimitive.Label className='ContextMenuItem'>
            ITEM ID: {item?.id}
          </ContextMenuPrimitive.Label>
          //
          <ContextMenuPrimitive.Label className='ContextMenuItem'>
            ITEM TITLE:
            {
              /* @ts-expect-error - im lazy */
              item.title || item.displayName
            }
          </ContextMenuPrimitive.Label>
          //
          <ContextMenuPrimitive.Item className='ContextMenuItem'>
            Back <div className='RightSlot'>⌘+[</div>
          </ContextMenuPrimitive.Item>
          <ContextMenuPrimitive.Item className='ContextMenuItem' disabled>
            Forward <div className='RightSlot'>⌘+]</div>
          </ContextMenuPrimitive.Item>
          <ContextMenuPrimitive.Item className='ContextMenuItem'>
            Reload <div className='RightSlot'>⌘+R</div>
          </ContextMenuPrimitive.Item>
          <ContextMenuPrimitive.Sub>
            <ContextMenuPrimitive.SubTrigger className='ContextMenuSubTrigger'>
              More Tools
              <div className='RightSlot'>
                <ChevronRightIcon />
              </div>
            </ContextMenuPrimitive.SubTrigger>
            <ContextMenuPrimitive.Portal>
              <ContextMenuPrimitive.SubContent
                className='ContextMenuSubContent'
                sideOffset={2}
                alignOffset={-5}
              >
                <ContextMenuPrimitive.Item className='ContextMenuItem'>
                  Save Page As… <div className='RightSlot'>⌘+S</div>
                </ContextMenuPrimitive.Item>
                <ContextMenuPrimitive.Item className='ContextMenuItem'>
                  Create Shortcut…
                </ContextMenuPrimitive.Item>
                <ContextMenuPrimitive.Item className='ContextMenuItem'>
                  Name Window…
                </ContextMenuPrimitive.Item>
                <ContextMenuPrimitive.Separator className='ContextMenuSeparator' />
                <ContextMenuPrimitive.Item className='ContextMenuItem'>
                  Developer Tools
                </ContextMenuPrimitive.Item>
              </ContextMenuPrimitive.SubContent>
            </ContextMenuPrimitive.Portal>
          </ContextMenuPrimitive.Sub>
          <ContextMenuPrimitive.Separator className='ContextMenuSeparator' />
          <ContextMenuPrimitive.CheckboxItem
            className='ContextMenuCheckboxItem'
            checked={bookmarksChecked}
            onCheckedChange={setBookmarksChecked}
          >
            <ContextMenuPrimitive.ItemIndicator className='ContextMenuItemIndicator'>
              <CheckIcon />
            </ContextMenuPrimitive.ItemIndicator>
            Show Bookmarks <div className='RightSlot'>⌘+B</div>
          </ContextMenuPrimitive.CheckboxItem>
          <ContextMenuPrimitive.CheckboxItem
            className='ContextMenuCheckboxItem'
            checked={urlsChecked}
            onCheckedChange={setUrlsChecked}
          >
            <ContextMenuPrimitive.ItemIndicator className='ContextMenuItemIndicator'>
              <CheckIcon />
            </ContextMenuPrimitive.ItemIndicator>
            Show Full URLs
          </ContextMenuPrimitive.CheckboxItem>
          <ContextMenuPrimitive.Separator className='ContextMenuSeparator' />
          <ContextMenuPrimitive.Label className='ContextMenuLabel'>
            People
          </ContextMenuPrimitive.Label>
          <ContextMenuPrimitive.RadioGroup
            value={person}
            onValueChange={setPerson}
          >
            <ContextMenuPrimitive.RadioItem
              className='ContextMenuRadioItem'
              value='pedro'
            >
              <ContextMenuPrimitive.ItemIndicator className='ContextMenuItemIndicator'>
                <DotFilledIcon />
              </ContextMenuPrimitive.ItemIndicator>
              Pedro Duarte
            </ContextMenuPrimitive.RadioItem>
            <ContextMenuPrimitive.RadioItem
              className='ContextMenuRadioItem'
              value='colm'
            >
              <ContextMenuPrimitive.ItemIndicator className='ContextMenuItemIndicator'>
                <DotFilledIcon />
              </ContextMenuPrimitive.ItemIndicator>
              Colm Tuite
            </ContextMenuPrimitive.RadioItem>
          </ContextMenuPrimitive.RadioGroup>
        </ContextMenuPrimitive.Content>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>
  );
};

export default ContextMenu;
