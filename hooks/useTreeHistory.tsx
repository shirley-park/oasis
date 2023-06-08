import { create } from 'zustand'
import palmtree from '../public/images/palmtree.svg'

export type Tree = {
  id: number
  tree: string
}

type Trees = Array<Tree>

interface TreeHistoryState {
  trees: Trees
  addTree: (tree: Tree) => void
}

const mockData = [
  {
    id: 1,
    tree: palmtree,
  },
]

export const useTreeHistory = create<TreeHistoryState>((set) => ({
  trees: [...mockData],
  addTree: (tree) => set((state) => ({ trees: [...state.trees, tree] })),
}))
