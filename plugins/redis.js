

const fp = require('fastify-plugin')


module.exports = fp(async function (fastify, opts) {
  
  await fastify
  .register(require('fastify-redis'), {
    host: config.redis.host,
    username:config.redis.username,
    password:config.redis.pass,
    port: config.redis.port,
    namespace: 'dataCache',
    keyPrefix:"datacache:"
  })  .register(require('fastify-redis'), {
    host: config.redis.host,
    username:config.redis.username,
    password:config.redis.pass,
    port: config.redis.port,
    namespace: 'blacklist',
    keyPrefix:"blacklist:"
  })  .register(require('fastify-redis'), {
    host: config.redis.host,
    username:config.redis.username,
    password:config.redis.pass,
    port: config.redis.port,
    namespace: 'db',

  })
  

return
})
