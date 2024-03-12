import React from 'react';
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import {
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import './styles.css';
import { AnyDataType } from '../Table/types';

interface DropdownPrimitiveProps {
  item: AnyDataType;
  children: React.ReactNode;
  style?: any;
}

const DropdownMenu = ({ item, children, style }: DropdownPrimitiveProps) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState('pedro');

  return (
    <DropdownPrimitive.Root>
      <DropdownPrimitive.Trigger asChild>{children}</DropdownPrimitive.Trigger>

      <DropdownPrimitive.Portal>
        <DropdownPrimitive.Content
          className='DropdownPrimitiveContent'
          sideOffset={5}
        >
          <DropdownPrimitive.Item className='DropdownPrimitiveItem'>
            New Tab <div className='RightSlot'>⌘+T</div>
          </DropdownPrimitive.Item>
          <DropdownPrimitive.Item className='DropdownPrimitiveItem'>
            New Window <div className='RightSlot'>⌘+N</div>
          </DropdownPrimitive.Item>
          <DropdownPrimitive.Item className='DropdownPrimitiveItem' disabled>
            New Private Window <div className='RightSlot'>⇧+⌘+N</div>
          </DropdownPrimitive.Item>
          <DropdownPrimitive.Sub>
            <DropdownPrimitive.SubTrigger className='DropdownPrimitiveSubTrigger'>
              More Tools
              <div className='RightSlot'>
                <ChevronRightIcon />
              </div>
            </DropdownPrimitive.SubTrigger>
            <DropdownPrimitive.Portal>
              <DropdownPrimitive.SubContent
                className='DropdownPrimitiveSubContent'
                sideOffset={2}
                alignOffset={-5}
              >
                <DropdownPrimitive.Item className='DropdownPrimitiveItem'>
                  Save Page As… <div className='RightSlot'>⌘+S</div>
                </DropdownPrimitive.Item>
                <DropdownPrimitive.Item className='DropdownPrimitiveItem'>
                  Create Shortcut…
                </DropdownPrimitive.Item>
                <DropdownPrimitive.Item className='DropdownPrimitiveItem'>
                  Name Window…
                </DropdownPrimitive.Item>
                <DropdownPrimitive.Separator className='DropdownPrimitive.Separator' />
                <DropdownPrimitive.Item className='DropdownPrimitiveItem'>
                  Developer Tools
                </DropdownPrimitive.Item>
              </DropdownPrimitive.SubContent>
            </DropdownPrimitive.Portal>
          </DropdownPrimitive.Sub>
          <DropdownPrimitive.Separator className='DropdownPrimitiveSeparator' />
          <DropdownPrimitive.CheckboxItem
            className='DropdownPrimitiveCheckboxItem'
            checked={bookmarksChecked}
            onCheckedChange={setBookmarksChecked}
          >
            <DropdownPrimitive.ItemIndicator className='DropdownPrimitiveItemIndicator'>
              <CheckIcon />
            </DropdownPrimitive.ItemIndicator>
            Show Bookmarks <div className='RightSlot'>⌘+B</div>
          </DropdownPrimitive.CheckboxItem>
          <DropdownPrimitive.CheckboxItem
            className='DropdownPrimitiveCheckboxItem'
            checked={urlsChecked}
            onCheckedChange={setUrlsChecked}
          >
            <DropdownPrimitive.ItemIndicator className='DropdownPrimitiveItemIndicator'>
              <CheckIcon />
            </DropdownPrimitive.ItemIndicator>
            Show Full URLs
          </DropdownPrimitive.CheckboxItem>
          <DropdownPrimitive.Separator className='DropdownPrimitiveSeparator' />
          <DropdownPrimitive.Label className='DropdownPrimitiveLabel'>
            People
          </DropdownPrimitive.Label>
          <DropdownPrimitive.RadioGroup
            value={person}
            onValueChange={setPerson}
          >
            <DropdownPrimitive.RadioItem
              className='DropdownPrimitiveRadioItem'
              value='pedro'
            >
              <DropdownPrimitive.ItemIndicator className='DropdownPrimitiveItemIndicator'>
                <DotFilledIcon />
              </DropdownPrimitive.ItemIndicator>
              Pedro Duarte
            </DropdownPrimitive.RadioItem>
            <DropdownPrimitive.RadioItem
              className='DropdownPrimitiveRadioItem'
              value='colm'
            >
              <DropdownPrimitive.ItemIndicator className='DropdownPrimitiveItemIndicator'>
                <DotFilledIcon />
              </DropdownPrimitive.ItemIndicator>
              Colm Tuite
            </DropdownPrimitive.RadioItem>
          </DropdownPrimitive.RadioGroup>
          <DropdownPrimitive.Arrow className='DropdownPrimitiveArrow' />
        </DropdownPrimitive.Content>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Root>
  );
};

export default DropdownMenu;
