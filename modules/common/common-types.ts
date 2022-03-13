export type DayAndTime = { 
    day: string,
    hours: number[]
}

export interface PlayerInfo {
    name: string,
	character: {
		name: string
		'class': string
		level: number
	}
}