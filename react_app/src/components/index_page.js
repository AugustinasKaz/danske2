import React, { Component } from 'react'
import { FetchPlates, DelPlate, AddPlate, EditPlate } from './helper_functions'
import PlateContext from './context'
import PlatesList from './plates'
import PlatesForm from './add_plate'
import PlatesSearch from './search_plate'
import './static/index_page.css'

export default class index_page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plates: [],
            loading: true,
            deletePlate: this.deletePlateXS,
            addPlate: this.addPlateXS,
            editPlate: this.editPlateXS,
            ListUpdate: false
        }
    }

    deletePlateXS = async (plate_id) => {
        let tmp = this.state.plates;
        this.setState({ ListUpdate: true });
        let res = await DelPlate(plate_id);
        if (res === true)
            this.setState({ plates: tmp.filter(tmp => tmp.list_id !== plate_id) }, () => {
                this.setState({ ListUpdate: false });
            })

    }

    addPlateXS = async (plate) => {
        let tmp = plate;
        this.setState({ ListUpdate: true });
        let res = await AddPlate(plate);
        if (res.status === 'success') {
            tmp.list_id = res.detail.rows[0].list_id;
            this.state.plates.push(tmp)
            this.setState({ ListUpdate: false });
        }
    }

    editPlateXS = async (Eplate) => {
        this.setState({ ListUpdate: true });
        let res = await EditPlate(Eplate);
        if (res.status === 'success') {
            let tmp = this.state.plates
            this.setState({ plates: tmp.filter(tmp => tmp.list_id !== Eplate.list_id) });
            this.state.plates.push(Eplate)
            this.setState({ ListUpdate: false });
            
        }


    }


    async componentDidMount() {
        let tmp = await FetchPlates();
        this.setState({ plates: tmp.detail }, () => {
            this.setState({ loading: false });
        })
    }

    render() {
        if (this.state.loading === true) {
            return (
                <div className="container">
                    <h1>Loading....</h1>
                </div>
            )
        }
        else {
            return (
                <PlateContext.Provider value={this.state}>
                    <div className="container">
                        <div className="box2">
                            <PlatesForm />
                        </div>
                        <div className="box3">
                            <div className="box4">
                                <PlatesSearch />
                            </div>
                            <h2>Plates list</h2>
                            <PlatesList />
                        </div>
                    </div>
                </PlateContext.Provider>
            )
        }
    }
}
