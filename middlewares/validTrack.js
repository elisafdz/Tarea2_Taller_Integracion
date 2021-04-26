const validTrack = async (ctx, next) => {
        
        const body = await ctx.request.body
        
        try{
            var {name} = body;
            var {duration} = body
            

        if (name!= undefined && duration!= undefined && typeof(name) == "string" && typeof(duration)== "number"){
            
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
      
      module.exports = validTrack;