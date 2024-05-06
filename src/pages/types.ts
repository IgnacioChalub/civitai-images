export enum ScreenWidth {
    DESKTOP=1310,
    TABLET=1000,
    MOBILE=660,
}

export type CardReq = {
    items: CardItem[],
    metadata: { nextPage: string }
}

export type CardItem = { 
    id: string,
    url: string, 
    stats: CardStats
}

export type CardStats = {
    commentCount: number,
    cryCount: number, 
    heartCount: number,
    laughCount: number,
    likeCount: number,
}
