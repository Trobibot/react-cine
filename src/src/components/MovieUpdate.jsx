import { Component } from "react";
import { Box, Button, TextField, Autocomplete, Grid } from '@mui/material';
import axios from "axios";

export default class MovieUpdate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: {
        title: "",
        description: "",
        actors: [],
        director: ""
      }
    }

    axios.get(process.env.REACT_APP_API_URL + process.env.REACT_APP_API_MOVIES_ENDPOINT + props.id)
      .then(({ data: [ movie ] }) => {
        console.log(movie)
        this.setState({
          movie
        })
      })
  }

  movie() {
    return this.state.movie
  }

  updateMovie(formValues) {
    console.log(formValues)
    axios.put(
      process.env.REACT_APP_API_URL + process.env.REACT_APP_API_MOVIES_ENDPOINT + this.movie()._id,
      {
        title: formValues[0],
        description: formValues[1],
        director: formValues[2],
        actors: formValues[3].split(', '),
      }
    )
    .then(() => { window.location.href = `/movies/${this.movie()._id}` })
  }

  deleteMovie() {
    axios
      .delete(process.env.REACT_APP_API_URL + process.env.REACT_APP_API_MOVIES_ENDPOINT + this.movie()._id)
      .then(() => { window.location.href = "/" })
  }

  submitForm(event) {
    event.preventDefault()

    switch (event.nativeEvent.submitter.id) {
      case "delete-btn":
        this.deleteMovie()
        break;

      case "update-btn":
        this.updateMovie([...event.target.querySelectorAll("input,textarea:not([aria-hidden=true])")].map(({ value }) => value))
        break;
    
      default:
        break;
    }
  }

  render() {
    if (this.movie()._id)
      return <form onSubmit={this.submitForm.bind(this)}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          columns={5}
          spacing={2}
        >

          <Grid item xs={2}>
            <Grid sx={{ height: "100%" }}>
              <img src={this.movie().thumbnail} alt={this.movie().title} style={{ width: "100%" }}/>
            </Grid>
          </Grid>

          <Grid item xs={3}>
            <Grid
              container
              justifyContent="center"
              columns={2}
              spacing={4}
            >
              <Grid item xs={2}>
                <TextField
                  label="Title"
                  defaultValue={this.movie().title}
                  fullWidth
                />
              </Grid>

              <Grid item xs={2}>
                <TextField
                  label="synopsis"
                  defaultValue={this.movie().description}
                  multiline
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={5}>
            <TextField
              label="director"
              defaultValue={this.movie().director}
              fullWidth
            />
          </Grid>

          <Grid item xs={5}>
            <TextField
              label="actors"
              defaultValue={this.movie().actors.join(", ")}
              fullWidth
            />
          </Grid>

          <Grid item xs={3} />

          <Grid item xs={1}>
            <Button id="update-btn" type="submit" variant="contained" fullWidth>Update</Button>
          </Grid>

          <Grid item xs={1}>
            <Button id="delete-btn" type="submit" variant="contained" color="error" fullWidth>Delete</Button>
          </Grid>

        </Grid>
      </form>
  }
}