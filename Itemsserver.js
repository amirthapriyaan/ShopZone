// const http=require('http');
// const PORT=3001;
// const server=http.createServer((req,res)=>{

//        res.end('hello javaScript\n');
// }
// );
// server.listen(PORT,()=>{
//     console.log(server is running:http://localhost:${PORT}/);
// });/
// const express=require('express');
// const app=express();
// const PORT=3000;

// app.get('/',(req,res)=>{
//     res.end('helo express');
// });
// app.listen(PORT,()=>{
// console.log(server is running : http://localhost:${PORT});
// }
// );
const express=require('express');
const app=express();
const PORT=2000;
const mongoose=require('mongoose')
require('dotenv').config();

const MongoURI=process.env.Mongo_URI;

mongoose.connect(MongoURI)
.then(()=>{
    console.log('connected to mongoDB');
}
)
.catch(()=>{
    console.error('error');
});


const logger =require ('./middleware');
const routes = require('./routes');


app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/',routes);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});