import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const ranges = [
  {
    value: "Garage",
    label: "Garage"
  },
  {
    value: "Street",
    label: "Street"
  },
  {
    value: "Private Lot",
    label: "Private Lot"
  },
  {
    value: "Driveway",
    label: "Driveway"
  }
];

function AddressForm(props) {
  return (
    <React.Fragment style={{ fontFamily: "Roboto" }}>
      <form noValidate autoComplete="off">
        {/* //TITLE */}
        <TextField
          id="title"
          label="Title"
          fullWidth={true}
          placeholder="Open driveway on quiet street"
          margin="normal"
          variant="outlined"
          value={props.title}
          onChange={props.handleInputChange}
          name="title"
        />
        <div
          style={{ fontFamily: "Roboto", color: "#DB5461", fontSize: "12px" }}
        >
          {props.titleError}
        </div>

        {/* // PARKING Type */}
        <TextField
          id="parkingtype"
          select
          label="Select"
          fullWidth={true}
          value={props.parkingtype}
          onChange={props.handleInputChange}
          SelectProps={
            {
              // MenuProps: {
              //   className: classes.menu
              // }
            }
          }
          helperText="Select spot type"
          margin="normal"
          name="parkingtype"
        >
          {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <div
          style={{ fontFamily: "Roboto", color: "#DB5461", fontSize: "12px" }}
        >
          {props.parkingtypeError}
        </div>

        {/* // PRICE */}
        <TextField
          id="price"
          label="Daily Price"
          value={props.price !== 0 && props.price}
          onChange={props.handleInputChange}
          type="number"
          fullWidth={true}
          InputLabelProps={{
            shrink: true
          }}
          name="price"
          margin="normal"
          variant="outlined"
          placeholder="$"
          name="price"
        />
        <div
          style={{ fontFamily: "Roboto", color: "#DB5461", fontSize: "12px" }}
        >
          {props.priceError}
        </div>

        {/* //ADDRESS */}
        <TextField
          id="address"
          fullWidth={true}
          label="Street Address"
          placeholder="1200 Market Street"
          margin="normal"
          variant="outlined"
          value={props.address}
          onChange={props.handleInputChange}
          name="address"
        />
        <div
          style={{ fontFamily: "Roboto", color: "#DB5461", fontSize: "12px" }}
        >
          {props.addressError}
        </div>

        {/* //City */}
        <TextField
          id="city"
          label="City"
          fullWidth={true}
          placeholder="Philadelphia"
          margin="normal"
          variant="outlined"
          value={props.city}
          onChange={props.handleInputChange}
          name="city"
        />
        <div
          style={{ fontFamily: "Roboto", color: "#DB5461", fontSize: "12px" }}
        >
          {props.cityError}
        </div>

        {/* //State */}
        <TextField
          fullWidth={true}
          id="state"
          label="State"
          placeholder="PA"
          margin="normal"
          variant="outlined"
          value={props.state}
          onChange={props.handleInputChange}
          name="state"
        />
        <div
          style={{ fontFamily: "Roboto", color: "#DB5461", fontSize: "12px" }}
        >
          {props.stateError}
        </div>

        {/* //Zip */}
        <TextField
          id="zipcode"
          label="Zip"
          placeholder="19107"
          margin="normal"
          variant="outlined"
          value={props.zipcode}
          onChange={props.handleInputChange}
          name="zipcode"
          fullWidth={true}
        />
        <div
          style={{ fontFamily: "Roboto", color: "#DB5461", fontSize: "12px" }}
        >
          {props.zipcodeError}
        </div>
      </form>
    </React.Fragment>
  );
}

export default AddressForm;
