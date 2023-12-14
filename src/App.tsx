import Table from '../Table';
import { fileData } from '../mock';

function App() {
  return <Table id={'table_mydocuments'} itemTypeName='file' data={fileData} />;
}

export default App;
