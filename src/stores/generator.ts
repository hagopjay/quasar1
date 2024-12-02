import { defineStore } from 'pinia'
import { format } from 'date-fns'
import { nanoid } from 'nanoid'

interface GeneratedItem {
  id: number
  datetime: string
  randomString: string
  randomNumber: number
  randomHex: string
  timestamp: number
}

export const useGeneratorStore = defineStore('generator', {
  state: () => ({
    items: [] as GeneratedItem[],
    nextId: 0
  }),

  actions: {
    generateItems(count: number = 20) {
      const newItems: GeneratedItem[] = []

      for (let i = 0; i < count; i++) {
        const now = new Date()
        newItems.push({
          id: this.nextId++,
          datetime: format(now, 'yyyy-MM-dd HH:mm:ss.SSS'),
          randomString: nanoid(),
          randomNumber: Math.floor(Math.random() * 1000000),
          randomHex: '#' + Math.floor(Math.random()*16777215).toString(16),
          timestamp: now.getTime()
        })
      }

      this.items.push(...newItems)
      return newItems
    }
  }
})