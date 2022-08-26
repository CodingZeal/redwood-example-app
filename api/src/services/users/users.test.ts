import { db } from 'src/lib/db'

import { createTeam } from '../teams/teams'

import { users, user, createUser, updateUser, deleteUser } from './users'
import type { StandardScenario } from './users.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('users', () => {
  scenario('returns all users', async (scenario: StandardScenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario: StandardScenario) => {
    const result = await user({ id: scenario.user.one.id })

    expect(result).toEqual(scenario.user.one)
  })

  describe('creates', () => {
    scenario('when no teams', async () => {
      const before = new Date()
      const result = await createUser({
        input: {
          active: true,
          admin: false,
          email: 'String4652567',
        },
      })

      expect(result.active).toEqual(true)
      expect(result.admin).toEqual(false)
      expect(result.email).toEqual('String4652567')
      expect(result.hashedPassword).toBeTruthy()
      expect(result.salt).toBeTruthy()
      expect(result.createdAt.getTime()).toBeGreaterThan(before.getTime())
      expect(result.updatedAt.getTime()).toBeGreaterThan(before.getTime())
    })

    scenario('when adding teams', async () => {
      const team = await createTeam({
        input: {
          active: true,
          name: 'The Monkeys',
        },
      })

      const result = await createUser({
        input: {
          active: true,
          admin: false,
          email: 'String4652567',
          teamIds: [team.id],
        },
      })

      const membership = await db.membership.findUnique({
        where: {
          userTeamConstraint: {
            teamId: team.id,
            userId: result.id,
          },
        },
      })

      expect(membership).not.toEqual(null)
    })
  })

  describe('updates', () => {
    scenario('when no teams', async (scenario: StandardScenario) => {
      const original = await user({ id: scenario.user.one.id })
      const before = new Date()
      const result = await updateUser({
        id: original.id,
        input: { email: 'String61961682' },
      })

      expect(result.email).toEqual('String61961682')
      expect(result.createdAt.getTime()).toBeLessThan(before.getTime())
      expect(result.updatedAt.getTime()).toBeGreaterThan(before.getTime())
    })

    scenario('when adding teams', async (scenario: StandardScenario) => {
      const team = await createTeam({
        input: {
          active: true,
          name: 'The Monkeys',
        },
      })

      const original = await user({ id: scenario.user.one.id })

      const result = await updateUser({
        id: original.id,
        input: { teamIds: [team.id] },
      })

      const membership = await db.membership.findUnique({
        where: {
          userTeamConstraint: {
            teamId: team.id,
            userId: result.id,
          },
        },
      })

      expect(membership).not.toEqual(null)
    })

    scenario('when removing teams', async (scenario: StandardScenario) => {
      const team = await createTeam({
        input: {
          active: true,
          name: 'The Monkeys',
        },
      })

      const original = await user({ id: scenario.user.one.id })

      await db.membership.create({
        data: {
          teamId: team.id,
          userId: original.id,
        },
      })

      const result = await updateUser({
        id: original.id,
        input: { teamIds: [] },
      })

      const membership = await db.membership.findUnique({
        where: {
          userTeamConstraint: {
            teamId: team.id,
            userId: result.id,
          },
        },
      })

      expect(membership).toEqual(null)
    })
  })

  scenario('deletes a user', async (scenario: StandardScenario) => {
    const original = await deleteUser({ id: scenario.user.one.id })
    const result = await user({ id: original.id })

    expect(result).toEqual(null)
  })
})
