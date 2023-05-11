import { Component } from "react";
import { Link } from "react-router-dom";
import { ImageList, ImageListItem, ImageListItemBar, Fab, TextField, CircularProgress, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import axios from "axios";

export default class MovieList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      filteredMovies: [],
      loading: true
    }

    axios.get(process.env.REACT_APP_API_URL + process.env.REACT_APP_API_MOVIES_ENDPOINT)
      .then(({ data }) => {
        this.setState({
          movies: data,
          filteredMovies: data,
          loading: false
        })
      })
  }

  filterMovies({ target: { value }}) {
    this.setState({
      filteredMovies: this.state.movies.filter(({ title }) => title.toLowerCase().match(value.toLowerCase()))
    })
  }

  render() {
    return <>
      <TextField
        label="Search"
        onChange={this.filterMovies.bind(this)}
        fullWidth
      />
      {
        this.state.loading
          ? <Box sx={{ display: "flex", justifyContent: "center", paddingTop: "128px" }}><CircularProgress/></Box>
          : <ImageList variant="masonry" cols={2} gap={2}>
              {this.state.filteredMovies.map(movie => (
                <Link to={`/movies/${movie._id}`}>
                  <ImageListItem key={movie._id}>
                    <img
                      src={movie.thumbnail}
                      alt={movie.title}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={movie.title}
                    />
                  </ImageListItem>
                </Link>
              ))}
            </ImageList>
        }
      <Link to={`/movies/+`}>
        <Fab color="primary" aria-label="add" sx={{ position: "fixed", right: "64px", bottom: "32px" }}>
          <Add/>
        </Fab>
      </Link>
    </>
  }
}