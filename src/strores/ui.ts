import { atom, action } from 'nanostores'

export const sidebar = atom(false)
export const toggleSidebar = action(sidebar, 'toggleSidebar', store => {
  store.set(!store.get())
})

// export function addUser(user: User) {
//   users.set([...users.get(), user]);
// }