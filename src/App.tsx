import Table from '../components/Table';
import { fileData, peopleData } from '../mock';

function App() {
  return (
    <>
      <div style={{ width: 'calc(100vw - 200px)', margin: ' 0 auto' }}>
        <Table id={'table_mydocuments'} itemTypeName='file' data={fileData} />
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

      <div style={{ width: 'calc(100vw - 200px)', margin: ' 0 auto' }}>
        <Table
          id={'table_accounts_people'}
          itemTypeName='user'
          data={peopleData}
        />
      </div>
    </>
  );
}

export default App;
