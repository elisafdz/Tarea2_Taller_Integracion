const checkUser = async (ctx, next) => {
        
        var id_recibido = ctx.request.URL.pathname;
        var id_r = id_recibido.split("/")[2]
        console.log(ctx.request.method)

        try{const artista = await ctx.db.artista.findOne({ where: { id: id_r } });
        if (artista!= undefined){
            return next(ctx)
        }
        else{
            if (ctx.request.method == "POST")
            {
                ctx.response.status = 422;
                ctx.response.message = "artista no existe";
            }
            else{
                ctx.response.status = 404;
            ctx.response.message = "artista no encontrado";
            }
            
        return  ctx.response.satus }

            
        }
        catch (error) {
            
            return ctx.response.satus
            ;}
       
      };
      
      module.exports = checkUser;