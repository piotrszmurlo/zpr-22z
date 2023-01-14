import { render, screen } from '@testing-library/react'
import App from '../App.jsx'

// describe('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
describe('Ball moving', () => {
  const [ballPosition, setBallPosition] = useState({
    ballX: 500,
    ballY: 170
  })
  const [ballSpeed, setBallSpeed] = useState({
    ballSpeedX: 10,
    ballSpeedY: 10
  })

  const [paddleY, setPaddleY] = useState({
    player1: 170,
    player2: 170
  })

  const result = calculateBall(
    [ballPosition['ballX'], ballPosition['ballY'], ballSpeed['ballSpeedX'], ballSpeed['ballSpeedY']],
    paddleY['player1'],
    paddleY['player2']
  )
  const expectedResult = {
    ballX: 510,
    ballY: 180,
    ballSpeedX: 10,
    ballSpeedY: 10
  }
  expect(result).toEqual(expectedResult)
})
