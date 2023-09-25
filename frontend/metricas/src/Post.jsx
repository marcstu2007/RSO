export const Posts = () => {
    return <button onClick={()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then( Response => Response.json())
        .then( data => console.log(data))
        .catch(err => console.error(err))
    }}>
    Traer datos
</button>
}