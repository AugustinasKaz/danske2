import React from 'react'

const PlateContext = React.createContext({
    plates: [1,2,3,4],
    deletePlate: () => {},
    addPlate: () => {},
    editPlate: () => {},
    ListUpdate: false,
});

export default PlateContext;