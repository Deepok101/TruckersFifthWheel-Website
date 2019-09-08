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
      fetch('/api/truckload/all').then(data => this.setState({data}))
    }

    

    render(){
      if(this.state.data){

      
        return(
            <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map(row => (
                  <TableRow>
                    <TableCell>
                      {row.Origin}
                    </TableCell>
                    <TableCell>
                      {row.OriginState}
                    </TableCell>
                    <TableCell>
                      {row.Destination}
                    </TableCell>
                    <TableCell>
                      {row.DestinationState}
                    </TableCell>
                  </TableRow>
                  
                ))}
              </TableBody>
            </Table>
          </Paper>
        )
      }
    }
}