import React, { useContext } from 'react';
import PlateContext from './context'
import './static/plates.css'
import RemoveBtn from './remove_btn'
import EditBtn from './edit_btn'

function PlatesList() {
    const data = useContext(PlateContext)

    if (data.ListUpdate === false) {
        return (
            <PlateContext.Consumer>
                {({ plates }) => (
                    <ul>
                        {plates.map((el) =>
                            <li key={el.list_id}>
                                <div className="li-item">
                                    {el.owner_name} {el.plate}
                                    <div className="li-item-btn">
                                        <EditBtn data={el} />
                                    </div>
                                    <div className="li-item-btn">
                                        <RemoveBtn data={el} />
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                )}
            </PlateContext.Consumer>
        )
    }
    else {
        return (
            <div>
                <h2>Updating list</h2>
            </div>
        )
    }

}

export default PlatesList;