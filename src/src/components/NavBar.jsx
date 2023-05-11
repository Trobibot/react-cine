import { Component } from "react";
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from "react-router-dom";

export default class MovieUpdate extends Component {

  render() {
    return <AppBar component="nav">
      <Toolbar sx={{ minWidth: '500px', maxWidth: '800px', width: '60%', margin: 'auto' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Movie app
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' }}}>
          <Link to={"/"}><Button variant="text" sx={{ color: "white" }}>Home</Button></Link>
          <Link to={"/movies"}><Button variant="text" sx={{ color: "white" }}>Movies list</Button></Link>
        </Box>
      </Toolbar>
    </AppBar>
  }

  // render() {
  //   return <AppBar component="nav">
  //     <Toolbar>
  //       <Typography
  //         variant="h6"
  //         component="div"
  //         sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
  //       >
  //         Movie app
  //       </Typography>
  //       <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
  //         <Link to={"/"}>Home</Link>
  //         <Link to={"/movies"}>Movies list</Link>
  //       </Box>
  //     </Toolbar>
  //   </AppBar>
  // }
}