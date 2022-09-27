import { render } from '@redwoodjs/testing/web'

import { Loading, Failure, Success } from './UserFormTeamsCell'
import { standard } from './UserFormTeamsCell.mocks'

describe('UserFormTeamsCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success props={standard().userFormTeams} />)
    }).not.toThrow()
  })
})
