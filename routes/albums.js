const koaRouter = require('koa-router');
const router = new koaRouter();
//const bcrypt = require('bcrypt');
const KoaBody = require('koa-body');
const albumCheck = require('../middlewares/album');
const oneAlbum = require('../middlewares/oneAlbum');
const validAlbum = require('../middlewares/validAlbum');
//const checkParams_new_user = require('../middlewares/check_params_new_user');
//const checkParams = require('../middlewares/check_params');
//const userAuth = require('../middlewares/user_auth');
//const userGuard = require('../middlewares/user_guard');

router.get('albums', 'albums/:id', albumCheck, async (ctx) => {
    var id_recibido = ctx.request.URL.pathname;
    var id_r = id_recibido.split("/")[2]

    var artista_id = await ctx.db.albume.findAll({ where: { id: id_r } });
    var id = artista_id[0].dataValues.id;
    var name = artista_id[0].dataValues.name;
    var genre = artista_id[0].dataValues.genre;
    var artist = artista_id[0].dataValues.artist;
    var tracks = artista_id[0].dataValues.tracks;
    var self = artista_id[0].dataValues.self;
    var artist_id = artista_id[0].dataValues.artistumId;
    diccionario_response = {
      "id": id,
      "artist_id": artist_id,
      "name": name,
      "genre": genre,
      "artist": artist,
      "tracks": tracks,
      "self": self
    }
    ctx.body = diccionario_response;
  
});

router.get('albums', 'albums/:id/tracks', albumCheck,async (ctx) => {
    var id_recibido = ctx.request.URL.pathname;
    var id_r = id_recibido.split("/")[2]

    var artista_id = await ctx.db.cancion.findAll({ where: { albumeId: id_r } });
    const lista_respuesta = [];
    for (var i=0; i<artista_id.length; i+=1){
      elemento = artista_id[i];
      diccionario = {
        "id": elemento.id,
        "album_id": elemento.albumId,
        "name": elemento.name,
        "duration": elemento.duration,
        "times_played": elemento.times_played,
        "artist": elemento.artist,
        "album": elemento.album,
        "self": elemento.self,
      }
      lista_respuesta.push(diccionario);
    }
  
    ctx.body = lista_respuesta;
  
  });

router.get('albums', 'albums', async (ctx) => {
    var album_id = await ctx.db.albume.findAll();
    const lista_respuesta = [];
    for (var i=0; i<album_id.length; i+=1){
    elemento = album_id[i];
    diccionario = {
      "id": elemento.id,
      "artist_id": elemento.artistumId,
      "name": elemento.name,
      "genre": elemento.genre,
      "artist": elemento.artist,
      "tracks": elemento.tracks,
      "self": elemento.self,
    }
    lista_respuesta.push(diccionario);
  }
    ctx.body = lista_respuesta;
    //ver como eliminar que se muestren las columnas updatedAt y createdAt
  
  });

router.post('albums','artists/:id/albums', KoaBody(), validAlbum, oneAlbum, async (ctx) => {
    const body = await ctx.request.body;
    const { name } = body;
    const { genre } = body;
    var id_recibido = ctx.request.URL.pathname;
    var id_r = id_recibido.split("/")[2]
    var string = name + ":" + id_r
    var id_album_parcial = Buffer.from(string).toString('base64')
    var id_album = id_album_parcial.slice(0,21);
    var artist = "https://lit-earth-74462.herokuapp.com/artists/" + `${id_r}`;
    var tracks = "https://lit-earth-74462.herokuapp.com/albums/" + `${id_album}/tracks`;
    var self = "https://lit-earth-74462.herokuapp.com/albums/" + `${id_album}`;
    const diccionario = {
        "id": id_album,
        "name": name,
        "genre": genre,
        "artist": artist,
        "tracks": tracks,
        "self": self,
        "artistumId": id_r

    }
    //const new_user = await ctx.db.albume.create(diccionario);
    diccionario_response = 
    {
        "id": id_album,
        "artist_id": id_r,
        "name": name,
        "genre": genre,
        "artist": artist,
        "tracks": tracks,
        "self": self,

  }
    ctx.body = diccionario_response;
  });

router.put('album.update','albums/:id/tracks/play',KoaBody(),albumCheck,async (ctx) => {
    var id_recibido = ctx.request.URL.pathname;
    var id_listo = id_recibido.split("/")[2]
    //busco todos los tracks de ese album
    const canciones = await ctx.db.cancion.findAll({ where: { albumeId: id_listo } });
    
    for (var j=0; j<canciones.length; j+=1){
      canciones.forEach(element => {
        element.times_played +=1;
        element.save();
        
      });
    }
    ctx.message = "canciones del álbum reproducidas"
      ctx.body = "todas las canciones fueron reproducidas";
    }
  );

router.del('album','albums/:id', KoaBody(), albumCheck, async (ctx) => {
  var id_recibido = ctx.request.URL.pathname;
  var id_r = id_recibido.split("/")[2]
  var resultado = await ctx.db.albume.findOne({ where: { id: id_r } });
  await resultado.destroy(); //elimine el album
  var resultado_2 = await ctx.db.cancion.findAll({ where: { albumeId: id_r } }); //encuentro todas las canciones del album
  
  for (var i=0; i<resultado_2.length; i+=1){
    let cancion = resultado_2[i];
    await cancion.destroy();
  }
  return (ctx.body = { msg: 'album eliminado' });
  }
);
  
module.exports = router;
