import { createMembership } from '../memberships/memberships'
import { createUser } from '../users/users'

import { teams, team, createTeam, updateTeam, deleteTeam } from './teams'
import type { StandardScenario } from './teams.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('teams', () => {
  scenario('returns all teams', async (scenario: StandardScenario) => {
    const result = await teams()

    expect(result.length).toEqual(Object.keys(scenario.team).length)
  })

  scenario('returns a single team', async (scenario: StandardScenario) => {
    const result = await team({ id: scenario.team.one.id })

    expect(result).toEqual(scenario.team.one)
  })

  scenario('creates a team', async () => {
    const before = new Date()
    const result = await createTeam({
      input: { name: 'String', active: true },
    })

    expect(result.name).toEqual('String')
    expect(result.active).toEqual(true)
    expect(result.createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime())
    expect(result.updatedAt.getTime()).toBeGreaterThan(before.getTime())
  })

  scenario('updates a team', async (scenario: StandardScenario) => {
    const original = await team({ id: scenario.team.one.id })
    const before = new Date()
    const result = await updateTeam({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
    expect(result.createdAt.getTime()).toBeLessThan(before.getTime())
    expect(result.updatedAt.getTime()).toBeGreaterThan(before.getTime())
  })

  describe('deletes', () => {
    scenario('unused', async (scenario: StandardScenario) => {
      const original = await deleteTeam({ id: scenario.team.one.id })
      const result = await team({ id: original.id })

      expect(result).toEqual(null)
    })

    scenario('used', async (scenario: StandardScenario) => {
      const user = await createUser({
        input: {
          active: true,
          admin: false,
          email: 'monkey@banana.com',
        },
      })
      await createMembership({
        input: {
          teamId: scenario.team.one.id,
          userId: user.id,
        },
      })
      expect(deleteTeam({ id: scenario.team.one.id })).rejects.toThrow(
        Error('Team is in use, please remove users before deletion')
      )

      const result = await team({ id: scenario.team.one.id })

      expect(result).not.toEqual(null)
    })
  })
})
