import Table from '../components/Table';
import { fileData, peopleData } from '../mock';

function App() {
  return (
    <>
      <div style={{ width: 'calc(100vw - 200px)', height: '200px' }}>
        <Table id={'table_mydocuments'} itemTypeName='file' data={fileData} />
      </div>

      <div style={{ height: '200px' }}></div>

      <div style={{ width: 'calc(100vw - 200px)', height: '200px' }}>
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
