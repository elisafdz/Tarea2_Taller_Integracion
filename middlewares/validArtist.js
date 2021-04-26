const validArtist = async (ctx, next) => {
        
        const body = await ctx.request.body
        
        try{
            var {name} = body;
            var {age} = body
            

        if (name!= undefined && age!= undefined && typeof(name) == "string" && typeof(age)== "number"){
            
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
      
      module.exports = validArtist;