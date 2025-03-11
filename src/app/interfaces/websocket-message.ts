export interface WebsocketMessage {
    type: string,
    payload: {
        action: string
    }
}
