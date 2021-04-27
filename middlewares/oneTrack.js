const oneTrack = async (ctx, next) => {
        
    const body = await ctx.request.body;
    const { name } = body;
    const { duration } = body;
    //obtengo el id del album en el que debo crear
    var id_album_recibido = ctx.request.URL.pathname;
    var id_r_album = id_album_recibido.split("/")[2]
    var string = name + ":" + id_r_album
    var id_track_parcial = Buffer.from(string).toString('base64')
    var id_track = id_track_parcial.slice(0,22);
    var times_played = 0;
   //busco en el album
    var artista_id = await ctx.db.albume.findOne({ where: { id: id_r_album } });
    var artist = "http://localhost:3000/artists/" + `${artista_id.dataValues.artistumId}`;
    var album = "http://localhost:3000/albums/" + `${id_r_album}`;
    var self = "http://localhost:3000/tracks/" + `${id_track}`;
 
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
        
        try{
            await ctx.db.cancion.create(diccionario);
            return next(ctx)
            
            }
        catch (error) {
            
            ctx.response.status = 409;
            ctx.response.message = "track ya existe";
            ctx.body = diccionario_response
            return ctx.response

            ;}
       
      };
      
      module.exports = oneTrack;