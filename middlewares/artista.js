const checkUser = async (ctx, next) => {
        
        var id_recibido = ctx.request.URL.pathname;
        var id_r = id_recibido.split("/")[2]

        try{const artista = await ctx.db.artista.findOne({ where: { id: id_r } });
        if (artista!= undefined){
            return next(ctx)
        }
        else{
            ctx.response.status = 404;
            ctx.response.message = "artista no encontrado";
        return  ctx.response.satus }

            
        }
        catch (error) {
            
            return ctx.response.satus
            ;}
       
      };
      
      module.exports = checkUser;