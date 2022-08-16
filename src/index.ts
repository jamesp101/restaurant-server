import routes from './routes'
import {createServer} from 'http'
import socket from './socket';
import  Express  from 'express'
import cors from 'cors';
import { taskEither } from 'fp-ts';

const app = Express();
const httpServer = createServer(app)

app.use(cors())
app.use(Express.json())


socket(httpServer)
app.use(routes)


app.listen(3000,  ()=> {
    console.log('Server is now running at port 3000')
});






