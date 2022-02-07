import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { FilterMatchMode} from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';



export default function Todos() {
const [todo_data, setTodo_data] = useState(null);
const { id } = useParams();
let history = useHistory();
const columns = [{field: 'id', header: 'Id'},{field: 'userId', header: 'UserId'},{field: 'title', header: 'Title'},{field: 'completed', header: 'Status'}];
const [filters2, setFilters2] = useState({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS,matchMode:FilterMatchMode.STARTS_WITH},
  'id': { value: null, matchMode: FilterMatchMode.CONTAINS,matchMode:FilterMatchMode.STARTS_WITH },
  'title': { value: null,matchMode:FilterMatchMode.STARTS_WITH,matchMode: FilterMatchMode.CONTAINS },
  'userId': { value: null,matchMode:FilterMatchMode.STARTS_WITH, matchMode: FilterMatchMode.CONTAINS },
});
const [globalFilterValue2, setGlobalFilterValue2] = useState('');

useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/todos`).then(res => {
      setTodo_data(res.data)
    });
  }, []);

const booleanChecker = (rowData, item) => {
    if (typeof rowData[item.field] === "boolean") {
      return rowData[item.field] ? "Completed" : "UnCompleted";
    } else {
      return rowData[item.field];
    }
  };

const actionTemplate=(rowData)=> {
    return (<button className='view-btn' onClick={() => history.push(`/todo/${rowData.id}`)} style={{margin:'4px 5px'}}>More Info</button>);
}  
const dynamicColumns = columns.map((col,i) => {
    return <Column key={col.field} field={col.field} header={col.header} sortable filter 
    body={booleanChecker} filterPlaceholder="Search by " />;
  });

const onGlobalFilterChange2 = (e) => {
  const value = e.target.value;
  let _filters2 = { ...filters2 };
  _filters2['global'].value = value;
  setFilters2(_filters2);
  setGlobalFilterValue2(value);
}
const renderHeader2 = () => {
  return (
      <div className="search-input">
        <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Keyword Search" />
      </div>
  )
}
const header2 = renderHeader2();


return(

<div className='card'>
  <h2 className='txt-center'>Todos List</h2>
  <DataTable value={todo_data}  size="small" showGridlines paginator  responsiveLayout="scroll" 
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
      globalFilterFields={['id', 'userId', 'title']}  filterDisplay="row"  dataKey="id" emptyMessage="No todos found."
      filters={filters2} filterDisplay="row" header={header2}>{dynamicColumns}
    <Column header="Action" body={actionTemplate}></Column>
  </DataTable>
</div>
 );
}