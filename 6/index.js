const http=require('http');
const fs=require('fs');
const path=require('path'); 
const {MongoClient}=require('mongodb');
const url='mongodb://127.0.0.1:27017';
const dbname='hostel';
const collectionname='students';
let bo=[];
let bo1=[];
async function requestListener(req,res){
    if (req.url=='/' && req.method=='GET'){
        const fp=path.join(__dirname,'signup.html');
        fs.readFile(fp,(err,data)=>{
            if (err){
                console.log(error);
                res.statusCode=404;
            }
            else{
                console.log('file is loading');
                res.setHeader('content-type','text/html');
                return res.end(data);
            }
        });
    }
    else if(req.url=='/login' && req.method=='POST'){
        console.log('login');
        req.statusCode=200;
        fp3=path.join(__dirname,'login.html');

        fs.readFile(fp3,(err,data)=>{
            if (err){
                console.log('login page error')
            }
            else{
                res.end(data)
            }
        });
    }
    else if(req.url=='/logged' && req.method=='POST'){
        const fp1=path.join(__dirname,'profile.html');
        fs.readFile(fp1,(err,data)=>{
            if (err){
                console.log('error in second profile.html');
                res.statusCode=404;
                res.end();
            }
            else{
                res.setHeader('content-type','text/html');
                req.on('data',(c)=>{
                    const p=c.toString().split('&');
                    p.forEach(e=>{
                        bo.push(e.split('='));
                    })
                });
                req.on('end',()=>{
                console.log(bo);
                data=data.toString();
                let result=data.replace('{{username}}',bo[0][1]);
                result=result.replace('{{hostelname}}',bo[10][1]);
                result=result.replace('{{rollno}}',bo[1][1]);
                result=result.replace('{{age}}',bo[2][1]);
                result=result.replace('{{gender}}',bo[3][1]);
                result=result.replace('{{dob}}',bo[4][1]);
                result=result.replace('{{pno}}',bo[5][1]);
                result=result.replace('{{address}}',decodeURIComponent(bo[7][1]).replace('+',' '));
                result=result.replace('{{email}}',decodeURIComponent(bo[6][1]));
                result=result.replace('{{pincode}}',bo[8][1]);
                result=result.replace('{{country}}',bo[9][1]);
                connection(bo);
                return res.end(result);
                
            });
            }
        });
    }
    else if(req.url=='/logined' && req.method=='POST'){
        let b='';
        res.setHeader('content-type','text/html');
        fp2=path.join(__dirname,'profile.html');
        fs.readFile(fp2,(err,data)=>{
            if (err){
                console.log('logined error');
            }
            else{
                req.on('data',(c)=>{
                    b=b+c.toString();
                });
                req.on('end',async ()=>{
                    data=await connection2(data,b);
                    return res.end(data);
                });
            }
        });
    }
}
async function connection2(data,b){
    let result=data.toString();
    const c=b.split('&');
    c.forEach(e=>{
        bo1.push(e.split('='));
    });
    console.log(bo1);
    const client=new MongoClient(url);
    try {
        await client.connect();
        console.log('Mongodb is connected for reading');
        const db=client.db(dbname);
        const collection=db.collection(collectionname);
        const obj = await collection.findOne({ uname: bo1[0][1], udate: bo1[1][1]});
        if (!obj) {
            console.log('User not found');
            return '<h1>User not found</h1>';
        }
        result=result.replace('{{username}}',obj.uname);
        result=result.replace('{{hostelname}}',obj.hname);
        result=result.replace('{{rollno}}',obj.urollno);
        result=result.replace('{{age}}',obj.uage);
        result=result.replace('{{gender}}',obj.Gender);
        result=result.replace('{{dob}}',obj.udate);
        result=result.replace('{{pno}}',obj.pno);
        result=result.replace('{{address}}',decodeURIComponent(obj.utext).replace('+',' '));
        result=result.replace('{{email}}',decodeURIComponent(obj.uemail));
        result=result.replace('{{pincode}}',obj.pincode);
        result=result.replace('{{country}}',obj.country);
    }
    catch(err){
        console.log('error',err)
    }
    console.log(b)
    return result;
}
async function connection(bo){
    const client=new MongoClient(url);
    try{
        await client.connect();
        console.log('Mongodb is connected for inserting');
        const db=client.db(dbname);
        const collection=db.collection(collectionname);
        bo=Object.fromEntries(bo);
        await collection.insertOne(bo)
        console.log('Document inserted');
    }
    catch{
        console.log("error");
    }
    finally{
        await client.close();
    }
}
const server=http.createServer(requestListener);
server.listen(3000);
