const validAlbum = async (ctx, next) => {
        
        const body = await ctx.request.body
        
        try{
            var {name} = body;
            var {genre} = body
            

        if (name!= undefined && genre!= undefined && typeof(name) == "string" && typeof(genre)== "string"){
            
            return next(ctx)
        }
        else{
            ctx.response.status = 400;
            ctx.response.message = "input invalido";
        return  ctx.response.satus }

            
        }
        catch (error) {
            ctx.response.status = 400;
            ctx.response.message = "input invalido";
            return ctx.response.satus
            ;}
       
      };
      
      module.exports = validAlbum;