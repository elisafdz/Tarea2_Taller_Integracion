const koaRouter = require('koa-router');
const router = new koaRouter();
//const bcrypt = require('bcrypt');
const KoaBody = require('koa-body');
const trackCheck = require('../middlewares/cancion');
const oneTrack = require('../middlewares/oneTrack');
const validTrack = require('../middlewares/validTrack');

router.get('tracks', 'tracks/:id', trackCheck,async (ctx) => {
  var id_recibido = ctx.request.URL.pathname;
  var id_r = id_recibido.split("/")[2]

  var artista_id = await ctx.db.cancion.findAll({ where: { id: id_r } });
  var id = artista_id[0].dataValues.id;
  var name = artista_id[0].dataValues.name;
  var duration = artista_id[0].dataValues.duration;
  var artist = artista_id[0].dataValues.artist;
  var times_played = artista_id[0].dataValues.times_played;
  var album = artista_id[0].dataValues.album;
  var self = artista_id[0].dataValues.self;
  var album_id = artista_id[0].dataValues.albumeId;
  diccionario_response = {
    "id": id,
    "album_id": album_id,
    "name": name,
    "duration": duration,
    "times_played": times_played,
    "artist": artist,
    "album": album,
    "self": self
  }
  ctx.body = diccionario_response;

});

router.post('tracks','albums/:id/tracks', KoaBody(), validTrack, oneTrack, async (ctx) => {
   
    const body = await ctx.request.body;
    const { name } = body;
    const { duration } = body;
    //obtengo el id del album en el que debo crear
    var id_album_recibido = ctx.request.URL.pathname;
    var id_r_album = id_album_recibido.split("/")[2]
    var string = name + ":" + id_r_album
    var id_track_parcial = Buffer.from(string).toString('base64')
    var id_track = id_track_parcial.slice(0,21);
    var times_played = 0;
   //busco en el album
    var artista_id = await ctx.db.albume.findOne({ where: { id: id_r_album } });
    var artist = "https://lit-earth-74462.herokuapp.com/artists/" + `${artista_id.dataValues.artistumId}`;
    var album = "https://lit-earth-74462.herokuapp.com/albums/" + `${id_r_album}`;
    var self = "https://lit-earth-74462.herokuapp.com/tracks/" + `${id_track}`;
 
    const diccionario = {
        "id": id_track,
        "name": name,
        "duration": duration,
        "artist": artist,
        "times_played": times_played,
        "album": album,
        "self": self,
        "albumeId": id_r_album

    }
    
    //const new_user = await ctx.db.cancion.create(diccionario);
    diccionario_response = 
    {
       // "id": id_track,
        "album_id": id_r_album,
        "name": name,
        "duration": duration,
        "artist": artist,
        "times_played": times_played,
        "album": album,
        "self": self
       


  } 
    ctx.response.status = 201
    ctx.body = diccionario_response;
  });

router.get('tracks', 'tracks', async (ctx) => {
    var album_id = await ctx.db.cancion.findAll();
    const lista_respuesta = [];
    for (var i=0; i<album_id.length; i+=1){
    elemento = album_id[i];
    diccionario = {
      "id": elemento.id,
        "album_id": elemento.albumeId,
        "name": elemento.name,
        "duration": elemento.duration,
        "artist": elemento.artist,
        "times_played": elemento.times_played,
        "album": elemento.album,
        "self": elemento.self
       
    }
    lista_respuesta.push(diccionario);
  }
    ctx.body = lista_respuesta;
    //ver como eliminar que se muestren las columnas updatedAt y createdAt
  
  });

router.put('tracks.update','tracks/:id/play',KoaBody(),trackCheck,async (ctx) => {
    var id_recibido = ctx.request.URL.pathname;
    var id_listo = id_recibido.split("/")[2]
    //busco todos los tracks de ese album
    const cancion_elegida = await ctx.db.cancion.findOne({ where: { id: id_listo } });
    cancion_elegida.times_played +=1;
    cancion_elegida.save();
    
      ctx.message = "cancion reproducida"
      ctx.body = "La cancion fue reproducida";
    }
  );

  router.del('cancion','tracks/:id', KoaBody(), trackCheck,async (ctx) => {
    var id_recibido = ctx.request.URL.pathname;
    var id_r = id_recibido.split("/")[2]
    var resultado = await ctx.db.cancion.findOne({ where: { id: id_r } });
    await resultado.destroy(); //elimine el album
    
    return (ctx.body = { msg: 'cancion eliminada' });
    }
  );
module.exports = router;
