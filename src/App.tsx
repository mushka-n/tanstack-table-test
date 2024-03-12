import { useState } from 'react';
import UsersTable from './UsersTable';
import FilesTable from './FilesTable';
import './styles.css';
import TrashFilesContent from './TrashFilesTable';

function App() {
  const [isInfoPanelVisible, setIsInfoPanelVisible] = useState<boolean>(false);
  const onToggleIsInfoPanelVisible = () =>
    setIsInfoPanelVisible(!isInfoPanelVisible);

  return (
    <div className='app'>
      <button
        style={{ position: 'fixed', top: '8px', right: '8px' }}
        onClick={onToggleIsInfoPanelVisible}
      >
        Info Panel
      </button>

      <div
        style={{
          width: '100%',
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ width: '100%' }}>
          <h2 style={{ marginTop: '40px', textAlign: 'center' }}>Files</h2>

          <div style={{ width: '100%', height: '600px' }}>
            <FilesTable />
          </div>

          <h2 style={{ marginTop: '40px', textAlign: 'center' }}>Users</h2>

          <div style={{ width: '100%', height: '600px' }}>
            <UsersTable />
          </div>

          <h2 style={{ marginTop: '40px', textAlign: 'center' }}>Users</h2>

          <div style={{ width: '100%', height: '600px' }}>
            <TrashFilesContent />
          </div>
        </div>

        {isInfoPanelVisible && (
          <div
            className='info-panel'
            style={{
              height: '100dvh',
              width: '400px',
              minWidth: '400px',
              background: '#eee',
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
