

const fp = require('fastify-plugin')
const {request}=require("undici")
global.nodes=new Set()
global.blacklistedNodes=new Set()
module.exports = fp(function (fastify, opts,done) {
  (async()=>{
    blacklistedNodes=new Set(await fastify.redis.db.smembers("BlacklistedNodes"))
    async function addNode(node){
      if(nodes.has(node)||blacklistedNodes.has(node)){return}
      return await forceAddNode(node)
    }
async function forceAddNode(node){
  
  
  try{
  
  let nodePeers=await ((await request("http://"+node+"/peers",{maxRedirections:3})).body).json()
  
  nodes.add(node)
  await fastify.redis.db.sadd("Nodes",node)
  for (nodePeer of nodePeers){
    try{
      
    addNode(nodePeer)
    
    }catch(e){
      console.log(e)
    }
  }
  
  }catch(e){ 
    
    console.log(node+" refused to connect")
    blacklistedNodes.add(node)
    fastify.redis.db.sadd("BlacklistedNodes",node)
  }
}
  let dbnodes=new Set(await fastify.redis.db.smembers("Nodes"))
  setInterval(()=>{
    console.log("Currently "+nodes.size+" peers")
  },10000)
  for (node of dbnodes){
    await forceAddNode(node)
  }
  
  

 
  })()
  

return done()
})
