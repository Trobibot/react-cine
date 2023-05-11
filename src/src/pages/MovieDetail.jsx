import { useParams } from 'react-router-dom'
import MovieCreate from '../components/MovieCreate'
import MovieUpdate from '../components/MovieUpdate'

export default function MovieDetail() {
  const { id } = useParams()
  return id === "+" ? <MovieCreate /> : <MovieUpdate id={id} />
}