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
    name: string
}