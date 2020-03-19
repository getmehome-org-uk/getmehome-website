const HOMEPAGE = "CONTENT_HOMEPAGE";
const REGISTER = "CONTENT_REGISTER";
const TRAVEL_UPDATES = "CONTENT_TRAVEL_UPDATES";
const TRAVEL_EXPERIENCES = "CONTENT_TRAVEL_EXPERIENCES";
const TRAVEL_BOARD = "CONTENT_TRAVEL_BOARD";
const PRIVACY = "CONTENT_PRIVACY";
const ABOUT = "CONTENT_ABOUT";

const docIds = {
    HOMEPAGE,
    REGISTER,
    TRAVEL_UPDATES,
    TRAVEL_EXPERIENCES,
    TRAVEL_BOARD,
    PRIVACY,
    ABOUT
}

const Documents = window.DOCS = {
    [HOMEPAGE]: "https://docs.google.com/document/d/e/2PACX-1vTNMy3M2YcclUURvk35VrcbymvSCVrQhYunBNNFWbT7k9rS7qxhfU6m8X5Iu4HZqNPr8SwE91rsark9/pub",
    [REGISTER]: "https://docs.google.com/document/d/e/2PACX-1vTNMy3M2YcclUURvk35VrcbymvSCVrQhYunBNNFWbT7k9rS7qxhfU6m8X5Iu4HZqNPr8SwE91rsark9/pub",
    [TRAVEL_UPDATES]: "https://docs.google.com/document/d/e/2PACX-1vTNMy3M2YcclUURvk35VrcbymvSCVrQhYunBNNFWbT7k9rS7qxhfU6m8X5Iu4HZqNPr8SwE91rsark9/pub",
    [TRAVEL_EXPERIENCES]: "https://docs.google.com/document/d/e/2PACX-1vTNMy3M2YcclUURvk35VrcbymvSCVrQhYunBNNFWbT7k9rS7qxhfU6m8X5Iu4HZqNPr8SwE91rsark9/pub",
    [TRAVEL_BOARD]: "https://docs.google.com/document/d/e/2PACX-1vTNMy3M2YcclUURvk35VrcbymvSCVrQhYunBNNFWbT7k9rS7qxhfU6m8X5Iu4HZqNPr8SwE91rsark9/pub",
    [PRIVACY]: "https://docs.google.com/document/d/e/2PACX-1vTNMy3M2YcclUURvk35VrcbymvSCVrQhYunBNNFWbT7k9rS7qxhfU6m8X5Iu4HZqNPr8SwE91rsark9/pub",
    [ABOUT]: "https://docs.google.com/document/d/e/2PACX-1vTNMy3M2YcclUURvk35VrcbymvSCVrQhYunBNNFWbT7k9rS7qxhfU6m8X5Iu4HZqNPr8SwE91rsark9/pub",
};

const getContent = window.getContent = (content_id)=> new Promise((resolve, reject)=>{

    if(!content_id){
        console.error('getContent', {content_id, err:"missing content_id"});
        return reject('');
    }

    const url = DOCS[content_id];

    if(!url){
        console.error('getContent', {content_id, err:"unknown content_id"});
        return reject('');
    }

    fetch(url,{method:'GET'})
    .then(res=>res.text())
    .then(html=>{
        var copy = document.getElementById('copy');
        if(copy) document.removeChild(copy);
        html = html.replace(/<style[\s\S]+\/style>/gi,'');
        html = html.replace(/<script[\s\S]+\/script>/gi,'');
        html = html.replace(/<head[\s\S]+\/head>/gi,'');
        html = html.replace(/<link[\s\S]+\/>/gi,'');
        html = html.replace(/<\!DOCTYPE[\s\S]+<h1/gi,'<h1');
        html = html.replace(/<div id="footer"[\s\S]+/gi,'');
        console.log('getContent', {content_id, html});

        resolve(html);
    })
    .catch(err=>{
        console.error('getContent', {content_id, err});
        reject('');
    });

})

export {
    Documents,
    getContent,
    docIds
}