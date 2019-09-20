import React, { Component } from 'react';
import './App.css';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Group, Sort, Inject, VirtualScroll } from '@syncfusion/ej2-react-grids';
import { Ajax } from '@syncfusion/ej2-base';

class App extends Component {
  constructor() {
    super(...arguments);
    this.orderService = new OrderService();
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
    this.orderService.execute(state).then((gridData) => { this.grid.dataSource = gridData; });
  }

  dataScrollingHandler(state) {
    console.log(state)
  }

  render() {
      return (<div className='control-pane'>
      <div className='control-section'>
        <GridComponent dataSource={this.data} ref={g => this.grid = g} height={600} enableVirtualization={true}   pageSettings={{ pageCount: 4, pageSize: 10 }} scrollModule={this.dataScrollingHandler.bind(this)} dataStateChange={this.dataStateChange.bind(this)}>
          <ColumnsDirective>
            <ColumnDirective field='OrderID' headerText='Order ID' width='120'></ColumnDirective>
            <ColumnDirective field='CustomerID' headerText='Customer Name' width='150'></ColumnDirective>
            <ColumnDirective field='ShipName' headerText='Ship Name' width='120'/>
            <ColumnDirective field='ShipCity' headerText='Ship City' width='150'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Page, Group, Sort, VirtualScroll]}/>
        </GridComponent>
      </div>
    </div>);
  }
}

export class OrderService {
  constructor() {
      this.ajax = new Ajax({
          type: 'GET', mode: true,
          onFailure: (e) => { return false; }
      });
      this.BASE_URL = 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders';
  }

  execute(state) {
      return this.getData(state);
  }

  getData(state) {
    console.log(state)
      const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
      let sortQuery = '';
      if ((state.sorted || []).length) {
          sortQuery = `&$orderby=` + (state).sorted.map((obj) => {
              return obj.direction === 'descending' ? `${obj.name} desc` : obj.name;
          }).reverse().join(',');
      }
      this.ajax.url = `${this.BASE_URL}?${pageQuery}${sortQuery}&$inlinecount=allpages&$format=json`;
      return this.ajax.send().then((response) => {
          let data = JSON.parse(response);
          return { result: data['d']['results'], count: parseInt(data['d']['__count'], 10) };
      });
  }
}

export default App;
