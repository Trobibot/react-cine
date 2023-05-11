import { Component } from "react";
import { Button, TextField, Grid } from '@mui/material';
import axios from "axios";

export default class MovieUpdate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: {
        title: "",
        description: "",
        actors: [],
        director: "",
        thumbnail: "http://localhost:4000/assets/thumbnail-placeholder.png"
      }
    }
  }

  movie() {
    return this.state.movie
  }

  createMovie(formValues) {
    axios.post(
      process.env.REACT_APP_API_URL + process.env.REACT_APP_API_MOVIES_ENDPOINT,
      {
        title: formValues[1],
        description: formValues[2],
        director: formValues[3],
        actors: formValues[4].split(', '),
        thumbnail: formValues[0],
      }
    )
    .then(({ data }) => { 
      window.location.href = `/movies/${data.insertedId}`
    })
  }

  updateThumbnail({ target: { value }}) {
    this.setState({
      movie: { thumbnail: value }
    })
  }

  setThumbnailPlaceholder() {
    this.setState({
      movie: { thumbnail: "http://localhost:4000/assets/thumbnail-placeholder.png" }
    })
  }

  submitForm(event) {
    event.preventDefault()
    this.createMovie([...event.target.querySelectorAll("input,textarea:not([aria-hidden=true])")].map(({ value }) => value))
  }

  render() {
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
            <img src={this.movie().thumbnail} alt="movie thumbnail" style={{ width: "100%", minHeight: "300px" }} onError={this.setThumbnailPlaceholder.bind(this)}/>
            <TextField
              label="url"
              fullWidth
              onChange={this.updateThumbnail.bind(this)}
            />
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
                fullWidth
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                label="synopsis"
                multiline
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={5}>
          <TextField
            label="director"
            fullWidth
          />
        </Grid>

        <Grid item xs={5}>
          <TextField
            label="actors"
            fullWidth
          />
        </Grid>

        <Grid item xs={4} />

        <Grid item xs={1}>
          <Button id="create-btn" type="submit" variant="contained" color="error" fullWidth>Create</Button>
        </Grid>

      </Grid>
    </form>
  }
}