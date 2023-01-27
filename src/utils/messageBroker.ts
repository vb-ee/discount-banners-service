import amqplib from 'amqplib'

export const messageBroker = async (message: string, queue: string) => {
    const connection = await amqplib.connect(<string>process.env.AMQP_URL)
    const channel = await connection.createChannel()
    try {
        console.log('Sending')
        await channel.assertQueue(queue, { durable: true })
        channel.sendToQueue(queue, Buffer.from(message))
        console.log('Message sent')
    } catch (e) {
        console.error('Error in sending message', e)
    } finally {
        console.info('Closing channel and connection if available')
        await channel.close()
        await connection.close()
        console.info('Channel and connection closed')
    }
}
