const loadMore = async () => {
          try{
                const url = `https://openapi.programming-hero.com/api/news/categories`;
                const res = await fetch(url);
                const data = await res.json();
                displayNews(data.data.news_category);
            }
            catch(error){
                    console.log(error);
        }
    }
    const displayNews = catagories => {
        const catagoriesSection = document.getElementById('catagories')
       catagories.forEach(catagory => {
        console.log(catagory);
       });
    }
    loadMore();