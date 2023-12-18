import { useState } from 'react';
import Table from '../components/Table';
import { fileData, peopleData } from '../mock';
import { AnyDataType } from '../components/Table/index.types';

function App() {
  const [isInfoPanelVisible, setIsInfoPanelVisible] = useState<boolean>(false);
  const onToggleIsInfoPanelVisible = () =>
    setIsInfoPanelVisible(!isInfoPanelVisible);

  const [selection, setSelection] = useState<AnyDataType[]>([]);
  const outsideProps = { selection, setSelection };

  return (
    <>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '100%' }}>
          <button
            style={{ position: 'fixed', top: '8px', right: '8px' }}
            onClick={onToggleIsInfoPanelVisible}
          >
            Info Panel
          </button>

          <div style={{ width: 'calc(100%)', margin: '40px auto 0' }}>
            <Table
              id={'table_mydocuments'}
              dataTypeKey='file'
              data={fileData}
              {...outsideProps}
            />
          </div>

          <div
            style={{
              height: '48px',
              boxSizing: 'border-box',
              width: 'max-content',
              margin: '0 auto',
              padding: '20px 0',
              lineHeight: '8px',
            }}
          >
            -----------------------------------------------
          </div>

          <div style={{ width: 'calc(100%)', margin: ' 0 auto' }}>
            <Table
              id={'table_accounts_people'}
              dataTypeKey='user'
              data={peopleData}
              {...outsideProps}
            />
          </div>
        </div>

        {isInfoPanelVisible && (
          <div style={{ height: '100%', width: '400px', minWidth: '400px' }}>
            Info Panel
          </div>
        )}
      </div>
    </>
  );
}

export default App;
