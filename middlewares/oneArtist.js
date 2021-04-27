const oneArtist = async (ctx, next) => {
        
    const body = await ctx.request.body;
    const { name } = body;
    const { age } = body;
    var id = Buffer.from(name).toString('base64')
    var id_listo = id.slice(0,22);
    var albums = "http://localhost:3000/artists/" + `${id}/albums`;
    var tracks = "http://localhost:3000/artists/" + `${id}/tracks`;
    var self = "http://localhost:3000/artists/" + `${id}`;
    const diccionario = {
        "id": id_listo,
        "name": name,
        "age": age,
        "albums": albums,
        "tracks": tracks,
        "self": self

    }
    const diccionario_response = {
        //"id": id_listo,
        "name": name,
        "age": age,
        "albums": albums,
        "tracks": tracks,
        "self": self

    }
    
        
        try{
            await ctx.db.artista.create(diccionario);
            return next(ctx)
            
            }
        catch (error) {
            ctx.response.status = 409;
            ctx.response.message = "artista ya existe";
            ctx.body = diccionario_response
            return ctx.response

            ;}
       
      };
      
      module.exports = oneArtist;