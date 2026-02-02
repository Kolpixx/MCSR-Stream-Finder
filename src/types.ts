export type StreamType = {
    country: string,
    elo: number,
    nickname: string,
    url: string,
    uuid: string,
    twitch: TwitchObjectType
}

export type TwitchObjectType = {
    display_name: string,
    pfpURL: string,
    tags: Array<string>,
    viewers: number
    thumbnail_url: string,
    language: string,
    twitch_name: string,
    startTimestamp: string
}