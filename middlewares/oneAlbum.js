const oneAlbum = async (ctx, next) => {
        
    const body = await ctx.request.body;
    const { name } = body;
    const { genre } = body;
    var id_recibido = ctx.request.URL.pathname;
    var id_r = id_recibido.split("/")[2]
    var string = name + ":" + id_r
    var id_album_parcial = Buffer.from(string).toString('base64')
    var id_album = id_album_parcial.slice(0,21);
    var artist = "http://localhost:3000/artists/" + `${id_r}`;
    var tracks = "http://localhost:3000/albums/" + `${id_album}/tracks`;
    var self = "http://localhost:3000/albums/" + `${id_album}`;
    const diccionario = {
        "id": id_album,
        "name": name,
        "genre": genre,
        "artist": artist,
        "tracks": tracks,
        "self": self,
        "artistumId": id_r

    }
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
    
    
        
        try{
            await ctx.db.albume.create(diccionario);
            return next(ctx)
            
            }
        catch (error) {
            ctx.response.status = 409;
            ctx.response.message = "album ya existe";
            ctx.body = diccionario_response
            return ctx.response

            ;}
       
      };
      
      module.exports = oneAlbum;