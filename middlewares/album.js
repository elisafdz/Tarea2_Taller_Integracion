const checkAlbum = async (ctx, next) => {
        
        var id_recibido = ctx.request.URL.pathname;
        var id_r = id_recibido.split("/")[2]
        
        try{const album = await ctx.db.albume.findOne({ where: { id: id_r } });
        if (album!= undefined){
            return next(ctx)
        }
        else{
            if (ctx.request.method == "POST"){
                ctx.response.status = 422;
            ctx.response.message = "álbum no existe";
            }
            else {
                ctx.response.status = 404;
                ctx.response.message = "álbum no encontrado";
            }
           
        return  ctx.response.satus }

            
        }
        catch (error) {
            ctx.response.status = 404;
            ctx.response.message = "álbum no encontrado";
            return ctx.response.satus
            ;}
       
      };
      
      module.exports = checkAlbum;