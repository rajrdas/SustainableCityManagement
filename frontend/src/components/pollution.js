import React from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';



const options = {
   selectableRows: 'none',  	// Hide the checkbox column
   elevation: 0,							// Shadow depth applied to Paper component
   searchPlaceholder: "Start typing keyword to search"
};


const columns = [
 {
  name: "aqih-region",
  label: "Area",
  options: {
   filter: true,
   sort: true,
  }
 },
 {
  name: "aqih",
  label: "Status",
  options: {
   filter: true,
   sort: false,
  }
 }
];

class Pollution extends React.Component  {

	getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableHeadCell: {
        fixedHeaderCommon: {
          "background-color": "#d8d8d8",
          "font-weight": 1000,
          "font-size": "medium"
        }
      }
    }
  })


  state = {
        pol: []
  };

  componentDidMount() {
  fetch('/SCM/pollution')
      .then(res => res.json())
      .then((data) => {
          this.setState({ pol: data.aqihsummary });
          console.log(data.aqihsummary);
      })
  }

  render () {
    return (
              <div>
              <center><h1>Pollution Index</h1></center>
              <br/>
              <br/>
              <MuiThemeProvider theme={this.getMuiTheme()}>
                <MUIDataTable
                    title={""}
                    data={this.state.pol}
                    columns={columns}
                    options={options}
                  />
              </MuiThemeProvider>
              
              </div>
            )  
          }


};


export default Pollution;






