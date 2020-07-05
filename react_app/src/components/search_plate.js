import React, { useContext, useState, useEffect } from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import PlateContext from './context'
import { FetchPlates } from './helper_functions'


export default function Autocomplete(props) {
  const data = useContext(PlateContext);
  let [input, setInput] = useState(" ");
  let [error, setError] = useState("Search for a plate");
  let [Plates, setPlates] = useState({});
  const platesList = []
  data.plates.forEach(el => platesList.push(el))  
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: platesList,
    getOptionLabel: option => option.plate,
  });

  async function fetchPlates(){
  let response = await FetchPlates(props.user);
      if(response.status === 'success'){
          setPlates(Plates = response.detail)
      }
  }

  useEffect(() => {
    fetchPlates();
  }, [])


  function validate(e) {
    setInput(input = e.target.value)
    if (e.key === 'Enter') {
      var plate_exists = data.plates.plate.filter(function (elem) {
        return elem === input
      })
      if(plate_exists.length === 1){
        console.log(input)
      }
      else
        setError(error = "plate does not exist")
    }
  }


  return (
    <div>
      <div {...getRootProps()}>
      <span style={{ fontSize: '12px' }}>{error}</span>
        <input className="user-input" value={input} onKeyPress={validate} {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <div className="dropdown-content" style={{ overflow: 'scroll' }} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option.plate}</li>
          ))}
        </div>
      ) : null}
    </div>
  );
}