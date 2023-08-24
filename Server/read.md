1. npm i -d typescript
2. npm i -d ts-node
3. npm i -d nodemon 
4. config the typescript
5. npm i @types/express @types/cookie-parser @types/cors @types/compression @types/body-parser to install the typescript for express, cookie-parser, cors, compression, body-parser
6. npm start to start the server
7. https://github.com/AntonioErdeljac/ts-node-mongo-rest-api-tutorial
8. there are some reserved event which can be accessed using socket object on the server side
Connect,Message,Disconnect,Reconnect,Ping,Join,Leave. Most of the tym we named a event on our own and emit it to the server and the server will listen to it and do the required task.(node js)

client side:(React)=> some reserved events are connect,connect_error,connect_timeout,disconnect,reconnect,reconnect_attempt,reconnecting,reconnect_error,reconnect_failed,connect_failed,ping,pong, error, message, join, leave, ack, error, disconnecting, newListener, removeListener, and removeAllListeners. Most of the tym we named a event on our own and emit it to the server and the server will listen to it and do the required task.(react js)

10. Create and fire custom events using socket.emit function
setTimeOut(()=>{socket.emit('customEvent', {data: 'some data'})}, 3000)

11. socket broadcasting: socket.broadcast.emit('customEvent', {data: 'some data'}) // it will send the data to all the clients except the one who is sending the data.
io.sockets.emit() method use kora lagbey jodi server theke data send korte chai to all the clients

12. Namespace: socket.io allows you to namespace your sockets, which essentially means assigning different endpoints or paths. This is a useful feature to minimize the number of resources (TCP connections) and at the same time separate concerns within your application by introducing separation between communication channels.
group messaging ar jnno namespace use kora hoy