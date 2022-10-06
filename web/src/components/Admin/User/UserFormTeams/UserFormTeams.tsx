import { CheckboxField, HiddenField } from '@redwoodjs/forms'

import { useTeamState } from './useTeamState'

const UserFormTeams = ({ roleIds, roleValue, roles, teamIds, teams }) => {
  const { addTeam, dispatch, removeTeam, state } = useTeamState({
    initialTeamIds: teamIds,
    teams,
  })

  return (
    <>
      <div className="rw-label">Teams</div>
      <HiddenField name="teamIds" />
      <div className="flex">
        <select
          aria-label="Select a Team to Add"
          name="addTeam"
          onChange={(e) => dispatch({ type: 'ADD_TEAM', id: e.target.value })}
          data-testid="select team"
        >
          <option>Select a Team to Add</option>
          {(state.unselectedTeams || []).map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        <button
          className={`rw-button rw-button-small ${
            !!state.teamToAdd && 'rw-button-green'
          }`}
          onClick={addTeam}
          title={'Add Team'}
          type="button"
          disabled={!state.teamToAdd}
        >
          Add Team
        </button>
      </div>
      <table className="rw-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Roles</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {(state.selectedTeams || []).map((team) => (
            <tr key={team.id}>
              <td data-testid="teamName">{team.name}</td>
              <td>
                {(roles || []).map((role) => {
                  const name = roleValue(team.id, role.id)
                  return (
                    <label key={role.id} htmlFor={name} className="rw-label">
                      <CheckboxField
                        name="roleIds"
                        className="rw-input"
                        defaultChecked={roleIds.includes(name)}
                        value={name}
                      />
                      {role.name}
                    </label>
                  )
                })}
              </td>
              <td>
                <button
                  className="rw-button rw-button-small rw-button-red"
                  onClick={removeTeam}
                  title={'Remove Team ' + team.name}
                  value={team.id}
                  data-testid="remove-team"
                >
                  Remove Team
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export { UserFormTeams }
