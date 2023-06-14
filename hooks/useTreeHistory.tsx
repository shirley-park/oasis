import { create } from 'zustand'
import palmtree from '../public/images/palmtree.svg'
import { useSessionHistory } from './useSessionHistory'

export type Tree = {
  id?: number
  image: string
}

type Trees = Array<Tree>

// interface TreeHistoryState {
//   trees: Trees
//   addTree: (tree: Tree) => void
// }

// const mockData = [
//   {
//     id: 1,
//     image: palmtree,
//   },
// ]

// export const useTreeHistory = create<TreeHistoryState>((set) => ({
//   trees: [...mockData],
//   addTree: (tree) => set((state) => ({ trees: [...state.trees, tree] })),
// }))

export const useSessionsWithTrees = () => {
  const { sessions } = useSessionHistory((s) => ({ sessions: s.sessions }))
  const trees = sessions.filter((session) => {
    // tree definitely exists in session
    return !!session.tree
  })

  return trees
}
