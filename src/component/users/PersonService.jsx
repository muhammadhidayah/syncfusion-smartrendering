import { Ajax } from '@syncfusion/ej2-base'

export class PersonService {
    constructor() {
        this.ajax = new Ajax({
            type: 'GET', mode: true,
            onFailure: (e) => { return false; }
        });
        this.BASE_URL = 'http://localhost:9000/person';
    }

    execute = (state) => {
        return this.getData(state)
    }

    deleteData = (state) => {
        let xhttp = new Ajax({
            mode: true,
            type: 'DELETE'
        })

        let personNo = state.data[0].person_no

        xhttp.url = `${this.BASE_URL}/${personNo}`

        xhttp.onFailure = (err) => {
            return false
        }

        return xhttp.send().then(() => {
            return xhttp.httpRequest
        }).catch(() => {
            return xhttp.httpRequest
        })
    }

    addData = (state) => {
        let xhttp = new Ajax({
            mode: true,
            type: 'POST'
        })

        xhttp.url = `${this.BASE_URL}`

        xhttp.onFailure = (err) => {
            return false
        }

        
        let data = JSON.stringify(state.data)
        return xhttp.send(data).then(resp => {
            return xhttp.httpRequest
        }).catch(err => {
            return xhttp.httpRequest
        })
    }

    getData = (state) => {
        this.ajax.url = `${this.BASE_URL}`;
        return this.ajax.send().then((response) => {
            let data = JSON.parse(response);
            return { result: data.list };
        });
    }

    editData = (state) => {
        let xhttp = new Ajax({
            mode: true,
            type: 'PUT'
        })

        let personNo = state.data.person_no

        xhttp.url = `${this.BASE_URL}/${personNo}`

        xhttp.onFailure = (err) => {
            return false
        }

        let data = JSON.stringify(state.data)
        return xhttp.send(data).then(() => {
            return xhttp.httpRequest
        }).catch(() => {
            return xhttp.httpRequest
        })
    }


}