export const generateImageUrl = (fileName: string) => {
    return `${<string>process.env.API_GATEWAY_IP}/images/${fileName}`
}
