import axios from 'axios';

export default class Search {
    constructor(query) { 
        this.query = query;
    }

    async getResults(query) {
    const apiID = 'd26d84fc';
    const apiKey = '9e62db7f574bd8b3f3f8cd64b869ca06';
    try {
        const res = await axios(`https://api.edamam.com/search?q=${this.query}&app_id=${apiID}&app_key=${apiKey}`);
        this.result = res.data.hits;
        console.log(this.result);
    } catch (error) {
        alert(error);
    }
}
}







// import axios from 'axios';

// export default class Search {
//     constructor(query) {
//         this.query = query;
//     }

//     async getResults(query) {
//     const proxy = 'https://cors-anywhere.herokuapp.com/';
//     const key = '953579b922528d9c668b2f7ecca356bd'; // for todd 
//     //const key ='0759db7a3411e17afced7a112b2a6f1e';  //for toddwyder
//     //const key ='d1fac9bad51b375248022b55a53fe7c1';  //for twyder
//     try {
//         const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
//         this.result = res.data.recipes;
//        // console.log(this.result);
//     } catch (error) {
//         alert(error);
//     }
// }



// }
// edamam app ID d26d84fc
// edamam app key 9e62db7f574bd8b3f3f8cd64b869ca06
// https://api.edamam.com/search