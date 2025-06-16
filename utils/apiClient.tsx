async function apiClient(path , options){
    try{
        const response = await fetch(`https://mom-beta-server1-4afz.onrender.com/${path}` , options);
        console.log("this is res:",response)

        if(response.ok){
            const data = await response.json()
            return data
        }else{
            return null
        }
    }catch(e){
        console.log("Error in fetching data" , e)
        return null
    }
}
export default apiClient