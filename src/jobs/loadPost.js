import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class LoadPost extends React.Component{
    constructor(props){
      super(props)
        this.state = {
          data: null
        }
        this.fetchLoadData = this.fetchLoadData.bind(this);
    }

    componentDidMount(){
      this.fetchLoadData();
    }
    
    fetchLoadData(){
      fetch('/api/truckload/all').then(res => res.json()).then(data => this.setState({data: data}))
    }

    

    render(){
      if(this.state.data){

      
        return(
            <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Origin</TableCell>
                  <TableCell align="right">ST</TableCell>
                  <TableCell align="right">Destination</TableCell>
                  <TableCell align="right">ST</TableCell>
                  <TableCell align="right">Trailer Type</TableCell>
                  <TableCell align="right">Load Size</TableCell>
                  <TableCell align="right">Weight</TableCell>
                  <TableCell align="right">Miles</TableCell>
                  <TableCell align="right">Payrate</TableCell>
                  <TableCell align="right">Credit Report</TableCell>
                  <TableCell align="right">Company</TableCell>
                  <TableCell align="right">Date Posted</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map(row => (
                  <TableRow>
                    <TableCell>{row.Origin}</TableCell>
                    <TableCell>{row.OriginState} </TableCell>
                    <TableCell>{row.Destination}</TableCell>
                    <TableCell>{row.DestinationState}</TableCell>
                    <TableCell>{row.TrailerType}</TableCell>
                    <TableCell>{row.LoadSize}</TableCell>
                    <TableCell>{row.Weight}</TableCell>
                    <TableCell>{row.Miles}</TableCell>
                    <TableCell>{row.Payrate}</TableCell>
                    <TableCell>{row.CreditReport}</TableCell>
                    <TableCell>{row.Company}</TableCell>
                    <TableCell>{row.DatePosted}</TableCell>
                  </TableRow>
                  
                ))}
              </TableBody>
            </Table>
          </Paper>
        )
      } else {
        return null;
      }
    }
}