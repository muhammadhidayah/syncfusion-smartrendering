import { ColumnDirective, ColumnsDirective, GridComponent, Inject } from '@syncfusion/ej2-react-grids';
import { Toolbar, Edit, Page, Sort } from '@syncfusion/ej2-react-grids';
import {PersonService} from './PersonService';
import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props)
        this.personService = new PersonService();
        this.editing = {allowDeleting: true, allowEditing: true, allowAdding: true}
        this.toolbarOption = [{text: 'Add'}, {text: 'Edit'}, {text: 'Delete'}]
    }

    componentDidMount() {
        setTimeout(() => {
            this.rendereComplete();
        });
    }

    rendereComplete() {
        let state = { skip: 0, take: 10 };
        this.dataStateChange(state);
    }
  
    dataStateChange(state) {
        this.personService.execute(state).then(gridData => {
          this.grid.dataSource = gridData
        })
    }
  
    dataSourceChanged(state) {
      if (state.action === 'add') {
        this.personService.addData(state).then(xhr => {
          state.endEdit()
        })
      } else if(state.requestType === 'delete') {
        this.personService.deleteData(state).then(xhr => {
          if (xhr.status === 200) {
            state.endEdit()
            return false
          } else if (xhr.status === 204) {
            alert('Person Not Found')
          } else {
            state.endEdit()    
          }
  
          state.endEdit()
        })
      } else if(state.action === 'edit') {
        this.personService.editData(state).then(xhr => {
          if (xhr.status === 200) {
  
          } else {
  
          }
          
          state.endEdit()
        })
      }
    }


    render() {
        return(
            <GridComponent dataSource={this.data} ref={g => this.grid = g} allowPaging={true} allowSorting={true} pageSettings={{ pageCount: 4, pageSize: 10 }} dataSourceChanged={this.dataSourceChanged.bind(this)} dataStateChange={this.dataStateChange.bind(this)} editSettings={this.editing} toolbar={this.toolbarOption}>
                <ColumnsDirective>
                    <ColumnDirective headerText='ID' field='person_no' width='100' textAlign="Right"/>
                    <ColumnDirective headerText='Username' field='person_id' width='100'/>
                    <ColumnDirective headerText='Full Name' field='person_name' width='100'/>
                    <ColumnDirective headerText='Postion' field='person_position' width='100' format="C2"/>
                    <ColumnDirective headerText='E-mail' field='person_mail' width='100' format="C2"/>
                    <ColumnDirective headerText='Telepon' field='person_telephone' width='100' format="C2" textAlign="Right"/>
                </ColumnsDirective>
                <Inject services={[Toolbar,Page, Sort, Edit]}/>
            </GridComponent>
        )
    }
}

export default User