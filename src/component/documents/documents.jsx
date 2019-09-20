import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { PaneDirective, PanesDirective, SplitterComponent } from '@syncfusion/ej2-react-layouts';
import React, { Component } from 'react';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Sort, Edit, Toolbar } from '@syncfusion/ej2-react-grids';

class Documents extends Component {
    constructor(props) {
        super(props);

        this.dataTree = new DataManager({
            url: 'http://localhost:9000',
            adaptor: new ODataV4Adaptor,
            crossDomain: true
        })
        
        this.query = new Query().from('library').where('library_parent','equal','0')
        this.queryChild = new Query().from('library')

        this.fields = {
            dataSource: this.dataTree,
            query: this.query,
            id: 'library_code',
            text: 'library_desc',
            hasChildren: 'library_code',
            iconCss: 'folder',
            child: {
                dataSource: this.dataTree,
                query: this.queryChild,
                id: 'library_code',
                text: 'library_desc',
                parentID: 'library_parent',
                hasChildren: 'library_code',
                iconCss: 'folder'
            }
        }
    }

    dataStateChange(state) {
        // this.documentService.execute(state).then(gridData => {
        //     this.grid.dataSource = gridData
        // })
    }

    testing(args) {
        console.log(args.nodeData.id)
    }

    getTreeContent() {
        return(<div><div className="content"><TreeViewComponent fields={this.fields} cssClass="folder" nodeSelected={this.testing}></TreeViewComponent></div></div>)
    }

    getGridContent() {
        return (
            <GridComponent ref={g => this.grid = g} allowPaging={true} allowSorting={true} pageSettings={{pageCount: 4, pageSize: 10}} dataStateChange={this.dataStateChange} toolbar={this.toolbarOption}>
                <ColumnsDirective>
                    <ColumnDirective headerText='ID' field='doc_no' />
                    <ColumnDirective headerText='Doc Number' field='doc_number'/>
                    <ColumnDirective headerText='Doc Title' field='doc_title'/>
                    <ColumnDirective headerText='Revision' field='doc_rev'/>
                    <ColumnDirective headerText='Project' field='project_code'/>
                </ColumnsDirective>
                <Inject services={[Toolbar, Page, Sort, Edit]}/>
            </GridComponent>
        )
    }

    render() {
        return(
            <div className="App">
                <SplitterComponent id="documentSplitter" width='100%' width='100%'>
                    <PanesDirective>
                        <PaneDirective size='20%' content={this.getTreeContent.bind(this)}></PaneDirective>
                        <PaneDirective size='80%' content={this.getGridContent.bind(this)}></PaneDirective>
                    </PanesDirective>
                </SplitterComponent>
            </div>
        )
    }
}

export default Documents