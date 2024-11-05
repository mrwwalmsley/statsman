export const left = [
  { abbreviation: 'PF', color: 'gray' },
  { abbreviation: 'BS', color: 'red' },
  { abbreviation: 'ST', color: 'yellow' },
  { abbreviation: 'DR', color: 'orange' },
]

export const right = [
  { abbreviation: 'OR', color: 'orange' },
  { abbreviation: 'A', color: 'yellow' },
  { abbreviation: '2P', color: 'blue' },
  { abbreviation: '2A', color: 'lightblue' },
  { abbreviation: '3P', color: 'blue' },
  { abbreviation: '3A', color: 'lightblue' },
  { abbreviation: 'FT', color: 'blue' },
  { abbreviation: 'FA', color: 'lightblue' },
  { abbreviation: 'TO', color: 'gray' },
]

export const stats = [...left, ...right]

export function getElapsedTime(start?: Date, end = new Date()) {
  if (start) {
    const elapsedTime = end
      ? end.getTime() - start.getTime()
      : Date.now() - start.getTime()

    const minutes = Math.floor(elapsedTime / 60000)
    const seconds = Math.floor((elapsedTime % 60000) / 1000)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  return '00:00'
}
