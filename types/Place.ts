export type Place = {
    _id: string,
    name: string,
    description?: string
    imageGuid: string
}

export type PlaceWithQuests = Place & {
    quests?: Quest[]
}

export type Quest = {
    _id: string
    description: string
    imageGuid: string
    name: string
    place: string
    questState: string
    creatorId: number
}