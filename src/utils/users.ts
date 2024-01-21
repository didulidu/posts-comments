import { User } from "../types";

export const getUserByUsername = (usersMap: Record<User['id'], User>, username?: User['username']): User | null => {
    const user = Object.values(usersMap).find(user => {
        return user.username.toLowerCase() === username?.toLowerCase()
    })
    return user || null
}