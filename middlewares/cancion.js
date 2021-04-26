const checkTrack = async (ctx, next) => {
        
        var id_recibido = ctx.request.URL.pathname;
        var id_r = id_recibido.split("/")[2]
        
        try{const cancion = await ctx.db.cancion.findOne({ where: { id: id_r } });
        if (cancion!= undefined){
            return next(ctx)
        }
        else{
            ctx.response.status = 404;
            ctx.response.message = "canción no encontrada";
        return  ctx.response.satus }

            
        }
        catch (error) {
            ctx.response.status = 404;
            ctx.response.message = "canción no encontrada";
            return ctx.response.satus
            ;}
       
      };
      
      module.exports = checkTrack;