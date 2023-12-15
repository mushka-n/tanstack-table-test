import Table from '../Table';
import { fileData } from '../mock';

function App() {
  return (
    <div style={{ width: 'calc(100vw - 200px)', height: '200px' }}>
      <Table id={'table_mydocuments'} itemTypeName='file' data={fileData} />
    </div>
  );
}

export default App;
