import axios from 'axios'


export async function FetchPlates(){
    const promise = await axios.get('/api/get_plates');
    const status = promise.status;
    var response = {};
    if(status === 200)
        response = {status: 'success', detail: promise.data};
    else
        response = {status: 'error', detail: `Failed ${status}`};
    return response;
}


export async function DelPlate(plate_id){
    const promise = await axios.delete(`/api/delete_plate/${plate_id}`);
    const status = promise.status;
    if(status === 200)
        return true
    else
        return false
}

export async function AddPlate(plate){
    const promise = await axios.post('/api/add_plate/', {info: plate});
    const status = promise.status;
    var response = {};
    if(status === 200)
        response = {status: 'success', detail: promise.data};
    else
        response = {status: 'error', detail: `Failed ${status}`};
    return response;
}


export async function EditPlate(plate){
    const promise = await axios.post('/api/edit_plate/', {info: plate});
    const status = promise.status;
    var response = {};
    if(status === 200)
        response = {status: 'success', detail: promise.data};
    else
        response = {status: 'error', detail: `Failed ${status}`};
    return response;
}