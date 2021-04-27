const koaRouter = require('koa-router');
const router = new koaRouter();
//const bcrypt = require('bcrypt');
const KoaBody = require('koa-body');
const artistaCheck = require('../middlewares/artista');
const oneArtist = require('../middlewares/oneArtist');
const validArtist = require('../middlewares/validArtist');

//const checkParams_new_user = require('../middlewares/check_params_new_user');
//const checkParams = require('../middlewares/check_params');
//const userAuth = require('../middlewares/user_auth');
//const userGuard = require('../middlewares/user_guard');

router.get('artistas', 'artists/:id', artistaCheck,async (ctx) => {
    var id_recibido = ctx.request.URL.pathname;
    var id_r = id_recibido.split("/")[2]
    var artista_id = await ctx.db.artista.findAll({ where: { id: id_r } });
    var id = artista_id[0].dataValues.id;
    var name = artista_id[0].dataValues.name;
    var age = artista_id[0].dataValues.age;
    var albums = artista_id[0].dataValues.albums;
    var tracks = artista_id[0].dataValues.tracks;
    var self = artista_id[0].dataValues.self;
    diccionario_response = {
      "id": id,
      "name": name,
      "age": age,
      "albums": albums,
      "tracks": tracks,
      "self": self
    }
    ctx.body = diccionario_response;
  
});

router.get('artistas', 'artists', async (ctx) => {
  var artista_id = await ctx.db.artista.findAll();
  ctx.body = artista_id;
  //ver como eliminar que se muestren las columnas updatedAt y createdAt

});

router.get('artistas', 'artists/:id/albums', artistaCheck, async (ctx) => {
  var id_recibido = ctx.request.URL.pathname;
  var id_r = id_recibido.split("/")[2]
  var artista_id = await ctx.db.albume.findAll({ where: { artistumId: id_r } });
  const lista_respuesta = [];
  for (var i=0; i<artista_id.length; i+=1){
    elemento = artista_id[i];
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

});

router.get('artistas', 'artists/:id/tracks', artistaCheck, async (ctx) => {
  var id_recibido = ctx.request.URL.pathname;
  var id_r = id_recibido.split("/")[2]
  var album = await ctx.db.albume.findAll({ where: { artistumId: id_r } });
  var lista_canciones_albumes = [];
  for (var i =0; i< album.length; i+=1){
    elemento = album[i].id;
    let resultado = await ctx.db.cancion.findAll({ where: { albumeId: elemento } });
    for (var j=0; j< resultado.length; j+=1){
      resultado_listo = {
        "id": resultado[j].id,
        "name": resultado[j].name,
        "duration": resultado[j].duration,
        "artist": resultado[j].artist,
        "times_played": resultado[j].times_played,
        "album": resultado[j].album,
        "self": resultado[j].self,
        "album_id": resultado[j].albumeId
      }
      lista_canciones_albumes.push(resultado_listo)
    }
    
  }
  console.log(lista_canciones_albumes)
  ctx.body = lista_canciones_albumes;

});

router.put('artista.update','artists/:id/albums/play',KoaBody(),artistaCheck,async (ctx) => {
  var id_recibido = ctx.request.URL.pathname;
  var id_listo = id_recibido.split("/")[2]
  //busco todos los albumes que pertenecen a esa artista
  const albums = await ctx.db.albume.findAll({ where: { artistumId: id_listo } });
  var lista_ids_albumes = []
//creo una lista con todos los ids de los albumes
  for (var i=0; i< albums.length; i+=1){
    lista_ids_albumes.push(albums[i].id)
  }
  //para cada album, reviso sus canciones, le sumo uno a times_played, lo guardo
  for (var j=0; j<lista_ids_albumes.length; j+=1){
    const tracks = await ctx.db.cancion.findAll({ where: { albumeId: lista_ids_albumes[j] } });
    tracks.forEach(element => {
      element.times_played +=1;
      element.save();
      
    });
  }
    ctx.response.message = "todas las canciones del artista fueron reproducidas"
    ctx.body = "Todas las canciones fueron reproducidas";
  }
);

router.post('artistas','artists', KoaBody(),  validArtist, oneArtist,async (ctx) => {
    const body = await ctx.request.body;
    const { name } = body;
    const { age } = body;
    var id = Buffer.from(name).toString('base64')
    var id_listo = id.slice(0,22);
    var albums = "https://lit-earth-74462.herokuapp.com/artists/" + `${id}/albums`;
    var tracks = "https://lit-earth-74462.herokuapp.com/artists/" + `${id}/tracks`;
    var self = "https://lit-earth-74462.herokuapp.com/artists/" + `${id}`;
    const diccionario = {
        "id": id_listo,
        "name": name,
        "age": age,
        "albums": albums,
        "tracks": tracks,
        "self": self

    }
    //const new_user = await ctx.db.artista.create(diccionario);
    diccionario_response = 
    {
      //"id": id_listo,
      "name": name,
      "age": age,
      "albums": albums,
      "tracks": tracks,
      "self": self

  }
  ctx.response.status = 201
    ctx.body = diccionario_response;
  });

router.del('artistas','artists/:id', KoaBody(),artistaCheck, async (ctx) => {
  var id_recibido = ctx.request.URL.pathname;
  var id_r = id_recibido.split("/")[2]
  var resultado = await ctx.db.artista.findOne({ where: { id: id_r } });
  await resultado.destroy();
  var resultado_2 = await ctx.db.albume.findAll({ where: { artistumId: id_r } });
  const lista_ids_albums = [];
  for (var i=0; i<resultado_2.length; i+=1){
    let album = resultado_2[i];
    lista_ids_albums.push(resultado_2[i].id);
    await album.destroy();
  }
  for (var j=0; j<lista_ids_albums.length; j+=1){
    var id = lista_ids_albums[j]
    var resultado_3 = await ctx.db.cancion.findAll({ where: { albumeId: id } });
    for (var k=0; k<resultado_3.length; k+=1){
      await resultado_3[k].destroy();
    }
    
  }
  ctx.response.status = 204
    return ctx.response
  }
);

module.exports = router;
