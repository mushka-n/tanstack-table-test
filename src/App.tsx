import { useState } from 'react';
import UsersTable from './UsersTable';
import FilesTable from './FilesTable';
import './styles.css';

function App() {
  const [isInfoPanelVisible, setIsInfoPanelVisible] = useState<boolean>(false);
  const onToggleIsInfoPanelVisible = () =>
    setIsInfoPanelVisible(!isInfoPanelVisible);

  return (
    <>
      <button
        style={{ position: 'fixed', top: '8px', right: '8px' }}
        onClick={onToggleIsInfoPanelVisible}
      >
        Info Panel
      </button>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '100%' }}>
          <h2 style={{ marginTop: '40px', textAlign: 'center' }}>Files</h2>

          <div style={{ width: '100%', height: '320px' }}>
            <FilesTable />
          </div>

          <h2 style={{ marginTop: '40px', textAlign: 'center' }}>Users</h2>

          <div style={{ width: '100%', height: '320px' }}>
            <UsersTable />
          </div>
        </div>

        {isInfoPanelVisible && (
          <div style={{ height: '100%', width: '400px', minWidth: '400px' }} />
        )}
      </div>
    </>
  );
}

export default App;
