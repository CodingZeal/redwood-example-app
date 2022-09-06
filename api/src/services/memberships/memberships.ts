import type {
  QueryResolvers,
  // MutationResolvers,
  // MembershipResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const memberships: QueryResolvers['memberships'] = () => {
  return db.membership.findMany()
}

// export const membership: QueryResolvers['membership'] = ({ id }) => {
//   return db.membership.findUnique({
//     where: { id },
//   })
// }

// export const createMembership: MutationResolvers['createMembership'] = ({
//   input,
// }) => {
//   return db.membership.create({
//     data: input,
//   })
// }

// export const updateMembership: MutationResolvers['updateMembership'] = ({
//   id,
//   input,
// }) => {
//   return db.membership.update({
//     data: input,
//     where: { id },
//   })
// }

// export const deleteMembership: MutationResolvers['deleteMembership'] = ({
//   id,
// }) => {
//   return db.membership.delete({
//     where: { id },
//   })
// }

// export const Membership: MembershipResolvers = {
//   user: (_obj, { root }) =>
//     db.membership.findUnique({ where: { id: root.id } }).user(),
//   team: (_obj, { root }) =>
//     db.membership.findUnique({ where: { id: root.id } }).team(),
//   membershipRoles: (_obj, { root }) =>
//     db.membership.findUnique({ where: { id: root.id } }).membershipRoles(),
// }
