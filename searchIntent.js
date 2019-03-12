var request = require('request');

let search=(word)=>{
    
    return new Promise((resolve,reject)=>{
        try{
        request.post(
            'http://localhost:5000/api/search',
            { json: { name:word} },
            function (error, response, body) {
                if(error){
                    reject('sorry,something went wrong')
                }
                if(body && body.result.length>0){
                resolve(body.result[0].celebData)
                }else{
                    reject("sorry we don't have any information about "+word)
                }
            }
        )
        }
        catch(ex){
            console.log(ex)
            reject('sorry something went wrong')
        }
    })    
}
module.exports={
    async searchIntent(){
        let searchText=this.$inputs.word.value
        try{
        let result= await search(searchText)
        this.tell(result);
        }catch(ex){
            this.tell(ex)
        }
    }
   
    
} 